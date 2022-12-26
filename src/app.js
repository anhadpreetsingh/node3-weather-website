const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app index',
        name: 'Anhad Preet Singh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'Weather app about',
        name: 'Anhad Preet Singh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page for you',
        name: 'Anhad Preet Singh'
    })
})

app.get('/weather', (req, res) =>{
    
    if(!req.query.address){
        return res.send('You must provide an address')
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, {temperature, feelslike, description}={})=>{
            if(error){
                return res.send(error)
            }

            res.send({
                location,
                forecast: description,
                temperature,
                feelslike
            })
        })
    })
    
    
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Anhad Preet Singh',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Anhad Preet Singh',
        message: 'Page not found'
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})