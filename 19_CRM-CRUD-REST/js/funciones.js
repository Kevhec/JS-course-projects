export function createAlert (ref, type, message) {
  const oldAlert = document.querySelector('.alert')

  if (oldAlert) {
    oldAlert.remove()
  }

  const alert = document.createElement('div')
  alert.classList.add('alert', 'px-4', 'px-3', 'rounded', 'max-w-lg', 'mx-auto', 'mb-6', 'text-center')

  const alertParagraph = document.createElement('p')
  alertParagraph.textContent = message
  
  if (type === 'error') {
    alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
    alertParagraph.id = 'message-error'
  } else {
    alert.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
    alertParagraph.id = 'message-success'
  }

  alert.appendChild(alertParagraph)

  ref.insertBefore(alert, ref.children[0])

  setTimeout(() => {
    alert.remove()
  }, 4000);
}