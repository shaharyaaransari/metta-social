import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ search, setSearch, setData }) => {
  const [originalData, setOriginalData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      if (jsonData) {
        setOriginalData(jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      if (jsonData) {
        const regex = new RegExp(searchQuery, "i");
        const updatedData = jsonData.filter((item) => {
          if (item.currencies && typeof item.currencies === "object") {
            const currencies = Object.keys(item.currencies);
            return currencies.some((currency) => regex.test(currency));
          }
          return false;
        });
        setData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(search);
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [search, setData]);

  return (
    <div className="nav">
      <input
        type="text"
        placeholder="Enter the Currency"
        width={"200px"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faSearch}
        onClick={() => handleSearch(search)}
        className="search-icon"
      />
    </div>
  );
};

export default Navbar;