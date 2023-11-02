export default function isValidRun (value: string) {
  const text = value.toLowerCase().trim().replace(/[^\dk]/g, '')

  let counter = 2
  let total = 0
  let size = text.length - 2

  for (; size >= 0; size--, counter += 1) {
    if (counter > 7) {
      counter = 2
    }

    total += Number(text[size]) * counter
  }

  total = Number(11 - (total - 11 * Math.floor(total / 11)))

  let digit = String(total)

  if (total === 11) {
    digit = '0'
  } else if (total === 10) {
    digit = 'k'
  }

  return digit === text.slice(-1)
}
