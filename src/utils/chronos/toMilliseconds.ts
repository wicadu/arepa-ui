export type TimeType = 'seconds' | 'minutes' | 'hours' | 'days' | 'years'

/**
 * Converts a given time and type into milliseconds.
 *
 * @param {number} time - The amount of time to convert.
 * @param {TimeType} type - The unit of the provided time.
 *                          Options are 'seconds', 'minutes', 'hours', 'days', or 'years'.
 * @returns {number} The equivalent time in milliseconds.
 *
 * @example
 * // Convert 2 minutes to milliseconds
 * toMilliseconds(2, 'minutes') // Returns 120000
 */
function toMilliseconds(time: number, type: TimeType): number {
  const timeMultipliers: Record<TimeType, number> = {
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    years: 1000 * 60 * 60 * 24 * 365,
  }

  return time * timeMultipliers[type]
}

export default toMilliseconds
