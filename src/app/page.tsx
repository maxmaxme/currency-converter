"use client"

import {CurrencyItem} from "@/components/CurrencyItem";
import {CurrencyContext} from "@/context/currency";
import styles from './page.module.css'
import {Button} from "@/components/Button";
import {useLiveQuery} from "dexie-react-hooks";
import {configTable, currenciesTable, itemsTable} from "@/db";
import {ICurrency, IItem} from "@/types/db";
import {useEffect, useState} from "react";
import localFont from 'next/font/local'
import cn from 'classnames'

const getCurrencies = async (): Promise<ICurrency[]> => {
  const {rates} = await fetch('https://api.exchangerate.host/latest', {
    // disable offline caching
    cache: 'no-cache',
  }).then(r => r.json())

  return Object.entries(rates).map(([code, rate]) => ({
    code,
    rate: Number(rate),
  }))
}

const font = localFont({
  src: '../assets/fonts/sf/regular.otf',
})
const fontBold = localFont({
  src: '../assets/fonts/sf/bold.otf',
})

export default function Page() {
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const items = useLiveQuery(() => itemsTable.toArray()) ?? []
  const updatedDate = useLiveQuery(() => configTable.get('updatedDate')) ?? undefined
  const baseAmount = useLiveQuery(() => configTable.get('baseAmount').then(row => row?.value)) ?? 0
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    currenciesTable.toArray()
      .then(async (rows) => {
        if (rows.length) {
          setCurrencies(rows)
        }
      })
  }, [])

  useEffect(() => {
    (async function() {
      // update currencies if last update was more than 24 hours ago
      const updatedDate = await configTable.get('updatedDate')
      const isOutdated = !updatedDate || new Date().getTime() - updatedDate.value.getTime() > 24 * 60 * 60 * 1000
      if (isOutdated) {
        await updateCurrencies()
      }
    })()
  }, [])

  const updateCurrencies = async () => {
    setIsUpdating(true)
    return getCurrencies()
      .then(async currencies => {
        await currenciesTable.clear();
        await Promise.all([
          currenciesTable.bulkAdd(currencies),
          configTable.put({id: 'updatedDate', value: new Date()})
        ])
        return currencies
      })
      .then(setCurrencies)
      .catch((e) => {
        alert('Failed to update exchange rates: ' + e.message)
      })
      .finally(() => setIsUpdating(false))
  }

  const setBaseAmount = async (amount: number) => {
    await configTable.put({id: 'baseAmount', value: amount})
  }

  const handleAddItem = async () => {
    // find first currency that is not in items
    const currency = currencies.find(({code}) => !items.some(item => item.currency === code))?.code ?? currencies[0].code
    await itemsTable.add({
      currency: currency
    })
  }

  const handleCurrencyChange = async (id: number, currency: string) => {
    await itemsTable.update(id, {currency})
  }

  const handleAmountChange = async (id: number, amount: number) => {
    const currency = items.find(item => item.id === id)?.currency
    const currencyRate = currencies.find(({code}) => code === currency)?.rate ?? 0
    await setBaseAmount(amount / currencyRate)
  }

  const handleDelete = async (id: number) => {
    await itemsTable.delete(id)
  }

  const getAmount = (item: IItem) => {
    const currencyRate = currencies.find(({code}) => code === item.currency)?.rate ?? 0
    return Number((baseAmount * currencyRate).toFixed(2))
  }

  return (
    <div className={font.className}>
      <CurrencyContext.Provider value={currencies}>
        <header className={styles.header}>
          <h1 className={cn([styles.title, fontBold.className])}>Currency converter</h1>
        </header>
        <div className={styles.container}>
          {items.map((item) => (
            <CurrencyItem
              currency={item.currency}
              amount={getAmount(item)}
              key={item.id}
              handleCurrencyChange={(currency) => handleCurrencyChange(item.id!, currency)}
              handleAmountChange={(amount) => handleAmountChange(item.id!, amount)}
              handleDelete={() => handleDelete(item.id!)}
            />
          ))}
          <div className={styles.addButton}>
            <Button onClick={handleAddItem}>Add currency</Button>
          </div>
        </div>
        <footer className={styles.footer}>
          <div className={styles.caption}>
            {updatedDate && <div>Last updated: {updatedDate?.value.toLocaleDateString()}</div>}
            {isUpdating && <div>Updating...</div>}
          </div>
        </footer>
      </CurrencyContext.Provider>
    </div>
  )
}
