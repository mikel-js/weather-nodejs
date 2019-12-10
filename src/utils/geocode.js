const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWVrZWwxNyIsImEiOiJjazNycGlsZ2YwY2E4M21wZTV5OHg1amViIn0.kut3aybasux0zRBygTwPfQ&limit=1`

  request({ url, json: true }, (err, resp) => {
    if (err) {
      callback('Unable to connect to location services', undefined)
    } else if (resp.body.features.length === 0) {
      callback('Invalid search, try again', undefined)
    } else {
      callback(undefined, {
        longitude: resp.body.features[0].center[0],
        latitude: resp.body.features[0].center[1],
        location: resp.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
