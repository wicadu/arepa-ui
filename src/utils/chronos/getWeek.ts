import capitalize from '../capitalize'

export interface WeekOptions {
  /**
   * Format for the week representation.
   * - `W`: Short week of the month (e.g., "1W").
   * - `WWW`: Full week of the month (e.g., "Semana 1", "Week 1").
   * - `YW`: Short week of the year (e.g., "27W").
   * - `YWWW`: Full week of the year (e.g., "Semana 27", "Week 27").
   */
  format?: 'W' | 'WWW' | 'YW' | 'YWWW'

  /**
   * Locale for week labels.
   * Defaults to "es" (Spanish).
   */
  locale?: string

  /**
   * Whether to capitalize the first letter of week labels.
   * Defaults to `false`.
   */
  capitalize?: boolean
}

const defaultOptions: WeekOptions = {
  format: 'W',
  locale: 'es',
  capitalize: true,
}

/**
 * Determines the week of the month for a given date.
 */
function getWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay()
  return Math.ceil((date.getDate() + firstDayOfMonth) / 7)
}

/**
 * Determines the week of the year for a given date.
 */
function getWeekOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDays = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
  )
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7)
}

/**
 * Formats weeks based on the specified options.
 */
function getWeek(date: Date, options: WeekOptions = {}): string {
  const {
    format,
    locale,
    capitalize: shouldCapitalize,
  } = {
    ...defaultOptions,
    ...options,
  }

  const localeMap = {
    es: {
      W: 's',
      YW: 's',
      WWW: 'semana',
      YWWW: 'semana',
    },
    en: {
      W: 'w',
      YW: 'w',
      WWW: 'week',
      YWWW: 'week',
    },
  }

  let label = localeMap[locale][format]

  if (shouldCapitalize) {
    label = capitalize(localeMap[locale][format])
  }

  const weekOfMonth = getWeekOfMonth(date)
  const weekOfYear = getWeekOfYear(date)

  let week = ''

  switch (format) {
    case 'W':
      week = `${label}${weekOfMonth}`
      break
    case 'WWW':
      week = `${label} ${weekOfMonth}`
      break
    case 'YW':
      week = `${label}${weekOfYear}`
      break
    case 'YWWW':
      week = `${label} ${weekOfYear}`
      break
    default:
      throw new Error(`Unsupported format: ${format}`)
  }

  return shouldCapitalize ? capitalize(week) : week
}

export default getWeek
