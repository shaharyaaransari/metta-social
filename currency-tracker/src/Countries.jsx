import React, { useEffect, useState } from "react";
import CountriesCard from "./Component/CountriesCard";

export const Countries = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((res) => {
     //   console.log(res);
     setData(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="countries">
     {
         data.length >0 && data.map((item)=>{
   return <CountriesCard key={item.name} {...item}/>
         })
     }
      
    </div>
  );
};
