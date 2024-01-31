import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import Countries from "./Countries";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        data={data}
        setData={setData}
      />
      <Countries
        search={search}
        setSearch={setSearch}
        data={data}
        setData={setData}
      />
    </div>
  );
}

export default App;