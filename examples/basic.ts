import {
	gregorianToNepali,
	nepaliToGregorian,
	validateGregorian,
	validateNepali,
} from "../src/index";

// Example 1: Convert Gregorian to Nepali
console.log("=== Gregorian to Nepali ===");
const nepaliDate = gregorianToNepali(2023, 10, 17);
console.log(
	`2023-10-17 (AD) = ${nepaliDate.year}-${nepaliDate.month}-${nepaliDate.day} (BS)`,
);

// Example 2: Convert Nepali to Gregorian
console.log("\n=== Nepali to Gregorian ===");
const gregorianDate = nepaliToGregorian(2080, 6, 10);
console.log(
	`2080-6-10 (BS) = ${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day} (AD)`,
);

// Example 3: Validate dates
console.log("\n=== Validation ===");
const validGregorian = validateGregorian(2023, 10, 17);
console.log(`Is 2023-10-17 valid? ${validGregorian.valid}`);

const invalidGregorian = validateGregorian(2023, 2, 30);
console.log(`Is 2023-02-30 valid? ${invalidGregorian.valid}`);
if (!invalidGregorian.valid) {
	console.log(`Error: ${invalidGregorian.error}`);
}

// Example 4: Round-trip conversion
console.log("\n=== Round-trip Conversion ===");
const original = { year: 2000, month: 1, day: 1 };
const toNepali = gregorianToNepali(original.year, original.month, original.day);
const backToGregorian = nepaliToGregorian(
	toNepali.year,
	toNepali.month,
	toNepali.day,
);
console.log(`Original: ${original.year}-${original.month}-${original.day}`);
console.log(`To Nepali: ${toNepali.year}-${toNepali.month}-${toNepali.day}`);
console.log(
	`Back to Gregorian: ${backToGregorian.year}-${backToGregorian.month}-${backToGregorian.day}`,
);
console.log(
	`Match: ${JSON.stringify(original) === JSON.stringify(backToGregorian)}`,
);

// Example 5: Validate nepali dates
console.log("\n=== Validate Nepali Dates ===");
const validNepali = validateNepali(2080, 6, 10);
console.log(`Is 2080-6-10 valid? ${validNepali.valid}`);

const invalidNepali = validateNepali(2080, 13, 1);
console.log(`Is 2080-13-1 valid? ${invalidNepali.valid}`);
if (!invalidNepali.valid) {
	console.log(`Error: ${invalidNepali.error}`);
}

// Example 6: Convert leap year dates
console.log("\n=== Leap Year Conversion ===");
const leapNepali = gregorianToNepali(2020, 2, 29);
console.log(
	`2020-02-29 (AD) = ${leapNepali.year}-${leapNepali.month}-${leapNepali.day} (BS)`,
);
