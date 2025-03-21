import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './TemperatureChart.css';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function TemperatureChart({ selectedDay, isToday }) {
  const chartRef = useRef(null);
  
  // Si aucune donnée n'est disponible
  if (!selectedDay || !selectedDay.hour) {
    return (
      <div className="chart-container futuristic">
        <div className="neon-border"></div>
        <div className="loading-container">
          <div className="pulse-loader"></div>
          <p>Chargement des données...</p>
        </div>
      </div>
    );
  }

  // Filtrer les données pour avoir une température toutes les 2 heures
  const hourlyData = selectedDay.hour.filter((_, index) => index % 2 === 0);

  // Formater les heures (ex: "14h")
  const labels = hourlyData.map(hourData => {
    const date = new Date(hourData.time);
    return date.getHours() + 'h';
  });

  // Températures
  const temperatures = hourlyData.map(hourData => hourData.temp_c);
  
  // Calculer min et max pour le gradient et l'échelle
  const minTemp = Math.min(...temperatures) - 2;
  const maxTemp = Math.max(...temperatures) + 2;
  
  // Fonction pour déterminer le gradient dynamique
  const getGradient = (ctx) => {
    if (!ctx) return null;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 0, 102, 0.8)');     // Rose néon
    gradient.addColorStop(0.3, 'rgba(255, 51, 153, 0.6)');  // Rose plus clair
    gradient.addColorStop(0.6, 'rgba(51, 204, 255, 0.4)');  // Bleu ciel
    gradient.addColorStop(1, 'rgba(0, 153, 255, 0.1)');     // Bleu électrique
    
    return gradient;
  };

  // Configuration du graphique
  const data = {
    labels,
    datasets: [
      {
        label: 'Température',
        data: temperatures,
        borderColor: '#ff3399',
        borderWidth: 4,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          return getGradient(ctx);
        },
        tension: 0.4,
        pointRadius: 7,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#ff3399',
        pointBorderWidth: 2,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: '#ff3399',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        pointShadowBlur: 10,
        fill: true,
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleColor: '#ffffff',
        bodyColor: '#ff3399',
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Montserrat', sans-serif"
        },
        bodyFont: {
          size: 18,
          weight: 'bold',
          family: "'Montserrat', sans-serif"
        },
        padding: 15,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: function(tooltipItems) {
            return `${tooltipItems[0].label}`;
          },
          label: function(context) {
            return `${context.parsed.y}°C`;
          },
          labelTextColor: function() {
            return '#ff3399';
          }
        },
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(255, 51, 153, 0.5)',
        caretSize: 10,
        caretPadding: 5
      }
    },
    scales: {
      y: {
        min: minTemp,
        max: maxTemp,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          lineWidth: 1,
          drawBorder: false,
          z: 1
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
            family: "'Montserrat', sans-serif"
          },
          padding: 10,
          callback: function(value) {
            return value + '°';
          },
          maxTicksLimit: 6
        },
        afterFit: function(scaleInstance) {
          scaleInstance.width = 50;
        }
      },
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
            family: "'Montserrat', sans-serif"
          },
          padding: 5
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: {
        capBezierPoints: true
      }
    },
    animations: {
      tension: {
        duration: 1500,
        easing: 'easeOutQuart',
        from: 0.4,
        to: 0.4
      },
      radius: {
        duration: 400,
        easing: 'linear'
      }
    },
    layout: {
      padding: {
        top: 30,
        right: 20,
        bottom: 10,
        left: 10
      }
    }
  };

  // Animation customisée pour les points
  useEffect(() => {
    if (chartRef.current) {
      const points = document.querySelectorAll('.chart-container canvas .point');
      points.forEach((point, index) => {
        setTimeout(() => {
          point.classList.add('pulse');
        }, index * 100);
      });
    }
  }, [selectedDay]);

  return (
    <div className="chart-container futuristic">
      <div className="neon-border"></div>
      <div className="chart-content-wrapper">
        <div className="chart-header-futuristic">
          <div className="temp-heading">
            <div className="day-label">{isToday ? "AUJOURD'HUI" : formatDate(selectedDay.date).toUpperCase()}</div>
            <div className="temp-stat">
              <span className="current-temp">{temperatures[Math.floor(temperatures.length / 4)]}°</span>
              <span className="temp-unit">C</span>
            </div>
          </div>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value min">{selectedDay.day.mintemp_c}°</div>
              <div className="stat-label">MIN</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value max">{selectedDay.day.maxtemp_c}°</div>
              <div className="stat-label">MAX</div>
            </div>
          </div>
        </div>
        
        <div className="chart-visualization">
          <Line ref={chartRef} data={data} options={options} />
        </div>
        
        <div className="chart-footer-futuristic">
          <div className="time-markers">
            <div className="time-marker morning">MATIN</div>
            <div className="time-marker noon">MIDI</div>
            <div className="time-marker evening">SOIR</div>
            <div className="time-marker night">NUIT</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fonction utilitaire pour formater la date
function formatDate(dateString) {
  const options = { weekday: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options).charAt(0).toUpperCase() + 
         date.toLocaleDateString('fr-FR', options).slice(1);
}

export default TemperatureChart;