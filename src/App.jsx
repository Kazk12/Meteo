import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import WeatherCard from './components/WeatherCard/WeatherCard'

function App() {
  return (
    <main>
      <div className='App'>
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