# ad-to-bs

A lightweight TypeScript library for converting between Gregorian (AD) and Nepali (BS/Bikram Sambat) calendars.

## Features

- ✅ Convert Gregorian dates to Nepali calendar
- ✅ Convert Nepali dates to Gregorian calendar
- ✅ Date validation for both calendars
- ✅ TypeScript support with full type definitions
- ✅ ESM module format
- ✅ Supports date range: 1944–2100 (AD) / 2000–2100 (BS)

## Installation

```bash
npm install ad-to-bs
```

## Usage

### Basic Conversion

```typescript
import { gregorianToNepali, nepaliToGregorian } from 'ad-to-bs';

// Convert Gregorian to Nepali
const nepaliDate = gregorianToNepali(2023, 10, 17);
console.log(nepaliDate); // { year: 2080, month: 7, day: 1 }

// Convert Nepali to Gregorian
const gregorianDate = nepaliToGregorian(2080, 7, 1);
console.log(gregorianDate); // { year: 2023, month: 10, day: 17 }
```

### Validation

```typescript
import { validateGregorian, validateNepali } from 'ad-to-bs';

const result = validateGregorian(2023, 10, 17);
if (result.valid) {
  console.log('Valid date');
} else {
  console.log('Error:', result.error);
}
```

## API

### `gregorianToNepali(year: number, month: number, day: number): CalendarDate`

Converts a Gregorian date to Nepali calendar.

**Parameters:**
- `year`: Gregorian year (1944–2100)
- `month`: Month (1–12)
- `day`: Day of month

**Returns:** `{ year, month, day }` in Nepali calendar

**Throws:** Error if date is invalid

### `nepaliToGregorian(year: number, month: number, day: number): CalendarDate`

Converts a Nepali date to Gregorian calendar.

**Parameters:**
- `year`: Nepali year (2000–2100)
- `month`: Month (1–12)
- `day`: Day of month

**Returns:** `{ year, month, day }` in Gregorian calendar

**Throws:** Error if date is invalid

### `validateGregorian(year: number, month: number, day: number): ValidationResult`

Validates a Gregorian date.

**Returns:** `{ valid: boolean, error?: string }`

### `validateNepali(year: number, month: number, day: number): ValidationResult`

Validates a Nepali date.

**Returns:** `{ valid: boolean, error?: string }`

## Development

### Install dependencies

```bash
bun install
```

### Build

```bash
bun run build
```

### Run tests

```bash
bun run test
```

### Run tests once

```bash
bun run test:run
```

## License

MIT
