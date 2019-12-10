const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const location = search.value
  message1.textContent = 'Loading...'
  message2.textContent = ''

  // change this so it can be deployed and not just in localserver
  fetch(`/weather?address=${location}`).then((resp) => {
    resp.json().then((data) => {
      if (data.error) {
        throw new Error('Something went wrong, try typing again')
      } else {
        // const locNode = document.createTextNode(data.location)
        // message1.appendChild(locNode)
        message1.textContent = data.location
        message2.textContent = data.forecast
      }
    }).catch((err) => {
      message1.textContent = err
    })
  })
})

