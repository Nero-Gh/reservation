import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import {useParams,useLocation,useNavigate} from "react-router-dom"

const Single = () => {
  // const {hotelId} = useParams()
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const [data, setData] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/hotels/find/${hotelId}`);
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [hotelId]);
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
    <div className="goBack">
    <button onClick={()=>{
          {navigate(-1)}
      }}>
        Go Back
      </button>
    </div>
        <div className="top">
          {data ?  <div className="left">
            {/* <div className="editButton">Edit</div> */}
         <h1 className="title"> Hotel Information</h1>
            
            <div className="item">
              <img
                src={data.photos[0]}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"></h1>
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{data.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Region & City</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.region} - {data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>Ghc {data.cheapestPrice}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.desc}</span>
                </div>
              </div>
            </div>
          </div> : <div>Loading...</div>}
         
        </div>
      </div>
    </div>
  );
};

export default Single;
