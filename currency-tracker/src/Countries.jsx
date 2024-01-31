import React, { useEffect, useState } from "react";
import CountriesCard from "./Component/CountriesCard";

const Countries = ({ data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      if (jsonData) {
        setData(jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(data.length / 12)) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  // Calculating the total number of pages
  const totalPages = Math.ceil(data.length / 12);

  // Calculating the range of pagination links to display
  const startPage = Math.max(1, page - 4);
  const endPage = Math.min(totalPages, startPage + 9);

  return (
    <>
      <div className="countries">
        {data.slice((page - 1) * 12, page * 12).map((item, index) => (
          <CountriesCard key={index} {...item} />
        ))}
      </div>
      <div className="pagination">
        <span
        onClick={() => { selectPageHandler(startPage + i); scrollToTop(); }}
          className={page > 1 ? "" : "pagination__disable"}
        >
          ◀ Prev
        </span>
        {/* Render pagination links */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <span
            key={startPage + i}
            onClick={() => {selectPageHandler(startPage + i); scrollToTop();}}
            className={page === startPage + i ? "pagination_selected" : ""}
          >
            {startPage + i}
          </span>
        ))}
        <span
          onClick={() => {selectPageHandler(page + 1);
            scrollToTop();}}
          className={page < totalPages ? "" : "pagination__disable"}
        >
          Next ▶
        </span>
      </div>
    </>
  );
};

export default Countries;