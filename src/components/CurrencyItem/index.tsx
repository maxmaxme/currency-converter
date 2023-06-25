import styles from './index.module.css'
import React, {useContext} from "react";
import {CurrencyContext} from "@/context/currency";
import SwipeToDelete from 'react-swipe-to-delete-ios'
import {CurrencySelect} from "@/components/CurrencySelect";

type Props = {
  currency: string;
  amount: number;
  handleAmountChange?: (value: number) => void;
  handleCurrencyChange?: (value: string) => void;
  handleDelete?: () => void;
}

export function CurrencyItem(props: Props) {
  const currencies = useContext(CurrencyContext)

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }

  return (
      <SwipeToDelete
        className={styles.swipeToDelete}
        onDelete={props.handleDelete ?? (() => {
        })}
        height={70}
      >
        <div className={styles.item}>
          <CurrencySelect
            value={props.currency}
            onChange={value => props.handleCurrencyChange?.(value)}
            currencies={currencies}
          />
          <input
            size={3}
            className={styles.amount}
            type="number"
            pattern='\d*'
            value={props.amount}
            onClick={handleInputClick}
            onChange={event => props.handleAmountChange?.(Number(event.target.value))}
            disabled={!props.handleAmountChange}
          />
        </div>
      </SwipeToDelete>
  )
}
