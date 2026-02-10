import styles from './index.module.css'
import React from "react";

type Props = {
  leftLabel: string;
  rightLabel: string;
  icon?: string;
  leftToRight: (value: number) => number;
  rightToLeft: (value: number) => number;
  leftValue: number;
  rightValue: number;
  onValuesChange: (values: { left: number; right: number }) => void;
  precision?: number;
}

const roundTo = (value: number, precision: number) => {
  const factor = Math.pow(10, precision)
  return Math.round(value * factor) / factor
}

export function UnitConverterItem(props: Props) {
  const precision = props.precision ?? 2

  const handleLeftChange = (value: number) => {
    const nextRight = roundTo(props.leftToRight(value), precision)
    props.onValuesChange({left: value, right: nextRight})
  }

  const handleRightChange = (value: number) => {
    const nextLeft = roundTo(props.rightToLeft(value), precision)
    props.onValuesChange({left: nextLeft, right: value})
  }

  const normalizeValue = (value: number) => {
    if (Number.isNaN(value)) {
      return 0
    }
    return Number(value)
  }

  const handleLeftBlur = () => {
    const normalized = normalizeValue(props.leftValue)
    if (normalized !== props.leftValue) {
      handleLeftChange(normalized)
    }
  }

  const handleRightBlur = () => {
    const normalized = normalizeValue(props.rightValue)
    if (normalized !== props.rightValue) {
      handleRightChange(normalized)
    }
  }

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }

  return (
    <div className={styles.item}>
      {props.icon && <span className={styles.icon}>{props.icon}</span>}
      <div className={styles.row}>
        <input
          className={styles.amount}
          type="number"
          value={props.leftValue}
          onChange={(event) => handleLeftChange(Number(event.target.value))}
          onClick={handleInputClick}
          onBlur={handleLeftBlur}
        />
        <div className={styles.label}>
          <span>{props.leftLabel}</span>
        </div>
      </div>
      <div className={styles.row}>
        <input
          className={styles.amount}
          type="number"
          value={props.rightValue}
          onChange={(event) => handleRightChange(Number(event.target.value))}
          onClick={handleInputClick}
          onBlur={handleRightBlur}
        />
        <div className={styles.label}>
          <span>{props.rightLabel}</span>
        </div>
      </div>
    </div>
  )
}
