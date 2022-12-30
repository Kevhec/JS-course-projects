document.addEventListener('DOMContentLoaded', function( ){

  // Select interface elements
  const inputEmail = document.getElementById('email');
  const inputSubject = document.getElementById('asunto');
  const inputMessage = document.getElementById('mensaje');
  const formButtons = document.querySelector('.botones')
  const form = document.getElementById('formulario');
  console.log(form)

  // Event listeners
  inputEmail.addEventListener('blur', validate);
  inputSubject.addEventListener('blur', validate);
  inputMessage.addEventListener('blur', validate);

  function validate(evt) {

    if (evt.target.value.trim() === '') {
      errorAlert(`El campo "${evt.target.name}" es obligatorio`, evt.target.parentElement);
      return;
    }

    deleteExistingAlert(evt.target.parentElement);
  }

  function errorAlert(msg, ref) {
    // Check if alert is displayed
    const alert = ref.querySelector('.error-alert');
    if(alert) {
      alert.remove();
    }
    
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

})