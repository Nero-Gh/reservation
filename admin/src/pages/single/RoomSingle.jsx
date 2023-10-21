import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import {useParams,useLocation,useNavigate} from "react-router-dom"

const RoomSingle = () => {
  // const {hotelId} = useParams()
  const location = useLocation();
  const roomId = location.pathname.split("/")[2];
  const [data, setData] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/rooms/${roomId}`);
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [roomId]);
  
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
         <h1 className="title"> Room Information</h1>
            
            <div className="item">
              <img
                src={data.img ? data.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"></h1>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Maximum People:</span>
                  <span className="itemValue" style={{textTransform:"capitalize"}}>{data.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    {data.desc}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Room Numbers:</span>
                  {/* <span className="itemValue" style={{textTransform:"capitalize"}}>{data.roomNumbers}</span> */}
                </div>
              </div>
            </div>
          </div> : <div>Loading...</div>}
         
        </div>
      </div>
    </div>
  );
};

export default RoomSingle;
