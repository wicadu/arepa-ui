const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

const hoursOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
}

function dateFormat(
  currentDate: Date | string = new Date(),
  language: string = 'en-US',
  withHours: boolean = false
): string {
  const standardizedDate = new Date(currentDate)

  const formattedDate = standardizedDate.toLocaleDateString(
    language,
    dateOptions
  )
  const formattedHours = standardizedDate.toLocaleString('en-US', hoursOptions)

  return `${formattedDate} ${withHours ? `${formattedHours}` : ''}`
}

export default dateFormat
