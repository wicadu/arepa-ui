import capitalize from '../capitalize'

export interface MonthOptions {
  /**
   * Format for the month representation.
   * Use `MMM` for formats like "Jun", "Ago", "Sept", "Dec",
   * `MMMM` for full month names like "January", "August", "December",
   * or `M` for the numeric month (e.g., "1", "8", etc.).
   * Defaults to `MMM`.
   */
  format?: 'MMM' | 'MMMM' | 'M'

  /**
   * Locale for month names.
   * Defaults to "es" (Spanish).
   */
  locale?: string

  /**
   * Whether to capitalize the first letter of the month name.
   * Defaults to `true`.
   */
  capitalize?: boolean
}

const defaultMonthOptions: MonthOptions = {
  format: 'MMM',
  locale: 'es',
  capitalize: true,
}

/**
 * Retrieves the formatted month component of a given date based on the specified options.
 *
 * @param {Date} date - The date to retrieve the month from.
 * @param {MonthOptions} [options={}] - Options for configuring the month format.
 * @returns {string} - The formatted month string (e.g., "Jun", "December", "8").
 *
 * @example
 * const month1 = getMonth(new Date(), { format: 'MMM', locale: 'en' }) // e.g., "Jun"
 * const month2 = getMonth(new Date(), { format: 'MMMM', locale: 'es' }) // e.g., "Enero"
 * const month3 = getMonth(new Date(), { format: 'M' }) // e.g., "8" for August
 */
function getMonth(date: Date, options: MonthOptions = {}): string {
  const {
    format,
    locale,
    capitalize: shouldCapitalize,
  } = {
    ...defaultMonthOptions,
    ...options,
  }

  let month: string

  if (format === 'M') {
    month = (date.getMonth() + 1).toString() // Get month number
  } else {
    month = date.toLocaleString(locale, {
      month: format === 'MMM' ? 'short' : 'long',
    })
  }

  if (shouldCapitalize && format !== 'M') {
    month = capitalize(month)
  }

  return month
}

export default getMonth
