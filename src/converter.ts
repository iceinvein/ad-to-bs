import { nepaliMonthLengths } from "./nepaliMonths";
import type { CalendarDate, ValidationResult } from "./types";

/**
 * Converts Gregorian date to Julian Day Number
 */
function gregorianToJDN(year: number, month: number, day: number): number {
	const a = Math.floor((14 - month) / 12);
	const y = year + 4800 - a;
	const m = month + 12 * a - 3;

	return (
		day +
		Math.floor((153 * m + 2) / 5) +
		365 * y +
		Math.floor(y / 4) -
		Math.floor(y / 100) +
		Math.floor(y / 400) -
		32045
	);
}

/**
 * Converts Julian Day Number to Gregorian date
 */
function jdnToGregorian(jdn: number): CalendarDate {
	const a = jdn + 32044;
	const b = Math.floor((4 * a + 3) / 146097);
	const c = a - Math.floor((146097 * b) / 4);
	const d = Math.floor((4 * c + 3) / 1461);
	const e = c - Math.floor((1461 * d) / 4);
	const m = Math.floor((5 * e + 2) / 153);

	const day = e - Math.floor((153 * m + 2) / 5) + 1;
	const month = m + 3 - 12 * Math.floor((m + 3) / 12);
	const year = 100 * b + d - 4800 + Math.floor((m + 3) / 12);

	return { year, month, day };
}

/**
 * Converts Nepali date to Julian Day Number
 * Reference: 2000-01-01 BS = 1943-04-14 AD (JDN 2430888)
 */
function nepaliToJDN(year: number, month: number, day: number): number {
	// JDN for 2000-01-01 BS (Nepali epoch)
	const nepaliEpochJDN = 2430888;
	let totalDays = 0;

	// Add days for all complete years from 2000 to year-1
	for (let y = 2000; y < year; y++) {
		const monthLengths = nepaliMonthLengths[y];
		if (monthLengths) {
			totalDays += monthLengths.reduce((sum, days) => sum + days, 0);
		}
	}

	// Add days for all complete months in the current year
	const monthLengths = nepaliMonthLengths[year];
	if (monthLengths) {
		for (let m = 0; m < month - 1; m++) {
			totalDays += monthLengths[m];
		}
	}

	// Add the day of month
	totalDays += day - 1;

	return nepaliEpochJDN + totalDays;
}

/**
 * Converts Julian Day Number to Nepali date
 */
function jdnToNepali(jdn: number): CalendarDate {
	const nepaliEpochJDN = 2430888;
	let remainingDays = jdn - nepaliEpochJDN;

	let year = 2000;
	let month = 1;
	let day = 1;

	// Find the year by subtracting complete years
	while (remainingDays >= 0) {
		const monthLengths = nepaliMonthLengths[year];
		if (!monthLengths) break;

		const yearDays = monthLengths.reduce((sum, d) => sum + d, 0);
		if (remainingDays < yearDays) {
			break;
		}
		remainingDays -= yearDays;
		year++;
	}

	// Find the month and day
	const monthLengths = nepaliMonthLengths[year];
	if (monthLengths) {
		for (let m = 0; m < 12; m++) {
			const daysInMonth = monthLengths[m];
			if (remainingDays < daysInMonth) {
				month = m + 1;
				day = remainingDays + 1;
				break;
			}
			remainingDays -= daysInMonth;
		}
	}

	return { year, month, day };
}

/**
 * Validates a Gregorian date
 */
export function validateGregorian(
	year: number,
	month: number,
	day: number,
): ValidationResult {
	if (month < 1 || month > 12) {
		return { valid: false, error: "Month must be between 1 and 12" };
	}

	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Check for leap year
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		daysInMonth[1] = 29;
	}

	if (day < 1 || day > daysInMonth[month - 1]) {
		return {
			valid: false,
			error: `Day must be between 1 and ${daysInMonth[month - 1]}`,
		};
	}

	return { valid: true };
}

/**
 * Validates a Nepali date
 */
export function validateNepali(
	year: number,
	month: number,
	day: number,
): ValidationResult {
	if (month < 1 || month > 12) {
		return { valid: false, error: "Month must be between 1 and 12" };
	}

	const monthLengths = nepaliMonthLengths[year];
	if (!monthLengths) {
		return {
			valid: false,
			error: `Year ${year} is not supported (supported range: 2000-2100)`,
		};
	}

	const maxDay = monthLengths[month - 1];
	if (day < 1 || day > maxDay) {
		return {
			valid: false,
			error: `Day must be between 1 and ${maxDay} for month ${month}`,
		};
	}

	return { valid: true };
}

/**
 * Converts Gregorian date to Nepali date
 */
export function gregorianToNepali(
	year: number,
	month: number,
	day: number,
): CalendarDate {
	const validation = validateGregorian(year, month, day);
	if (!validation.valid) {
		throw new Error(`Invalid Gregorian date: ${validation.error}`);
	}

	const jdn = gregorianToJDN(year, month, day);
	return jdnToNepali(jdn);
}

/**
 * Converts Nepali date to Gregorian date
 */
export function nepaliToGregorian(
	year: number,
	month: number,
	day: number,
): CalendarDate {
	const validation = validateNepali(year, month, day);
	if (!validation.valid) {
		throw new Error(`Invalid Nepali date: ${validation.error}`);
	}

	const jdn = nepaliToJDN(year, month, day);
	return jdnToGregorian(jdn);
}
