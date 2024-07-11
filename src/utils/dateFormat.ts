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

interface DateFormatOptions {
  language: 'en-US' | 'es-CL'
  longFormat: boolean
  withHours: boolean
}

const defaultOptions: DateFormatOptions = {
  language: 'en-US',
  withHours: false,
  longFormat: false,
}

function dateFormat(
  date: Date | string,
  options: Partial<DateFormatOptions> = defaultOptions
): string {
  const standardizedDate = new Date(date || new Date())

  const { language, withHours, longFormat } = options

  const dateOptions = longFormat ? dateOptionsLong : dateOptionsShort
  const formattedDate = standardizedDate.toLocaleDateString(
    language,
    dateOptions
  )
  const formattedHours = standardizedDate.toLocaleString('en-US', hoursOptions)

  return `${formattedDate} ${withHours ? `${formattedHours}` : ''}`
}

export default dateFormat
