const request = require('request')

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/040462379d121246cab6f06983f80201/${lat},${long}?units=si`

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback('Unable to connect to weather service')
    } else if (response.body.error) {
      callback('Unable to find location')
    } else {
      const weather = `${response.body.daily.data[0].summary} It is currently  ${response.body.currently.temperature} degrees out. There is ${response.body.currently.precipProbability}% of raining.`
      callback(undefined, weather)
    }
  })
}


module.exports = forecast