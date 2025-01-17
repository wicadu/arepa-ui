export interface MinuteOptions {
  /**
   * Whether to pad the minutes with a leading zero if less than 10.
   * Defaults to true.
   */
  padWithZero?: boolean
}

const defaultOptions: MinuteOptions = {
  padWithZero: true,
}

/**
 * Retrieves the minutes component of a given date, formatted based on the specified options.
 *
 * @param {Time} date - The date to retrieve minutes from.
 * @param {MinuteOptions} [options=defaultOptions] - Options for configuring the minute format.
 * @returns {string | number} - The minutes (e.g., "01", "02" for padded, or 1, 2 for unpadded).
 *
 * @example
 * const minutesPadded = getMinute(new Date(), { padWithZero: true }) // e.g., "03"
 * const minutesUnpadded = getMinute(new Date(), { padWithZero: false }) // e.g., 3
 */
function getMinute(date: Date, options: MinuteOptions = {}): string {
  const { padWithZero } = {
    ...defaultOptions,
    ...options,
  }

  const minutes = date.getMinutes()

  return padWithZero ? minutes.toString().padStart(2, '0') : minutes.toString()
}

export default getMinute
