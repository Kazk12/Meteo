import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import WeatherCard from './components/WeatherCard/WeatherCard'

function App() {
  // Effet pour créer les étoiles filantes et brillantes - OPTIMISÉ
  useEffect(() => {
    // 1. Création d'étoiles brillantes statiques (moins gourmand en ressources)
    const brightStarsContainer = document.querySelector('.bright-stars');
    if (brightStarsContainer) {
      // Limité à un petit nombre pour éviter les lags
      const numStars = 12;
      
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('bright-star');
        
        // Positionnement aléatoire
        star.style.left = `${Math.random() * 98}%`;
        star.style.top = `${Math.random() * 98}%`;
        
        // Animation légèrement décalée
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        brightStarsContainer.appendChild(star);
      }
    }
    
    // 2. Création d'étoiles filantes occasionnelles
    const shootingStarsContainer = document.getElementById('shooting-stars');
    if (!shootingStarsContainer) return;
    
    const createShootingStar = () => {
      // Vérifier qu'il n'y a pas trop d'étoiles filantes en même temps
      const currentStars = shootingStarsContainer.querySelectorAll('.shooting-star');
      if (currentStars.length > 3) return; // Limiter à 3 étoiles filantes max
      
      const star = document.createElement('div');
      star.classList.add('shooting-star');
      
      // Styles optimisés
      star.style.position = 'absolute';
      star.style.width = '150px';
      star.style.height = '2px';
      star.style.top = `${Math.random() * 60}%`;
      star.style.right = '-50px';
      star.style.background = 'linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent)';
      star.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
      star.style.borderRadius = '50%';
      star.style.transform = `rotate(${Math.random() * 10 + 10}deg)`;
      star.style.animation = 'shootingStar 4s linear forwards';
      
      shootingStarsContainer.appendChild(star);
      
      // Supprimer l'étoile après l'animation
      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, 4000);
    };
    
    // Créer une étoile filante toutes les 2-6 secondes (plus espacées)
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        createShootingStar();
      }
    }, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <main>
      <div className='App'>
        {/* Effets optimisés pour les performances */}
        <div className="cosmic-ray"></div>
        <div className="star-field"></div>
        <div className="nebula-effect"></div>
        <div className="bright-stars"></div>
        <div className="shooting-stars" id="shooting-stars"></div>
        
        {/* Contenu de l'application */}
        <Header />
        <div className='row'>
          <div className='col s12 m10 offset-m1'>
            <WeatherCard />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App