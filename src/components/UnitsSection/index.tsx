import React, {useCallback, useEffect, useMemo} from "react";
import {useLiveQuery} from "dexie-react-hooks";
import {configTable} from "@/db";
import {UnitsBlock} from "@/components/UnitsBlock";
import {UNIT_DEFINITIONS, UnitValues} from "@/components/UnitsSection/unitsConfig";

export function UnitsSection() {
  const unitsOrder = useLiveQuery(async () => (await configTable.get('units.order'))?.value ?? []) ?? []
  const unitsValues = useLiveQuery(async () => (await configTable.get('units.values'))?.value ?? {}) ?? {}

  useEffect(() => {
    (async () => {
      const current = await configTable.get('units.values')
      if (current?.value) {
        return
      }
      const legacyEntries = await Promise.all(
        UNIT_DEFINITIONS.map((unit) => configTable.get(`units.values.${unit.id}`))
      )
      const legacyValues = legacyEntries.reduce<Record<string, UnitValues>>((acc, entry, index) => {
        if (entry?.value) {
          acc[UNIT_DEFINITIONS[index].id] = entry.value
        }
        return acc
      }, {})
      if (Object.keys(legacyValues).length) {
        await configTable.put({id: 'units.values', value: legacyValues})
      }
    })()
  }, [])

  const setUnitsOrder = async (order: string[]) => {
    await configTable.put({id: 'units.order', value: order})
  }

  const setUnitValues = useCallback(async (unitId: string, values: UnitValues) => {
    await configTable.put({
      id: 'units.values',
      value: {
        ...unitsValues,
        [unitId]: values
      }
    })
  }, [unitsValues])

  const unitHandlers = useMemo(() => {
    return UNIT_DEFINITIONS.reduce<Record<string, (values: UnitValues) => void>>((acc, unit) => {
      acc[unit.id] = (values) => setUnitValues(unit.id, values)
      return acc
    }, {})
  }, [setUnitValues])

  const units = useMemo(() => {
    return UNIT_DEFINITIONS.map((unit) => ({
      ...unit,
      values: unitsValues[unit.id] ?? unit.defaultValues ?? {left: 0, right: 0},
      onValuesChange: unitHandlers[unit.id],
    }))
  }, [unitHandlers, unitsValues])

  return (
    <UnitsBlock
      order={unitsOrder}
      onOrderChange={setUnitsOrder}
      units={units}
    />
  )
}
