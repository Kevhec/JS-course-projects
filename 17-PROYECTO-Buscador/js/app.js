// Variables
const result = document.getElementById('resultado');
const yearSelect = document.getElementById('year');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 13;
console.log(maxYear, minYear)

// Events
document.addEventListener('DOMContentLoaded', () => {
  showCars();

  //get Years
  getYears()
})


// Functions
function showCars() {
  cars.forEach(car => {
    const {brand, model, year, price, doors, color, transmission} = car
    const carHTML = document.createElement('P');
    carHTML.textContent = `${brand} - ${model} - ${year} - ${price} - ${doors} - ${color} - ${transmission}`

    // Insert HTML
    result.appendChild(carHTML);
  })
}

function getYears() {
  for(let i = maxYear; i >= minYear; i--) {
    const option = document.createElement('OPTION');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}