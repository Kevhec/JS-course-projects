// Variables
const selects = document.querySelectorAll("select");

const result = document.getElementById("resultado");
const yearSelect = document.getElementById("year");
const maxYear = new Date().getFullYear();
const minYear = maxYear - 13;

// Filter Object
const filterObj = {
  brand: "",
  year: "",
  minPrice: "",
  maxPrice: "",
  doors: "",
  transmission: "",
  color: "",
};

const filterObjKeys = Object.keys(filterObj);

// Events
document.addEventListener("DOMContentLoaded", () => {
  showCars(cars);
  //get Years
  getYears();
});

selects.forEach((select) => {
  select.addEventListener("change", () => {
    filterObj[select.id] = select.value;
    carFilter();

    function carFilter() {
      const filterResult = cars
        .filter(car => {
          let matches = true;
          filterObjKeys.forEach(filter => {
            let filterVal = filterObj[filter]

            if(/^\d+$/.test(filterVal)) filterVal = parseInt(filterVal);

            if(!matches || !filterVal) return;

            if(filter === 'minPrice') {
              matches = filterVal <= car.price
            } else if(filter === 'maxPrice') {
              matches = filterVal >= car.price
            } else {
              matches = filterVal === car[filter];
            }
          })
          return matches;
        })
        showCars(filterResult);
      }
  });
});

function showCars(array) {
  resetList();
  array.forEach((car) => {
    const { brand, model, year, price, doors, color, transmission } = car;
    const carHTML = document.createElement("P");
    carHTML.classList.add("car");
    carHTML.textContent = `${brand} - ${model} - ${year} - $ ${price} - ${doors} - ${color} - ${transmission}`;
    // Insert HTML
    result.appendChild(carHTML);
  });
  errorMessage();
}

function resetList() {
  const resultCars = document.querySelectorAll(".car");
  resultCars.forEach((car) => {
    car.remove();
  });
}

function getYears() {
  for (let i = maxYear; i >= minYear; i--) {
    const option = document.createElement("OPTION");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

function errorMessage() {
  const message = document.createElement("P");
  message.classList.add("error");
  message.innerText = "No results";
  message.style.fontWeight = "bold";
  message.style.textAlign = "center";
  if (
    document.querySelector(".error") &&
    document.querySelector(".car") != null
  ) {
    document.querySelector(".error").remove();
  }

  if (!result.children[0]) {
    result.appendChild(message);
  }
}