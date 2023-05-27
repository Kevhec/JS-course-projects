export default function moneyFormatter (value) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  })
  return formatter.format(Math.floor(value))
}
