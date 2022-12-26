console.log('This is a client side JS file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loc = document.querySelector('#location')
const fore = document.querySelector('#forecast')
const temp = document.querySelector('#temperature')
const fl = document.querySelector('#feelslike')

//loc.textContent = 'from'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const address = search.value
    loc.textContent = 'loading...'
    fore.textContent = ''
    temp.textContent = ''
    fl.textContent = ''

    fetch('http://localhost:3000/weather?address=' + address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            loc.textContent = data.error
        }else{
            loc.textContent = data.location,
            fore.textContent = data.forecast,
            temp.textContent = data.temperature,
            fl.textContent = data.feelslike
        }
    })
})

    console.log(address)
})