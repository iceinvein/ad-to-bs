import { describe, expect, it } from "vitest";
import {
	gregorianToNepali,
	nepaliToGregorian,
	validateGregorian,
	validateNepali,
} from "./converter";

describe("Calendar Conversion", () => {
	describe("gregorianToNepali", () => {
		it("should convert 1944-01-01 (Gregorian epoch) to Nepali calendar", () => {
			const result = gregorianToNepali(1944, 1, 1);
			expect(result.year).toBe(2000);
			expect(result.month).toBe(7);
			expect(result.day).toBe(17);
		});

		it("should convert 2023-10-17 to Nepali calendar", () => {
			const result = gregorianToNepali(2023, 10, 17);
			expect(result.year).toBe(2080);
			expect(result.month).toBe(6);
			expect(result.day).toBe(10);
		});

		it("should convert 2000-01-01 to Nepali calendar", () => {
			const result = gregorianToNepali(2000, 1, 1);
			expect(result.year).toBe(2056);
			expect(result.month).toBe(8);
		});

		it("should handle leap year dates", () => {
			const result = gregorianToNepali(2020, 2, 29);
			expect(result).toBeDefined();
			expect(result.year).toBeGreaterThan(0);
		});

		it("should throw error for invalid Gregorian date", () => {
			expect(() => gregorianToNepali(2023, 13, 1)).toThrow();
			expect(() => gregorianToNepali(2023, 2, 30)).toThrow();
		});
	});

	describe("nepaliToGregorian", () => {
		it("should convert 2000-07-17 to Gregorian calendar", () => {
			const result = nepaliToGregorian(2000, 7, 17);
			expect(result.year).toBe(1944);
			expect(result.month).toBe(1);
			expect(result.day).toBe(1);
		});

		it("should convert 2080-06-10 to Gregorian calendar", () => {
			const result = nepaliToGregorian(2080, 6, 10);
			expect(result.year).toBe(2023);
			expect(result.month).toBe(10);
			expect(result.day).toBe(17);
		});

		it("should convert 2056-08-01 to Gregorian calendar", () => {
			const result = nepaliToGregorian(2056, 8, 1);
			expect(result.year).toBe(2000);
		});

		it("should throw error for invalid Nepali date", () => {
			expect(() => nepaliToGregorian(2000, 13, 1)).toThrow();
			expect(() => nepaliToGregorian(2000, 1, 32)).toThrow();
		});

		it("should throw error for unsupported year", () => {
			expect(() => nepaliToGregorian(1999, 1, 1)).toThrow();
			expect(() => nepaliToGregorian(2101, 1, 1)).toThrow();
		});
	});

	describe("Round-trip conversion", () => {
		it("should convert Gregorian to Nepali and back", () => {
			const original = { year: 2023, month: 10, day: 17 };
			const nepali = gregorianToNepali(
				original.year,
				original.month,
				original.day,
			);
			const gregorian = nepaliToGregorian(
				nepali.year,
				nepali.month,
				nepali.day,
			);
			expect(gregorian).toEqual(original);
		});

		it("should convert Nepali to Gregorian and back", () => {
			const original = { year: 2080, month: 7, day: 1 };
			const gregorian = nepaliToGregorian(
				original.year,
				original.month,
				original.day,
			);
			const nepali = gregorianToNepali(
				gregorian.year,
				gregorian.month,
				gregorian.day,
			);
			expect(nepali).toEqual(original);
		});

		it("should handle multiple round-trip conversions", () => {
			const dates = [
				{ year: 2000, month: 1, day: 1 },
				{ year: 2010, month: 6, day: 15 },
				{ year: 2023, month: 10, day: 17 },
			];

			dates.forEach((date) => {
				const nepali = gregorianToNepali(date.year, date.month, date.day);
				const gregorian = nepaliToGregorian(
					nepali.year,
					nepali.month,
					nepali.day,
				);
				expect(gregorian).toEqual(date);
			});
		});
	});

	describe("validateGregorian", () => {
		it("should validate correct Gregorian dates", () => {
			expect(validateGregorian(2023, 10, 17).valid).toBe(true);
			expect(validateGregorian(2020, 2, 29).valid).toBe(true);
		});

		it("should reject invalid months", () => {
			expect(validateGregorian(2023, 0, 1).valid).toBe(false);
			expect(validateGregorian(2023, 13, 1).valid).toBe(false);
		});

		it("should reject invalid days", () => {
			expect(validateGregorian(2023, 2, 30).valid).toBe(false);
			expect(validateGregorian(2023, 4, 31).valid).toBe(false);
		});
	});

	describe("validateNepali", () => {
		it("should validate correct Nepali dates", () => {
			expect(validateNepali(2000, 9, 17).valid).toBe(true);
			expect(validateNepali(2080, 7, 1).valid).toBe(true);
		});

		it("should reject invalid months", () => {
			expect(validateNepali(2000, 0, 1).valid).toBe(false);
			expect(validateNepali(2000, 13, 1).valid).toBe(false);
		});

		it("should reject unsupported years", () => {
			expect(validateNepali(1999, 1, 1).valid).toBe(false);
			expect(validateNepali(2101, 1, 1).valid).toBe(false);
		});
	});
});
