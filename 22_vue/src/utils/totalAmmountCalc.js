export default function totalAmmountCalc (ammount, term) {
  let total

  // Lower interest as higher the ammount
  if (ammount < 250000) {
    total = ammount * 1.5
  } else if (ammount >= 250000 && ammount < 500000) {
    total = ammount * 1.4
  } else if (ammount >= 500000 && ammount < 750000) {
    total = ammount * 1.3
  } else {
    total = ammount * 1.2
  }

  // Higher interest as higher the term
  if (term === 6) {
    total *= 1.1
  } else if (term === 12) {
    total *= 1.2
  } else {
    total *= 1.3
  }

  return total
}
