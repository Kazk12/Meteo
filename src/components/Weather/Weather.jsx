import React from 'react'
import './Weather.css'

function Weather({ name, weather, selectedDay, isToday }) {
  // Formater la date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Déterminer les données à afficher (jour actuel ou prévision)
  const currentData = isToday 
    ? weather.current 
    : selectedDay.day;
  
  // Déterminer l'icône et le texte de condition
  const conditionIcon = isToday 
    ? weather.current.condition.icon 
    : selectedDay.day.condition.icon;
  
  const conditionText = isToday 
    ? weather.current.condition.text 
    : selectedDay.day.condition.text;

  // Déterminer la température
  const temperature = isToday 
    ? weather.current.temp_c 
    : selectedDay.day.avgtemp_c;
  
  // Déterminer les informations sur le vent
  const windInfo = isToday 
    ? `Vent ${weather.current.wind_kph} km/h (${weather.current.wind_degree}°)` 
    : `Vent max ${selectedDay.day.maxwind_kph} km/h`;

  return (
    <div className="card-content white-text">
      <span className="card-title">
        {name} - {isToday ? "Aujourd'hui" : formatDate(selectedDay.date)}
      </span>
      <p><img src={conditionIcon} alt={conditionText} /></p>
      <span className="temperature">{temperature}°</span>
      <div className="weather-details">
        <div className="condition">{conditionText}</div>
        <div className="wind">{windInfo}</div>
        {!isToday && (
          <div className="minmax-temp">
            Min: {selectedDay.day.mintemp_c}° / Max: {selectedDay.day.maxtemp_c}°
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather