import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {useLocation} from "react-router-dom"

const EditUser = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    axios.get(`/users/${userId}`).then((response) => {
      setInfo(response.data);
    });
  }, []);

  if (!info) {
    return <div>Loading...</div>;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
     

      await axios.put(`/users/${userId}`, {...info});
      alert("User added Successfully")
    } catch (err) {
      console.log(err);
      alert("User Failed to update")
    }
  };

 
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1></h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
            <div className="formInput">
                  <label>Username</label>
                  <input
                    id="username"
                    onChange={handleChange}
                    type="text"
                    value={info.username}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Email</label>
                  <input
                    id="email"
                    onChange={handleChange}
                    type="email"
                    value={info.email}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Phone</label>
                  <input
                    id="phone"
                    onChange={handleChange}
                    type="text"
                    value={info.phone}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Country</label>
                  <input
                    id="country"
                    onChange={handleChange}
                    type="text"
                    value={info.country}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>City</label>
                  <input
                    id="city"
                    onChange={handleChange}
                    type="text"
                    value={info.city}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))} */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
