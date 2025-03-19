import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import WeatherCard from './components/WeatherCard/WeatherCard'

function App() {
  return (
    <main>
      <div className='App'>
        <Header />
      <div className='row'>
        <div className='col s12 m6 push-m3'>
          <WeatherCard />
        </div>
      </div>
      </div>
      
        
    </main>
  )
}

export default App
