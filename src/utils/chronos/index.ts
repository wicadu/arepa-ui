import getDateDifference from './getDiffBetweenDates'
import dateFormat, { type DateFormatOptions } from './dateFormat'
import getHours, { type HoursOptions } from './getHours'
import toMilliseconds, { type TimeType } from './toMilliseconds'

export type Time = Date | string

/**
 * `chronos` is a versatile date utility that wraps around `dateFormat`.
 * It provides both a default formatted date string and methods for extracting specific date and time components.
 *
 * @param {Time} [date=new Date()] - The date to format. Defaults to the current date.
 * @returns {string | Object} - The formatted date string or an object with methods for specific date components.
 *
 * @example
 * const chrono = chronos(new Date())
 *
 * // Default behavior (formatted date string)
 * console.log(chrono) // "25 de diciembre de 2024 11:59 PM"
 *
 * // Use specific date/time component methods
 * console.log(chrono.year()) // 2024
 * console.log(chrono.month()) // 12
 *
 * // Use in template literals or concatenation
 * console.log(`Date: ${chrono}`) // "Date: 25 de diciembre de 2024 11:59 PM"
 */
function chronos(date: Time = new Date()) {
  const standardizedDate = new Date(date)

  // Instance methods to access specific date components
  const instance = {
    /**
     * Format the date based on provided options
     * @param {Partial<DateFormatOptions>} options - Formatting options
     * @returns {string} - The formatted date string
     */
    format: (options: Partial<DateFormatOptions>) =>
      dateFormat(standardizedDate, options),

    /**
     * Retrieves the year component of the date.
     * @returns {number} - The year (e.g., 2024).
     */
    year: () => standardizedDate.getFullYear(),

    /**
     * Retrieves the month component of the date (1-based, e.g., January = 1).
     * @returns {number} - The month (e.g., 12 for December).
     */
    month: () => standardizedDate.getMonth() + 1,

    /**
     * Retrieves the day of the month.
     * @returns {number} - The day of the month (e.g., 25).
     */
    day: () => standardizedDate.getDate(),

    /**
     * Retrieves the hours component of the time based on the specified options.
     * @param {HoursOptions} [options={}] - Options for configuring the hour format.
     * @returns {string | number} - The hours (e.g., 23 for 11 PM in 24-hour format, or "11 PM" in 12-hour format).
     */
    hour: (options: HoursOptions = {}) => getHours(standardizedDate, options),

    /**
     * Retrieves the minutes component of the time.
     * @returns {number} - The minutes (e.g., 59).
     */
    minute: () => standardizedDate.getMinutes(),

    /**
     * Retrieves date and time components as an object with `date` and `time` properties.
     * @returns {Object} - An object containing `date` and `time` strings.
     * @example
     * { date: "25 de diciembre de 2024", time: "11:59 PM" }
     */
    getTime: (options: Partial<DateFormatOptions>) => {
      const timeOptions: Partial<DateFormatOptions> = {
        withHours: true,
        ...options,
      }

      const formattedTime: string = dateFormat(date, timeOptions)
      const [dateTime, hoursTime] =
        formattedTime.split(/(\d{1,2}:\d{2} [APM]{2})/).filter(Boolean) || []

      return {
        dateTime: dateTime?.trim(),
        hoursTime: hoursTime?.trim(),
      }
    },

    /**
     * Subtracts a given amount of time from the current date.
     * @param {number} value - The amount of time to subtract.
     * @param {TimeType} type - The unit of the provided time.
     * @returns {Date} - The resulting date.
     * @example
     * const updatedDate = chronos(new Date()).subtract(5, 'days')
     */
    subtract: (value: number, type: TimeType): Date => {
      const timeToSSubtract: number = toMilliseconds(value, type)
      return new Date(standardizedDate.getTime() - timeToSSubtract)
    },

    /**
     * Returns the difference in granularity (e.g., seconds, minutes, hours, days) between the current date and another date.
     * @param {Time} end - The end date to compare with.
     * @param {TimeType} granularity - The unit of time for the difference ('seconds', 'minutes', 'hours', 'days', 'months', 'years').
     * @returns {number} - The difference between the two dates in the specified granularity.
     * @example
     * const diffInDays = chronos().diff('2025-01-01', 'days')
     */
    diff: (end: Time, granularity: TimeType): number => {
      return getDateDifference(standardizedDate, end, granularity)
    },
  }

  return instance
}

export default chronos
