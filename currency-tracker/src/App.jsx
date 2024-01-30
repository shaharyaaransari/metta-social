import { useState } from 'react'
import './App.css'
import { Navbar } from './Component/Navbar'
import { Countries } from './Countries'
function App() {
  
  return (
    <div>
      <Navbar/>
        <Countries/>
    </div>
  )
}

export default App
