export default function rutFormat (rut: string) {
  let clearRut = rut.toLocaleLowerCase().replace(/[^\dk]/g, '')

  if (clearRut.length > 1) {
    const lastDigit = clearRut.slice(-1)
    const formattedRut = clearRut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    clearRut = `${formattedRut}-${lastDigit}`
  }

  return clearRut
}
