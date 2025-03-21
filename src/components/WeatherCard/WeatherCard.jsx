import { useEffect, useState } from 'react'
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
  const [transitionLoading, setTransitionLoading] = useState(false);

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
    if (dayIndex === selectedDayIndex) return; // Ne rien faire si c'est déjà le jour sélectionné
    
    // Montrer un indicateur de chargement pendant la transition
    setTransitionLoading(true);
    
    // Simuler un délai pour la transition
    setTimeout(() => {
      setSelectedDayIndex(dayIndex);
      setTransitionLoading(false);
    }, 3000); // Délai un peu plus long pour apprécier l'animation
  };

  const handleCityChange = (newCity) => {
    if (newCity.toLowerCase() === city.toLowerCase()) return; // Éviter les recherches redondantes
    
    // Le chargement principal est déjà géré dans useEffect
    setCity(newCity);
  };

  // Définir les labels des jours pour l'animation de transition
  let fromDayLabel = "actuel";
  let toDayLabel = "suivant";
  
  if (weather && weather.forecast && weather.forecast.forecastday) {
    fromDayLabel = selectedDayIndex > 0 ? 
      new Date(weather.forecast.forecastday[selectedDayIndex - 1].date).toLocaleDateString('fr-FR', {weekday: 'long'}) : 
      'actuel';
      
    toDayLabel = selectedDayIndex < weather.forecast.forecastday.length - 1 ? 
      new Date(weather.forecast.forecastday[selectedDayIndex + 1].date).toLocaleDateString('fr-FR', {weekday: 'long'}) : 
      'suivant';
  }

  return (
    <div className="weather card blue-grey darken-1">
      <div className="card-content white-text search-area">
        <CitySearch onCityChange={handleCityChange} />
      </div>

      {loading ? (
        <div className="card-content white-text">
          <div className="cosmic-loader">
            {/* Étoiles générées dynamiquement */}
            <div className="cosmic-stars">
              {[...Array(40)].map((_, i) => (
                <span 
                  key={i}
                  style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    '--opacity': Math.random() * 0.7 + 0.3,
                    '--duration': `${Math.random() * 3 + 2}s`,
                    '--delay': `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Noyau central pulsant */}
            <div className="cosmic-core"></div>
            
            <div className="cosmic-text">Analyse météorologique</div>
          </div>
        </div>
      ) : error ? (
        <div className="card-content white-text error">Erreur: {error.message}</div>
      ) : !weather ? (
        <div className="card-content white-text">Aucune donnée disponible</div>
      ) : (
        <>
          <div className="card-content white-text weather-content">
            <div className="row">
              <div className="col s12 m6 weather-info">
                {transitionLoading ? (
                  <div className="temporal-shift-loader">
                    {/* Holographic content with from/to days */}
                    <div className="holographic-content">
                      <div className="day-from">Jour {selectedDayIndex === 0 ? 'actuel' : fromDayLabel}</div>
                      <div className="day-to">Jour {toDayLabel}</div>
                    </div>
                    
                    {/* Distortion effect */}
                    <div className="time-distortion"></div>
                    
                    {/* Central energy orb */}
                    <div className="energy-orb"></div>
                    
                    {/* Weather icon transition effect */}
                    <div className="weather-icon-transition"></div>
                    
                    {/* Particles shooting from orb */}
                    <div className="energy-particles">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="particle"></div>
                      ))}
                    </div>
                    
                    {/* Wave rings radiating outward */}
                    <div className="wave-rings">
                      <div className="wave-ring"></div>
                      <div className="wave-ring"></div>
                      <div className="wave-ring"></div>
                      <div className="wave-ring"></div>
                    </div>
                    
                    {/* Scanner lines */}
                    <div className="data-scanner">
                      <div className="scan-line"></div>
                      <div className="scan-line"></div>
                      <div className="scan-line"></div>
                    </div>
                    
                    {/* Futuristic HUD elements */}
                    <div className="hud-element top-left">SCAN: MÉTÉO_V2.14</div>
                    <div className="hud-element top-right">LAT: {weather.location.lat} | LON: {weather.location.lon}</div>
                    <div className="hud-element bottom-left">TEMP: ANALYSE</div>
                    <div className="hud-element bottom-right">JOUR: {selectedDayIndex + 1}/5</div>
                    
                    {/* Digital counter */}
                    <div className="digital-counter">{Math.floor(Math.random() * 100)}%</div>
                    
                    {/* Loading text */}
                    <div className="futuristic-text">Transition temporelle</div>
                  </div>
                ) : (
                  <Weather 
                    name={weather.location.name} 
                    weather={weather} 
                    selectedDay={weather.forecast.forecastday[selectedDayIndex]}
                    isToday={selectedDayIndex === 0} 
                  />
                )}
              </div>
              <div className="col s12 m6 chart-info">
                {transitionLoading ? (
                  <div className="temporal-shift-loader">
                    {/* Éléments similaires mais simplifiés pour le graphique */}
                    <div className="time-distortion"></div>
                    <div className="energy-orb"></div>
                    <div className="wave-rings">
                      <div className="wave-ring"></div>
                      <div className="wave-ring"></div>
                    </div>
                    <div className="digital-counter">{Math.floor(Math.random() * 100)}%</div>
                    <div className="futuristic-text">Préparation du graphique</div>
                  </div>
                ) : (
                  <TemperatureChart 
                    selectedDay={weather.forecast.forecastday[selectedDayIndex]} 
                    isToday={selectedDayIndex === 0}
                  />
                )}
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