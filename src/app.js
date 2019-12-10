const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for express cnfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Yung index sa res.render automatic nya ttingnan yung views folder pra s filename, unless icustomize yung viewspath
// setup handlebars engine and views loc
// hbs is use pra sa more dynamic na html
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// e2 ung nid pra gmwa ng header na ggmitin s lht ng site
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Mikel'
  })
})

// yung res.render e ang irrender nya yung nsa views/about.hbs
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Mikel'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mikel'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address"
    })
  } else {
    // mgeeror pg wlang default value yung long lat loc
    geocode(req.query.address, (error, { longitude, latitude, location }={}) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error
          })
        } else {
          res.send({
            location: location,
            forecast: forecastData,
            address: req.query.address
          })
        }
      })
    })
  }

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide a search term"
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    error: 'Help article not found',
    name: 'Mikel'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    error: '404 page',
    name: 'Mikel'
  })
})


app.listen(port, () => {
  console.log('Server is up on port 3000')
})

// When using HBS to make header or footer, declare partial path, then hbs.register tpos sa mga files na ggmtn ung header footer, illgy lng {{>}}