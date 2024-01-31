import { useState } from 'react'
import './App.css'
import { Navbar } from './Component/Navbar'
import { Countries } from './Countries'

function App() {
  const [search , setSearch] = useState('')
  const [data, setData] = useState([]);
  return (
    <div>
      <Navbar search={search} setSearch={setSearch} data={data} setData={setData}/>
        <Countries search={search} setSearch={setSearch} data={data} setData={setData}/>
    </div>
  )
}

export default App
