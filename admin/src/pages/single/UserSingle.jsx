import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import {useParams,useLocation,useNavigate} from "react-router-dom"

const UserSingle = () => {
  // const {hotelId} = useParams()
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [data, setData] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);
  
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
         <h1 className="title"> User Information</h1>
            
            <div className="item">
              <img
                src={data.img ? data.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"></h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">
                    {data.country}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Number:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.phone}</span>
                </div>
              </div>
            </div>
          </div> : <div>Loading...</div>}
         
        </div>
      </div>
    </div>
  );
};

export default UserSingle;
