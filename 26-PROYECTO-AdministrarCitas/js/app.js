// Variables
const form = document.getElementById("nueva-cita");
const content = document.getElementById("contenido");
let editMode;
let editObjId;

// Events
form.addEventListener("submit", newAppointment);

// Classes
class Appointments {
  constructor() {
    this.appointments = [];
  }

  appendAppointment(appointment) {
    this.appointments = [...this.appointments, appointment];
  }

  removeAppointment(id) {
    this.appointments = this.appointments.filter(
      (appointment) => appointment["id"] != id
    );
  }

  editAppointment(updatedAppointment) {
    this.appointments = this.appointments.map((appointment) =>
      appointment.id == updatedAppointment.id ? updatedAppointment : appointment
    );
    console.log(this.appointments);
  }
}

class Interface {
  alert(ref, type, message) {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) {
      existingAlert.remove();
    }

    const alertContainer = document.createElement("DIV");
    const alertTextContainer = document.createElement("P");
    const refParent = ref.parentElement;

    alertContainer.classList.add("text-center", "alert", "d-block", "col-12");
    switch (type) {
      case "error":
        alertContainer.classList.add("alert-danger");
        break;
      case "success":
        alertContainer.classList.add("alert-success");
    }

    alertTextContainer.textContent = message;

    alertContainer.appendChild(alertTextContainer);
    refParent.insertBefore(alertContainer, ref);

    setTimeout(() => {
      alertContainer.remove();
    }, 3000);
  }

  printAppointment(arr) {
    const appointmentsList = document.getElementById("citas");
    while (appointmentsList.children[0]) {
      appointmentsList.children[0].remove();
    }
    // Appointment HTML
    arr.forEach((element) => {
      const noIdArr = Object.keys(element).filter(
        (el) => el != "id" && el != "mascota"
      );
      const container = document.createElement("LI");
      const heading = document.createElement("H2");

      container.classList.add("cita", "p-3");
      container.dataset.id = element["id"];
      heading.classList.add("card-title", "font-weight-bolder");

      heading.textContent = element.mascota;
      container.appendChild(heading);

      noIdArr.forEach((elm) => {
        const p = document.createElement("P");
        p.innerHTML = `<span class="font-weight-bolder text-capitalize">${elm}</span>: ${element[elm]}`;

        container.appendChild(p);
      });

      const delButton = document.createElement("BUTTON");
      delButton.classList.add("btn", "btn-danger", "mr-2");
      delButton.innerHTML =
        'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
      container.appendChild(delButton);

      const editButton = document.createElement("BUTTON");
      editButton.classList.add("btn", "btn-success");
      editButton.innerHTML =
        'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>';
      container.appendChild(editButton);

      delButton.onclick = () => deleteAppointment(element["id"]);
      editButton.onclick = () => loadEditMode(element);

      appointmentsList.appendChild(container);
    });
  }

  refillForm(appointment) {
    console.log(appointment);
    const keys = Object.keys(appointment).filter((elm) => elm != "id");
    keys.forEach((key) => {
      const input = document.getElementById(`${key}`);
      input.value = appointment[key];
    });
  }
}

// Instances
const interface = new Interface();
const appointments = new Appointments();

// Functions
function newAppointment(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  const numericValuesIds = ["telefono"];

  const appointment = formDataToObj(formData);

  if (!validation(appointment, numericValuesIds)) return;

  if (editMode) {
    appointments.editAppointment(appointment);
    form.querySelector('button[type="submit"]').textContent = "Crear Cita";
    interface.alert(
      document.querySelector(".agregar-cita"),
      "success",
      "Cita editada correctamente"
    );
    editMode = false;
  } else {
    appointments.appendAppointment(appointment);
    interface.alert(
      document.querySelector(".agregar-cita"),
      "success",
      "Cita agregada correctamente"
    );
  }

  form.reset();
  interface.printAppointment(appointments.appointments);
}

function formDataToObj(formData) {
  let dataObj = {};

  for (const entry of formData.entries()) {
    dataObj[entry[0]] = entry[1];
  }

  if (editMode) {
    dataObj.id = editObjId;
  } else {
    dataObj.id = Date.now();
  }

  return dataObj;
}

function validation(obj, numArr) {
  let validation = true;
  let message;
  const keys = Object.keys(obj);

  numArr.forEach((numVal) => {
    const numRegEx =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!numRegEx.test(obj[numVal])) {
      message = `Valor no válido: ${numVal}`;
      validation = false;
    }
  });

  keys.forEach((key) => {
    if (!obj[key]) {
      message = "Todos los campos son obligatorios";
      validation = false;
      return;
    }
  });

  if (message) {
    interface.alert(document.querySelector(".agregar-cita"), "error", message);
  }

  return validation;
}

function deleteAppointment(id) {
  appointments.removeAppointment(id);
  interface.printAppointment(appointments.appointments);
  interface.alert(
    document.querySelector(".agregar-cita"),
    "success",
    "Cita eliminada correctamente"
  );
}

function loadEditMode(appointment) {
  interface.refillForm(appointment);
  form.querySelector('button[type="submit"]').textContent = "Guardar Cambios";
  editMode = true;
  editObjId = appointment.id;
}
