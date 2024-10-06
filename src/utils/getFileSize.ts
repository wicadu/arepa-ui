function getFileSize(bytes: number) {
  if (bytes === 0) return ''

  const base = 1024

  const sizeUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base))

  const formattedSize =
    Math.round((bytes / Math.pow(base, unitIndex)) * 100) / 100

  return `${formattedSize} ${sizeUnits[unitIndex]}`
}

export default getFileSize
