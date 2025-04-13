import {ICurrency} from "@/types/db";
import styles from './index.module.css'
// @ts-expect-error no types in country-currency-emoji-flags
import {getEmojiByCurrencyCode} from 'country-currency-emoji-flags';

type Props = {
  currencies: ICurrency[]
  value: string
  onChange: (value: string) => void
}

export function CurrencySelect(props: Props) {
  const getLabel = (currency: ICurrency) => {
    const flag = getEmojiByCurrencyCode(currency.code) || '🏳️'
    return flag + ' ' + currency.code
  }
  return (
    <select
      className={styles.currency}
      value={props.value}
      onChange={event => props.onChange?.(event.target.value)}
      disabled={!props.onChange}
    >
      {props.currencies.map(currency => (
        <option
          key={currency.code}
          value={currency.code}
        >
          {getLabel(currency)}
        </option>
      ))}
    </select>
  )
}
