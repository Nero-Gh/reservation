import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import {useLocation} from "react-router-dom"
import { useEffect } from "react";

const EditRoom = () => {
  const [info, setInfo] = useState({});
 
  const [rooms, setRooms] = useState([]);
  const [hotelsId,setHotelsId]=useState("")
  const location = useLocation();
  const hotelId = location.pathname.split("/")[3];

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    axios.get(`/rooms/${hotelId}`).then((response) => {
      setInfo(response.data);
    });
  }, []);

  if (!info) {
    return <div>Loading...</div>;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    // const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.put(`/rooms/${hotelId}`, { ...info });
      alert("Room updated Successfully")
    } catch (err) {
      console.log(err);
      alert("Room Failed To Update")
    }
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {/* {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))} */}
               <div className="formInput">
                  <label>Title</label>
                  <input
                    id="title"
                    onChange={handleChange}
                    type="text"
                    value={info.title}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>

            <div className="formInput">
                  <label>Description </label>
                  <input
                    id="desc"
                    onChange={handleChange}
                    type="text"
                    value={info.desc}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
              </div>

              <div className="formInput">
                  <label>Price</label>
                  <input
                    id="price"
                    onChange={handleChange}
                    type="text"
                    value={info.price}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
                </div>
              <div className="formInput">
                  <label>Max People</label>
                  <input
                    id="maxPeople"
                    onChange={handleChange}
                    type="text"
                    value={info.maxPeople}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
                </div>
              {/* <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div> */}
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelsId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
