const form = document.getElementById("cotizar-seguro");
const year = document.getElementById("year");
const brand = document.getElementById("marca");
const result = document.getElementById("resultado");
const submitButton = document.querySelector('button[type="submit"]');
console.log(brand);

// Constructors
function Insurance(brandId, brandName, year, type) {
  this.Id = brandId;
  this.Name = brandName;
  this.Year = year;
  this.Type = type;
}

// Object validation
Insurance.prototype.validation = function () {
  let validate = true;
  const values = Object.values(this);
  values.forEach((value) => {
    if (!value) {
      validate = false;
      return;
    }
  });

  switch (validate) {
    case true:
      interface.message("correcto", "Procesando...");
      break;
    case false:
      interface.message("error", "No puede haber campo vacío");
  }

  return validate;
};

Insurance.prototype.quoteInsurance = function () {
  /* 
    prices according to brand
    1 = americano
    2 = asiatico
    3 = europeo
  */
  const base = 300000;
  let ammount;

  switch (this.Id) {
    case "1":
      ammount = base * 1.15;
      break;
    case "2":
      ammount = base * 1.05;
      break;
    case "3":
      ammount = base * 1.35;
  }

  // Apply discount per year old
  const difference = new Date().getFullYear() - this.Year;
  ammount -= ammount * 0.03 * difference;

  // Apply increments according to type
  switch (this.Type) {
    case "basico":
      ammount *= 1.3;
      break;
    case "completo":
      ammount *= 1.5;
  }

  setTimeout(() => {
    interface.showResults(this, Math.floor(ammount));
  }, 3000);
};

function Interface() {}

// Fill year select options
Interface.prototype.setYears = function () {
  const max = new Date().getFullYear();
  min = max - 23;

  for (let i = max; i >= min; i--) {
    const option = document.createElement("OPTION");
    option.textContent = i;
    option.value = i;
    year.appendChild(option);
  }
};

// Error message
Interface.prototype.message = function (elementClass, text) {
  const message = document.createElement("P");
  message.classList.add(elementClass, "message");
  message.textContent = text;

  const DOMMessage = document.querySelector(".message");

  if (DOMMessage) {
    DOMMessage.remove();
  }

  form.insertBefore(message, document.getElementById("resultado"));

  setTimeout(() => {
    message.remove();
  }, 3000);
};

// Show result

Interface.prototype.showResults = function (insurance, ammount) {

  const resultContainer = document.createElement("DIV");
  resultContainer.classList.add("mt-10");

  const keys = Object.keys(insurance).filter((key) => key != "Id");
  keys.forEach((key) => {
    createResult(key, insurance[key])
  });

  createResult('Price', `$${ammount}`)
  result.appendChild(resultContainer);

  function createResult(name, text) {
    const resultText = document.createElement("P");
    resultText.classList.add("font-bold");
    resultText.textContent = `${name}: `;

    const resultSpan = document.createElement("SPAN");
    resultSpan.classList.add("font-normal");
    resultSpan.textContent = text;
    
    resultText.appendChild(resultSpan);
    resultContainer.appendChild(resultText);
  }
};

// Instances
const interface = new Interface();

// Events
document.addEventListener("DOMContentLoaded", () => {
  interface.setYears();
});

form.addEventListener("submit", quote);

// Functions

function quote(evt) {
  evt.preventDefault();

  while (result.firstChild) {
    result.firstChild.remove();
  }
  const type = document.querySelector('input[name="tipo"]:checked').value;

  const brandName = brand.children[brand.selectedIndex].textContent;
  const insurance = new Insurance(brand.value, brandName, year.value, type);


  if (!insurance.validation()) return;

  const spinner = document.getElementById('cargando');
  spinner.classList.remove('hidden');
  submitButton.setAttribute('disabled', true);
  setTimeout(() => {
    spinner.classList.add('hidden')
    submitButton.removeAttribute('disabled', false)
  }, 3000);

  insurance.quoteInsurance();
}