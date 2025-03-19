// Dans votre composant Days.jsx

import React from 'react';
import './Days.css';

function Days({ forecastData, onDaySelect, selectedDayIndex }) {
  // Fonction pour déterminer la classe de condition météo
  const getWeatherCondition = (day) => {
    if (!day || !day.day || !day.day.condition) return '';
    
    const condition = day.day.condition.text.toLowerCase();
    if (condition.includes('rain') || condition.includes('pluie')) return 'rainy';
    if (condition.includes('sun') || condition.includes('soleil') || condition.includes('clear')) return 'sunny';
    return 'cloudy';
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="card-action">
      {forecastData.forecast.forecastday.map((day, index) => (
        <a 
          href="#" 
          key={day.date} 
          onClick={(e) => {
            e.preventDefault();
            onDaySelect(index);
          }}
          className={`${selectedDayIndex === index ? 'active' : ''} ${getWeatherCondition(day)}`}
          style={{"--i": index}}
        >
          {index === 0 ? "Aujourd'hui" : formatDate(day.date)}
          <span className="day-indicator"></span>
        </a>
      ))}
    </div>
  );
}

export default Days;