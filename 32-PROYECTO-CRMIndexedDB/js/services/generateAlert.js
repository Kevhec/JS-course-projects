export default function generateAlert (ref, type, message) {
  while (document.querySelector('.alert')) {
    document.querySelector('.alert').remove()
  }

  const container = document.createElement('div')
  container.classList.add('alert', 'px-4', 'px-3', 'rounded', 'max-w-lg', 'mx-auto', 'mb-6', 'text-center')

  const paragraph = document.createElement('p')
  paragraph.textContent = message
  
  if (type === 'error') {
    container.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
    paragraph.id = 'message-error'
  } else {
    container.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
    paragraph.id = 'message-success'
  }

  container.appendChild(paragraph)

  ref.insertBefore(container, ref.children[0])

  setTimeout(() => {
    container.remove()
  }, 4000);
}