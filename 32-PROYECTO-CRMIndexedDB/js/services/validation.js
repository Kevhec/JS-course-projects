import toStringAndCapitalize from "./toStringAndCapitalize.js"
import generateAlert from "./generateAlert.js"

export default function validateClient (form, formData) {
  let areFieldsFilled = true
  let isEmailCorrect = true
  let emptyFields = []
  formData.forEach((value, key) => {
    const formattedValue = value.trim().toLowerCase()

    // Validate empty fields
    if (!formattedValue) {
      areFieldsFilled = false
      emptyFields.push(key)
    }
    
    // Validate email sintax
    if (key === 'email') {
      const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
      const result = regex.test(formattedValue)
      if(!result) isEmailCorrect = false
    }
  })
  
  if (!areFieldsFilled || !isEmailCorrect) {
    let message

    switch (false) {
      case areFieldsFilled: 
        if (emptyFields.length === 1) {
          message = `El campo ${toStringAndCapitalize(emptyFields)} es requerido`
        } else {
          message = `Los campos ${toStringAndCapitalize(emptyFields)} son requeridos`
        }
        break
      case isEmailCorrect:
        message = 'Email inválido'
    }

    generateAlert(form, 'error', message)

    const submitBtn = document.getElementById('submit-btn')
    submitBtn.setAttribute('aria-invalid', true)
    submitBtn.setAttribute('aria-errormessage', 'message-error')
    
    setTimeout(() => {
      submitBtn.setAttribute('aria-invalid', false)
      submitBtn.removeAttribute('aria-errormessage')
    }, 4000);

    return false
  }
  return true
}