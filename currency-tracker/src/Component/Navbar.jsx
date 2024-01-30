import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export const Navbar = () => {
  return (
    <div className='nav'>
    <input type='text' placeholder='Enter the Currency' width={"200px"} />
 <FontAwesomeIcon icon={faMagnifyingGlass}  onClick={()=>{console.log("shah")}} className='search-icon'/>
  

    </div>
  )
}
