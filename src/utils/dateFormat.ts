const dateOptions: object = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}

const hoursOptions: object = {
  minute: '2-digit',
  hour12: true,
  hour: '2-digit',
}

export default (
  currentDate: Date | string = new Date(),
  language: string = 'es-CL',
  withHours: boolean = false
) => {
  const standardizedDate = new Date(currentDate)

  const formattedDate = standardizedDate.toLocaleDateString(language, dateOptions)
  const formattedHours = standardizedDate.toLocaleDateString('en', hoursOptions)

  return `${formattedDate} ${withHours ? `- ${formattedHours}` : ''}`
}
