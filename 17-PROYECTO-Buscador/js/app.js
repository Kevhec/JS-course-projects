// Variables
const selects = document.querySelectorAll("select");

const result = document.getElementById("resultado");
const yearSelect = document.getElementById("year");
const maxYear = new Date().getFullYear();
const minYear = maxYear - 13;
const error = document.querySelector('.error')

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
  if(error) {
    error.remove
  }
});

selects.forEach((select) => {
  select.addEventListener("change", () => {
    if (
      select.id === "year" ||
      select.id === "minPrice" ||
      select.id === "maxPrice" ||
      select.id === "doors"
    ) {
      filterObj[select.id] = parseInt(select.value);
    } else {
      filterObj[select.id] = select.value;
    }

    console.log(filterObj);
    carFilter();

    function carFilter() {
      const result = cars
        .filter(filterBrand)
        .filter(filterYear)
        .filter(filterMinPrice)
        .filter(filterMaxPrice)
        .filter(filterDoors)
        .filter(filterTransmission)
        .filter(filterColor);
      showCars(result);
    }

    function filterBrand(car) {
      const { brand } = filterObj;
      if (brand) {
        return car.brand === brand;
      }
      return car;
    }

    function filterYear(car) {
      const { year } = filterObj;
      if (year) {
        return car.year === year;
      }
      return car;
    }

    function filterMinPrice(car) {
      const { minPrice } = filterObj;
      if (minPrice) {
        return car.price >= minPrice;
      }
      return car;
    }

    function filterMaxPrice(car) {
      const { maxPrice } = filterObj;
      if (maxPrice) {
        return car.price <= maxPrice;
      }
      return car;
    }

    function filterDoors(car) {
      const { doors } = filterObj;
      if (doors) {
        return car.doors === doors;
      }
      return car;
    }

    function filterTransmission(car) {
      const { transmission } = filterObj;
      if (transmission) {
        return car.transmission === transmission;
      }
      return car;
    }

    function filterColor(car) {
      const { color } = filterObj;
      if (color) {
        return car.color === color;
      }
      return car;
    }
  });
});

// Functions
function showCars(array) {
  resetList()
  array.forEach((car) => {
    const { brand, model, year, price, doors, color, transmission } = car;
    const carHTML = document.createElement("P");
    carHTML.classList.add('car');
    carHTML.textContent = `${brand} - ${model} - ${year} - $ ${price} - ${doors} - ${color} - ${transmission}`;
    if(!result.innerHTML) {
      errorMessage()
    }
    // Insert HTML
    result.appendChild(carHTML);
  });
}

function resetList() {
  const cars = document.querySelectorAll('.car');
  cars.forEach(car => {
    car.remove()
  })
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
  if(error) {
    error.remove
  }
  const message = document.createElement('P');
  message.classList.add('error')
  message.innerText = 'No results';
  message.style.fontWeight = 'bold';
  message.style.textAlign = 'center';
  result.appendChild(message)
}
