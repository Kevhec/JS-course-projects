document.addEventListener('DOMContentLoaded', function( ){

  // Select interface elements
  const inputEmail = document.getElementById('email');
  const inputEmailCC = document.getElementById('email-cc');
  const inputSubject = document.getElementById('asunto');
  const inputMessage = document.getElementById('mensaje');
  const form = document.getElementById('formulario');
  const submitButton = document.querySelector('#formulario button[type="submit"]');
  const resetButton = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.getElementById('spinner');

  // Event listeners
  inputEmail.addEventListener('input', validate);
  inputSubject.addEventListener('input', validate);
  inputMessage.addEventListener('input', validate);
  form.addEventListener('submit', sentEmail)

  resetButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    if(confirm("¿Estás seguro de querer reiniciar el formulario?")) {
      resetForm() 
    } else {
      return
    }
  })

  inputEmailCC.addEventListener('input', notRequired);

  // Main object
  const email = {
    email: '',
    asunto: '',
    mensaje: '',
  }
  
  function sentEmail(evt) {
    evt.preventDefault();

    spinner.classList.remove('hidden');
    
    setTimeout(() => {
      spinner.classList.add('hidden');
      resetForm()

      const succeedAlert = document.createElement('P');
      succeedAlert.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      succeedAlert.textContent = '¡Mensaje enviado con éxito!'
      form.appendChild(succeedAlert);

      setTimeout(() => {
        succeedAlert.remove();
      }, 2500);

    }, 3000)
  }

  function resetForm() {
    for(const element in email) {
      email[element] = '';
    }
    form.reset()
    validateMainObject()

    // delete existing alerts
    while (document.querySelector('.error-alert')) {
      alert = document.querySelector('.error-alert');
      alert.remove();
    }
  }

  function notRequired(evt) {
    
    if(evt.target.value === '') {
      deleteExistingAlert(evt.target.parentElement);
      delete email[evt.target.id];
      validateMainObject()
      return
    }

    if(evt.target.type  === 'email' && !validateEmail(evt.target.value)) {
      errorAlert('Email inválido', evt.target.parentElement);
      email[evt.target.name] = '';
      validateMainObject()
      return
    }
    deleteExistingAlert(evt.target.parentElement)
    email[evt.target.id] = evt.target.value;
    validateMainObject()
  }

  function validate(evt) {
    const evtTrim = evt.target.value.trim()
      
    if (evtTrim === '') {
      errorAlert(`El campo "${evt.target.name}" es obligatorio`, evt.target.parentElement);
      email[evt.target.name] = '';
      validateMainObject()
      return;
    }
    
    if(evt.target.id === 'email' && !validateEmail(evt.target.value)) {
      errorAlert('Email inválido', evt.target.parentElement);
      email[evt.target.name] = '';
      validateMainObject()
      return
    }
    
    deleteExistingAlert(evt.target.parentElement);
    
    // Fill main object
    email[evt.target.id] = evtTrim;
    validateMainObject()

    
  }

  function errorAlert(msg, ref) {
    // Check if alert is displayed
    deleteExistingAlert(ref);
    
    // Generate Alert HTML
    const error = document.createElement('P');
    error.textContent = msg;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'error-alert')
    ref.appendChild(error)
  }

  function deleteExistingAlert(ref) {
    const alert = ref.querySelector('.error-alert');
    if(alert) {
      alert.remove();
    }
  }

  function validateEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    const result = regex.test(email)
    return result;
  }

  function validateMainObject() {
    if (Object.values(email).includes('')){
      submitButton.classList.add('opacity-50');
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove('opacity-50');
      submitButton.disabled = false;
    }
  }
})