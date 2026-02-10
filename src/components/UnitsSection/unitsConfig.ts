export type UnitValues = { left: number; right: number };

export type UnitDefinition = {
  id: string;
  leftLabel: string;
  rightLabel: string;
  icon?: string;
  leftToRight: (value: number) => number;
  rightToLeft: (value: number) => number;
  precision?: number;
  defaultValues?: UnitValues;
};

export const UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    id: 'milesToKm',
    icon: '🛣️',
    leftLabel: 'mi',
    rightLabel: 'km',
    leftToRight: (value: number) => value * 1.60934,
    rightToLeft: (value: number) => value / 1.60934,
  },
  {
    id: 'kilogramsToPounds',
    icon: '⚖️',
    leftLabel: 'kg',
    rightLabel: 'lb',
    leftToRight: (value: number) => value * 2.20462,
    rightToLeft: (value: number) => value / 2.20462,
  },
  {
    id: 'litersToGallons',
    icon: '🧴',
    leftLabel: 'L',
    rightLabel: 'gal',
    leftToRight: (value: number) => value * 0.264172,
    rightToLeft: (value: number) => value / 0.264172,
  },
  {
    id: 'celsiusToFahrenheit',
    icon: '🌡️',
    leftLabel: '°C',
    rightLabel: '°F',
    leftToRight: (value: number) => (value * 9) / 5 + 32,
    rightToLeft: (value: number) => (value - 32) * 5 / 9,
    precision: 1,
  },
  {
    id: 'metersToFeet',
    icon: '📏',
    leftLabel: 'm',
    rightLabel: 'ft',
    leftToRight: (value: number) => value * 3.28084,
    rightToLeft: (value: number) => value / 3.28084,
  },
  {
    id: 'barToPsi',
    icon: '🧪',
    leftLabel: 'bar',
    rightLabel: 'psi',
    leftToRight: (value: number) => value * 14.5038,
    rightToLeft: (value: number) => value / 14.5038,
  },
];
