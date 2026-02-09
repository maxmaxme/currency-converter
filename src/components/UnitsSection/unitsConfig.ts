export type UnitValues = { left: number; right: number };

export type UnitDefinition = {
  id: string;
  leftLabel: string;
  rightLabel: string;
  leftToRight: (value: number) => number;
  rightToLeft: (value: number) => number;
  precision?: number;
  defaultValues?: UnitValues;
};

export const UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    id: 'milesToKm',
    leftLabel: 'Miles',
    rightLabel: 'Kilometers',
    leftToRight: (value: number) => value * 1.60934,
    rightToLeft: (value: number) => value / 1.60934,
  },
  {
    id: 'kilogramsToPounds',
    leftLabel: 'Kilograms',
    rightLabel: 'Pounds',
    leftToRight: (value: number) => value * 2.20462,
    rightToLeft: (value: number) => value / 2.20462,
  },
  {
    id: 'litersToGallons',
    leftLabel: 'Liters',
    rightLabel: 'Gallons',
    leftToRight: (value: number) => value * 0.264172,
    rightToLeft: (value: number) => value / 0.264172,
  },
  {
    id: 'celsiusToFahrenheit',
    leftLabel: 'Celsius',
    rightLabel: 'Fahrenheit',
    leftToRight: (value: number) => (value * 9) / 5 + 32,
    rightToLeft: (value: number) => (value - 32) * 5 / 9,
    precision: 1,
  },
  {
    id: 'metersToFeet',
    leftLabel: 'Meters',
    rightLabel: 'Feet',
    leftToRight: (value: number) => value * 3.28084,
    rightToLeft: (value: number) => value / 3.28084,
  },
  {
    id: 'barToPsi',
    leftLabel: 'Bar',
    rightLabel: 'PSI',
    leftToRight: (value: number) => value * 14.5038,
    rightToLeft: (value: number) => value / 14.5038,
  },
];
