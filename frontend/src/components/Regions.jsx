import React from 'react'
import { useNavigate } from 'react-router-dom';

import "../components/featured/featured.scss";

const Regions = (prop) => {
    const navigate = useNavigate()
  return (
    <div className="col-md-6 col-lg-3 col-6">
    <div
      className="featuredItem"
      onClick={() => {
        navigate("/hotels", {
          state: { destination: prop.destination },
          // state: { destination: "paris" },
        });
      }}
    >
      <img
        src={prop.img}
        alt=""
        className="featuredImg img-fluid"
      />
      <div className="featuredTitles">
        <h1>{prop.region}</h1>
        {/* <h2>{prop.data} properties</h2> */}
      </div>
    </div>
  </div>
  )
}

export default Regions