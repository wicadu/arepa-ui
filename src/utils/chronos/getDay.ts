import capitalize from '../capitalize'

export interface DayOptions {
  /**
   * Format for the day representation.
   * Use `DD MMM` for formats like "12 Sept" or `DD EEE` for formats like "12 Mon".
   * Defaults to `DD MMM`.
   */
  format?: 'DD MMM' | 'DD EEE'

  /**
   * Locale for day and month names.
   * Defaults to "es" (Spanish).
   */
  locale?: string

  /**
   * Whether to capitalize the first letter of day/month names.
   * Defaults to `false`.
   */
  capitalize?: boolean
}

const defaultOptions: DayOptions = {
  format: 'DD MMM',
  locale: 'es',
  capitalize: true,
}

/**
 * Retrieves the formatted day component of a given date based on the specified options.
 *
 * @param {Time} date - The date to retrieve days from.
 * @param {DayOptions} [options={}] - Options for configuring the day format.
 * @returns {string} - The formatted day string (e.g., "12 Sept", "13 Tue").
 *
 * @example
 * const day1 = getDay(new Date(), { format: 'DD MMM', locale: 'en' }) // e.g., "12 Sept"
 * const day2 = getDay(new Date(), { format: 'DD EEE', locale: 'es' }) // e.g., "12 lun"
 */
function getDay(date: Date, options: DayOptions = {}): string {
  const {
    format,
    locale,
    capitalize: shouldCapitalize,
  } = {
    ...defaultOptions,
    ...options,
  }

  const day = date.getDate().toString().padStart(2, '0')
  let month = date.toLocaleString(locale, { month: 'short' })
  let weekday = date.toLocaleString(locale, { weekday: 'short' })

  if (shouldCapitalize) {
    month = capitalize(month)
    weekday = capitalize(weekday)
  }

  if (format === 'DD MMM') {
    return `${day} ${month}`
  } else if (format === 'DD EEE') {
    return `${day} ${weekday}`
  }

  throw new Error(`Unsupported format: ${format}`)
}

export default getDay
