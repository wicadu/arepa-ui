type Time = Date | string

export interface HoursOptions {
  /**
   * Whether to return the hour in 24-hour format.
   * Defaults to true for 24-hour format. Set to false for 12-hour format with AM/PM.
   */
  is24HourFormat?: boolean

  /**
   * The locale to format the AM/PM in the appropriate language (e.g., 'en' for English, 'es' for Spanish).
   * Defaults to 'es' (Spanish).
   */
  locale?: 'es' | 'en' | 'pt' | 'fr'
}

const defaultOptions: HoursOptions = {
  is24HourFormat: false,
  locale: 'es',
}

/**
 * Retrieves the hours component of a given date based on the specified options.
 *
 * @param {Time} date - The date to retrieve hours from.
 * @param {HoursOptions} [options=defaultOptions] - Options for configuring the hour format and locale.
 * @returns {string | number} - The hours (e.g., 23 for 11 PM in 24-hour format, or "11 PM" in 12-hour format).
 */
function getHours(
  date: Time = new Date(),
  options: HoursOptions = defaultOptions
): string | number {
  const { is24HourFormat, locale } = {
    ...defaultOptions,
    ...options,
  }

  const standardizedDate = new Date(date)
  const hours = standardizedDate.getHours()

  const amPmMap: Record<string, { am: string; pm: string }> = {
    en: { am: 'AM', pm: 'PM' },
    es: { am: 'am', pm: 'pm' },
    fr: { am: 'AM', pm: 'PM' },
  }

  if (is24HourFormat) return hours

  const period =
    hours >= 12 ? amPmMap[locale]?.pm || 'PM' : amPmMap[locale]?.am || 'AM'

  const hour12 = hours % 12 || 12
  return `${hour12}${period}`
}

export default getHours
