const dateOptionsShort: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

const dateOptionsLong: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const hoursOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
}

export interface DateFormatOptions {
  /** Language locale for date formatting (e.g., 'es-CL' or 'en-US'). */
  language: 'es-CL' | 'en-US'
  /** Whether to use a long date format (e.g., "December 25, 2024"). */
  longFormat: boolean
  /** Whether to include time in the formatted string. */
  withHours: boolean
}

const defaultOptions: DateFormatOptions = {
  language: 'es-CL',
  withHours: false,
  longFormat: false,
}

/**
 * Formats a date into a localized string based on the provided options.
 *
 * @param {Date | string} date - The date to format. Accepts a `Date` object or a string that can be parsed into a `Date`.
 * @param {Partial<DateFormatOptions>} [options=defaultOptions] - Custom configuration for formatting the date.
 * @param {string} [options.language='es-CL'] - The language locale to use (default is 'es-CL').
 * @param {boolean} [options.longFormat=false] - Whether to use a long format for the date.
 * @param {boolean} [options.withHours=false] - Whether to include the time in the formatted string.
 * @returns {string} - The formatted date string, optionally including time.
 *
 * @example
 * // Basic usage
 * const formattedDate = dateFormat(new Date(), { language: 'es-CL', longFormat: true })
 * console.log(formattedDate) // "25 de diciembre de 2024"
 *
 * @example
 * // Include time
 * const formattedDateWithTime = dateFormat(new Date(), { withHours: true })
 * console.log(formattedDateWithTime) // "Dec 25, 2024 11:59 PM"
 */
function dateFormat(
  date: Date | string,
  options: Partial<DateFormatOptions> = defaultOptions
): string {
  const standardizedDate = new Date(date || new Date())

  const { language, withHours, longFormat } = {
    ...defaultOptions,
    ...options,
  }

  const dateOptions = longFormat ? dateOptionsLong : dateOptionsShort
  const formattedDate = standardizedDate.toLocaleDateString(
    language,
    dateOptions
  )
  const formattedHours = standardizedDate.toLocaleString('en-US', hoursOptions)

  return `${formattedDate} ${withHours ? `${formattedHours}` : ''}`
}

export default dateFormat
