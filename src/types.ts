/**
 * Represents a date in calendar format
 */
export interface CalendarDate {
	year: number;
	month: number;
	day: number;
}

/**
 * Validation result for calendar dates
 */
export interface ValidationResult {
	valid: boolean;
	error?: string;
}
