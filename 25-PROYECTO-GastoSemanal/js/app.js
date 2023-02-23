// Variables
const form = document.getElementById("agregar-gasto");
const expName = document.getElementById("gasto");
const expAmmount = document.getElementById("cantidad");
const expList = document.querySelector("#gastos ul");
const totMoney = document.getElementById("total");
const remMoney = document.getElementById("restante");

// Events
setEvents();
function setEvents() {
  document.addEventListener("DOMContentLoaded", initial);
  form.addEventListener("submit", manageBills);
}

// Classes
class Budget {
  constructor(budget) {
    this.totBudget = budget;
    this.remBudget = budget;
    this.bills = [];
  }

  addBill(billName, billCost) {
    this.bills = [
      ...this.bills,
      { billName: billName, billCost: billCost, id: new Date().getTime() },
    ];

    this.updateBudget();
  }

  updateBudget() {
    let totalBillCost = 0;
    budget.bills.forEach((bill) => {
      totalBillCost += bill.billCost;
    });

    budget.remBudget = budget.totBudget - totalBillCost;
  }
}

class Interface {
  showItems(budgetObj) {
    const { totBudget, remBudget } = budgetObj;
    totMoney.textContent = totBudget;
    remMoney.textContent = remBudget;
    this.remBudgetColor(totBudget, remBudget);
  }

  remBudgetColor(totBudget, remBudget) {
    const remMoneyContainer = document.querySelector('.restante')
    const classes = ['alert-success', 'alert-warning', 'alert-danger']

    function classesFilter(validCls) {
      let validClass = [];
      let invalidClasses = [];

      validClass = classes.filter(cls => cls === validCls)[0]
      invalidClasses = classes.filter(cls => cls != validClass)

      const filter = {
        valid: validClass,
        invalid: invalidClasses
      }
      return filter;
    }

    let filter;
    switch (true) {
      case remBudget < totBudget * .15:
        filter = classesFilter('alert-danger')
        break;
      case remBudget < totBudget * .5:
        filter = classesFilter('alert-warning')
        break;
      case remBudget >= totBudget * .5:
        filter = classesFilter('alert-success')
    }

    const {valid, invalid} = filter
    remMoneyContainer.classList.add(valid)
    invalid.forEach(cls => {
      remMoneyContainer.classList.remove(cls)
    })
  }

  message(type, message) {
    // Create Message HTML
    const messageContainer = document.createElement("DIV");
    messageContainer.classList.add("text-center", "alert", "message");
    switch (type) {
      case "error":
        messageContainer.classList.add("alert-danger");
        break;
      case "success":
        messageContainer.classList.add("alert-success");
        break;
    }

    const messageText = document.createElement("P");
    messageText.textContent = message;
    messageContainer.appendChild(messageText);

    // Remove existing alerts
    const DOMAlert = document.querySelector(".message");
    if (DOMAlert) {
      DOMAlert.remove();
    }

    // Insert message before form
    form.parentElement.insertBefore(messageContainer, form);

    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }

  showBills(budgetObj) {
    while (expList.firstChild) {
      expList.removeChild(expList.firstChild);
    }
    const billArr = budgetObj.bills;
    billArr.forEach((element) => {
      // Create html
      const bill = document.createElement("LI");
      const billSpan = document.createElement("SPAN");
      const billButton = document.createElement("BUTTON");

      bill.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      billSpan.classList.add("badge", "badge-primary", "badge-pill");
      billButton.classList.add("btn", "btn-danger", "borrar-gasto");

      bill.setAttribute("data-id", new Date().getTime());

      const { billName, billCost, id } = element;

      bill.textContent = billName;
      billSpan.textContent = `$${billCost}`;
      billButton.textContent = "BORRAR";

      bill.appendChild(billSpan);
      bill.appendChild(billButton);
      expList.appendChild(bill);

      billButton.onclick = () => {
        this.removeBill(billArr, id);
      };
    });
  }

  removeBill(arr, id) {
    arr = arr.filter((e) => e.id != id);
    budget.bills = arr;
    budget.updateBudget();
    this.showBills(budget);
    this.showItems(budget);
  }
}

let budget;
const interface = new Interface();
// Functions

function initial() {
  promptManager();
}

function promptManager(text) {
  let userBudget;
  const storageBudget = JSON.parse(localStorage.getItem('Budget'));
  if(storageBudget) {
    userBudget = storageBudget.totBudget;
  } else {
    userBudget = prompt(text || "¿Cuál es tu presupuesto?");
    console.log(userBudget)
  }

  // prompt validation
  if (userBudget === null ) {
    userBudget = 0
  } else if (!parseFloat(userBudget) || userBudget < 0) {
    promptManager("Porfavor ingrese una cantidad válida");
    return
  }

  budget = new Budget(parseFloat(userBudget));
  localStorage.setItem('Budget', JSON.stringify(budget));
  interface.showItems(budget);
}

function manageBills(evt) {
  evt.preventDefault();
  
  const name = expName.value;
  const ammount = parseFloat(expAmmount.value);

  if (!billValidation(name, ammount)) return;


  interface.message("success", "Correcto");
  if((budget.remBudget - ammount) < 0) {
    interface.message("error", "El gasto supera el presupuesto");
    return
  }
  budget.addBill(name, ammount);
  interface.showBills(budget);
  interface.showItems(budget);
  form.reset();
}

function billValidation(name, ammount) {
  let validation = false;

  if (name === "" || ammount === "") {
    interface.message("error", "No pueden haber campos vacíos");
    return validation;
  }

  const regEx = /^[+-]?\d+(\.\d+)?$/;
  if (!regEx.test(ammount) || ammount <= 0) {
    interface.message("error", "Valor no válido");
    return validation;
  }

  validation = true;
  return validation;
}

function addClass(element, cls) {
  element.classList.add(cls)
}
