import React from 'react'
import './Days.css'

function Days({ forecastData, onDaySelect, selectedDayIndex }) {
  // Si aucune donnée n'est disponible, afficher un message
  if (!forecastData || !forecastData.forecast || !forecastData.forecast.forecastday) {
    return <div className="card-action">Chargement des prévisions...</div>;
  }

  // Fonction pour formater la date en jour de la semaine
  const formatDate = (dateString) => {
    const options = { weekday: 'long' };
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
          className={selectedDayIndex === index ? 'active' : ''}
        >
          {index === 0 ? "Aujourd'hui" : formatDate(day.date)}
        </a>
      ))}
    </div>
  );
}

export default Days