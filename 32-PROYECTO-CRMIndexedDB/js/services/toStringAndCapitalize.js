export default function toStringAndCapitalize (array) {
  const capitalizedArray = array.map(word => {
    const firstLetter = word.charAt(0).toUpperCase()
    const rest = word.slice(1).toLowerCase()

    return firstLetter + rest
  })

  return capitalizedArray.join(', ').toString()
}