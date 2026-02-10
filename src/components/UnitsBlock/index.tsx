import React, {useCallback, useState} from "react";
import styles from './index.module.css'
import {UnitConverterItem} from "@/components/UnitConverterItem";
import cn from "classnames";

type Props = {
  order: string[];
  onOrderChange: (order: string[]) => void;
  units: {
    id: string;
    leftLabel: string;
    rightLabel: string;
    icon?: string;
    leftToRight: (value: number) => number;
    rightToLeft: (value: number) => number;
    values: { left: number; right: number };
    onValuesChange: (values: { left: number; right: number }) => void;
    precision?: number;
  }[];
}

export function UnitsBlock(props: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [previewOrder, setPreviewOrder] = useState<string[]>([])

  const showUnits = props.units.length > 0

  if (!showUnits) {
    return null
  }

  const orderMap = new Set(props.order)
  const baseOrder = [
    ...props.order.filter((id) => props.units.some((unit) => unit.id === id)),
    ...props.units.filter((unit) => !orderMap.has(unit.id)).map((unit) => unit.id)
  ]

  const orderedUnits = (draggingId && previewOrder.length ? previewOrder : baseOrder)
    .map((id) => props.units.find((unit) => unit.id === id))
    .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit))

  const moveUnit = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) {
      return
    }
    const nextOrder = [...baseOrder]
    const fromIndex = nextOrder.indexOf(fromId)
    const toIndex = nextOrder.indexOf(toId)
    if (fromIndex === -1 || toIndex === -1) {
      return
    }
    nextOrder.splice(fromIndex, 1)
    nextOrder.splice(toIndex, 0, fromId)
    props.onOrderChange(nextOrder)
  }, [baseOrder, props.onOrderChange])

  const moveUnitLocal = useCallback((fromId: string, toId: string) => {
    if (fromId === toId) {
      return
    }
    const nextOrder = [...(previewOrder.length ? previewOrder : baseOrder)]
    const fromIndex = nextOrder.indexOf(fromId)
    const toIndex = nextOrder.indexOf(toId)
    if (fromIndex === -1 || toIndex === -1) {
      return
    }
    nextOrder.splice(fromIndex, 1)
    nextOrder.splice(toIndex, 0, fromId)
    setPreviewOrder(nextOrder)
  }, [baseOrder, previewOrder])

  const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const unitId = event.currentTarget.dataset.unitId
    if (!unitId) {
      return
    }
    event.dataTransfer.setData('text/plain', unitId)
    setDraggingId(unitId)
    setPreviewOrder(baseOrder)
  }, [baseOrder])

  const handleDragEnd = useCallback(() => {
    setDraggingId(null)
    setPreviewOrder([])
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!draggingId) {
      return
    }
    const unitId = event.currentTarget.dataset.unitId
    if (!unitId) {
      return
    }
    moveUnitLocal(draggingId, unitId)
  }, [draggingId, moveUnitLocal])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const toId = event.currentTarget.dataset.unitId
    const fromId = event.dataTransfer.getData('text/plain')
    if (!toId || !fromId) {
      return
    }
    moveUnit(fromId, toId)
    setDraggingId(null)
    setPreviewOrder([])
  }, [moveUnit])

  return (
    <div className={styles.units}>
      {orderedUnits.map((unit) => (
        <div
          key={unit.id}
          className={cn(styles.draggable, draggingId === unit.id && styles.dragging)}
          draggable
          data-unit-id={unit.id}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <UnitConverterItem
            leftLabel={unit.leftLabel}
            rightLabel={unit.rightLabel}
            icon={unit.icon}
            leftToRight={unit.leftToRight}
            rightToLeft={unit.rightToLeft}
            precision={unit.precision}
            leftValue={unit.values.left}
            rightValue={unit.values.right}
            onValuesChange={unit.onValuesChange}
          />
        </div>
      ))}
    </div>
  )
}
