import React from 'react'
import './WeatherCard.css'
import Weather from '../Weather/Weather'
import Days from '../Days/Days'

function WeatherCard() {
  return (
    <div className="weather card blue-grey darken-1">
      <Weather />
      <Days />

    </div>
  )
}

export default WeatherCard