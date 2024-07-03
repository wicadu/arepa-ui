function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: Intl.LocalesArgument
) {
  try {
    if (isNaN(value)) return '$?'

    const defaultLocale: Intl.LocalesArgument = 'es-CL'
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'CLP',
      currencyDisplay: 'narrowSymbol',
    }

    return new Intl.NumberFormat(locale || defaultLocale, {
      ...defaultOptions,
      ...(options || {}),
    }).format(value)
  } catch (error) {
    if (isNaN(value)) return '$?'
  }
}

export default formatCurrency
