const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

export const getWeatherForecast = async (location, days = 5) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`
    );
    
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(`Ville "${location}" non trouvée. Vérifiez l'orthographe ou essayez une autre ville.`);
      } else {
        throw new Error('Erreur lors de la récupération des données météo');
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};