import styles from './index.module.css'
import React, {useContext, useState} from "react";
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

  const [draft, setDraft] = useState<string | null>(null)

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select()
  }

  // Decimal keypads in comma locales send "," and a typed "2." must survive the re-render.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    const amount = Number(text.replace(',', '.'))
    if (Number.isNaN(amount)) {
      return
    }
    setDraft(text)
    props.handleAmountChange?.(amount)
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
            type="text"
            inputMode="decimal"
            value={draft ?? props.amount}
            onClick={handleInputClick}
            onChange={handleInputChange}
            onBlur={() => setDraft(null)}
            disabled={!props.handleAmountChange}
          />
        </div>
      </SwipeToDelete>
  )
}
