import React, { useEffect } from 'react';
import './Header.css';

function Header() {
  // Générer des particules flottantes dynamiquement
  useEffect(() => {
    const header = document.querySelector('.App-header');
    const particles = document.querySelector('.header-particles');
    
    // Créer des particules
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Position et taille aléatoires
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Animation personnalisée
      particle.style.opacity = Math.random() * 0.5;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particles.appendChild(particle);
    }
    
    return () => {
      // Nettoyer les particules lors du démontage
      while (particles.firstChild) {
        particles.removeChild(particles.firstChild);
      }
    };
  }, []);

  return (
    <header className="App-header">
      {/* Container pour les particules */}
      <div className="header-particles"></div>
      
      {/* Contenu du header */}
      <div className="header-content">
        {/* Nouvelle icône météo animée */}
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png" 
          className="App-logo" 
          alt="Weather icon" 
        />
        
        {/* Titre et sous-titre */}
        <div className="header-title-container">
          <h1 className="header-title">Météo React</h1>
          <div className="header-subtitle">Prévisions en temps réel</div>
        </div>
      </div>
    </header>
  );
}

export default Header;