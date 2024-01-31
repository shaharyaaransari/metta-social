import React from 'react'

export default function CountriesCard({name,capital,flags,population}) {
    
  return (
    <div className='countries-card'>
       <div>
  <img src={flags.png} alt={name.common} />
       </div>

  <div>
    <h4>{name.common}</h4>
    <h4> Capital: {capital}</h4>
    <h4>Population: {population}</h4>
  </div>

    </div>
  )
}
