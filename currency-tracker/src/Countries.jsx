import React, { useEffect, useState } from "react";
import CountriesCard from "./Component/CountriesCard";

export const Countries = ({data,setData}) => {
 
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const fetchData = () => {
    setLoading(true);
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((res) => {
        
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectPageHandler = (selectedPage) => {
      if(selectedPage>=1 && selectedPage<=data.length/10 && selectedPage!==page)
    setPage(selectedPage);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <>
      <div className="countries">
        {data.length > 0 &&
          data.slice(page * 12 - 12, page * 12).map((item, index) => {
            return <CountriesCard key={index} {...item} />;
          })}
      </div>
      {data.length > 0 && (
        <div className="pagination">
          <span onClick={() => selectPageHandler(page- 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
          {[...Array(Math.floor (data.length / 12))].map((_, i) => {
            return (
              <span key={i} onClick={() => selectPageHandler(i + 1)}
                className={page==i+1?"pagination_selected":""}
              >
                {i + 1}
              </span>
            );
          })}

          <span className={page < data.length / 10 ? "" : "pagination__disable"} onClick={() => selectPageHandler(page+ 1)}>▶</span>
        </div>
      )}
    </>
  );
};
