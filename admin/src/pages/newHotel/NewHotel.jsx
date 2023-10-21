import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";

const NewHotel = () => {

  const dest = [
    { value: "accra", text: "Greater Accra" },
    { value: "eastern", text: "Eastern" },
    { value: "ashanti", text: "Ashanti" },
    { value: "western", text: "Western" },
    { value: "central", text: "Central" },
    { value: "savannah", text: "Savannah" },
    { value: "northern", text: "Northern" },
    { value: "volta", text: "Volta" },
    { value: "bono", text: "Bono" },
    { value: "bono-east", text: "Bono-East" },
    { value: "ahafo", text: "Ahafo" },
    { value: "north-east", text: "North East" },
    { value: "upper-east", text: "Upper East" },
    { value: "upper-west", text: "Upper West" },
    { value: "oti", text: "Oti" },
    { value: "western-north", text: "Western North" },
  ];

  const type = [
    { value: "hotel", text: "Hotel" },
    { value: "apartment", text: "Apartment" },
    { value: "resort", text: "Resort" },
    { value: "villa", text: "Villa" },
    { value: "tourist", text: "Tourist Attraction" },
  ];

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(
      type[1].value
  );
  const [selectedTwo, setSelectedTwo] = useState(
      dest[0].value
  );

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleChangeTwo = (event) => {
    setSelected(event.target.value);
  };
  const handleChangeThree = (event) => {
    setSelectedTwo(event.target.value);
  };

  const selectOptions = type.map((typeOption) => {
    return (
      <option key={typeOption.value} value={typeOption.value}>
        {typeOption.text}
      </option>
    );
  });


  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  
  // console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dvazkzd3i/image/upload",
            data
          );

          const { url } = uploadRes.data;
        
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
      alert("Record inserted Successfully")
    } catch (err) {
      console.log(err)
      alert("failed")
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
                </div>
              ))}

                  <div className="formInput">
                          <label>Type</label>
                          <input
                            id="type"
                            onChange={handleChange}
                            type="text"
                            style={{textTransform:"lowercase"}}
                            placeholder="hotel,apartment,villa,resort,tourist attraction"
                          />
                    </div>
                  <div className="formInput">
                          <label>City</label>
                          <input
                            id="region"
                            onChange={handleChange}
                            type="text"
                            style={{textTransform:"lowercase"}}
                            placeholder="accra"
                          />
                    </div>
                
                    <div className="formInput">
                        <label>Rating</label>
                        <select id="rating" onChange={handleChange}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                    </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
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

export default NewHotel;
