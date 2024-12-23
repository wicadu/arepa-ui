export default (hex: string, alpha: number) => {
  try {
    let content = hex.replace('#', '')

    const hexadecimal =
      content.length > 3 ? content.match(/[a-f\d]{2}/gi) : content.split('')

    const color = hexadecimal
      .map((value) =>
        String(parseInt(value.length === 2 ? value : `${value}${value}`, 16))
      )
      .join(', ')

    return `rgba(${color}, ${alpha || 0})`
  } catch {
    return hex
  }
}
