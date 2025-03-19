import React, { useEffect, useState } from 'react'
import './WeatherCard.css'
import Weather from '../Weather/Weather'
import Days from '../Days/Days'
import CitySearch from '../CitySearch/CitySearch'
import TemperatureChart from '../TemperatureChart/TemperatureChart'
import { getWeatherForecast } from '../../services/weatherService';

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [city, setCity] = useState('Saint-Etienne');

  useEffect(() => {
    // Réinitialiser les états lors du changement de ville
    setLoading(true);
    setError(null);
    setSelectedDayIndex(0);
    
    // Récupérer les prévisions pour la nouvelle ville
    getWeatherForecast(city, 5)
      .then(response => {
        setWeather(response);        
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [city]); // Déclencher l'effet lorsque la ville change

  const handleDaySelect = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="weather card blue-grey darken-1">
      <div className="card-content white-text search-area">
        <CitySearch onCityChange={handleCityChange} />
      </div>

      {loading ? (
        <div className="card-content white-text loading">Chargement...</div>
      ) : error ? (
        <div className="card-content white-text error">Erreur: {error.message}</div>
      ) : !weather ? (
        <div className="card-content white-text">Aucune donnée disponible</div>
      ) : (
        <>
          <div className="card-content white-text weather-content">
            <div className="row">
              <div className="col s12 m6 weather-info">
                <Weather 
                  name={weather.location.name} 
                  weather={weather} 
                  selectedDay={weather.forecast.forecastday[selectedDayIndex]}
                  isToday={selectedDayIndex === 0} 
                />
              </div>
              <div className="col s12 m6 chart-info">
                <TemperatureChart 
                  selectedDay={weather.forecast.forecastday[selectedDayIndex]} 
                  isToday={selectedDayIndex === 0}
                />
              </div>
            </div>
          </div>
          <Days 
            forecastData={weather} 
            onDaySelect={handleDaySelect}
            selectedDayIndex={selectedDayIndex}
          />
        </>
      )}
    </div>
  );
}

export default WeatherCard;