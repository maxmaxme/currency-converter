import React, {useState} from "react";
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
    leftToRight: (value: number) => number;
    rightToLeft: (value: number) => number;
    values: { left: number; right: number };
    onValuesChange: (values: { left: number; right: number }) => void;
    precision?: number;
  }[];
}

export function UnitsBlock(props: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const showUnits = props.units.length > 0

  if (!showUnits) {
    return null
  }

  const orderMap = new Set(props.order)
  const baseOrder = [
    ...props.order.filter((id) => props.units.some((unit) => unit.id === id)),
    ...props.units.filter((unit) => !orderMap.has(unit.id)).map((unit) => unit.id)
  ]
  const orderedUnits = baseOrder
    .map((id) => props.units.find((unit) => unit.id === id))
    .filter((unit): unit is NonNullable<typeof unit> => Boolean(unit))

  const moveUnit = (fromId: string, toId: string) => {
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
  }

  return (
    <div className={styles.units}>
      {orderedUnits.map((unit) => (
        <div
          key={unit.id}
          className={cn(styles.draggable, draggingId === unit.id && styles.dragging)}
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('text/plain', unit.id)
            setDraggingId(unit.id)
          }}
          onDragEnd={() => setDraggingId(null)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            const fromId = event.dataTransfer.getData('text/plain')
            moveUnit(fromId, unit.id)
            setDraggingId(null)
          }}
        >
          <UnitConverterItem
            leftLabel={unit.leftLabel}
            rightLabel={unit.rightLabel}
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
