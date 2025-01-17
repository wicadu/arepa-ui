import toMilliseconds, { TimeType } from './toMilliseconds'

/**
 * Calculates the difference between two dates in the specified granularity (e.g., seconds, minutes, hours, days, months, years).
 *
 * @param {string | Date} start - The start date (ISO string or any format accepted by the Date constructor).
 * @param {string | Date} end - The end date (ISO string or any format accepted by the Date constructor).
 * @param {TimeType} granularity - The unit of measurement for the difference ('seconds', 'minutes', 'hours', 'days', 'months', 'years').
 * @returns {number} The difference between the two dates in the specified granularity.
 *
 * @example
 * // Get the difference in days
 * getDateDifference('2024-01-01', '2025-01-01', 'days') // Returns 365
 *
 * // Get the difference in hours
 * getDateDifference('2024-01-01T00:00:00', '2024-01-02T00:00:00', 'hours') // Returns 24
 */
function getDateDifference(
  start: Date | string,
  end: Date | string,
  granularity: TimeType
): number {
  const startDate: Date = new Date(start)
  const endDate: Date = new Date(end)

  const differenceInMilliseconds: number =
    endDate.getTime() - startDate.getTime()

  const differenceInRequestedGranularity: number =
    differenceInMilliseconds / toMilliseconds(1, granularity)

  return differenceInRequestedGranularity
}

export default getDateDifference
