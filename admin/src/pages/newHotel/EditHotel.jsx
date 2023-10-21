import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";
import {useParams,useLocation,useNavigate} from "react-router-dom"

const EditHotel = () => {



  const type = [
    { value: "hotel", text: "Hotel" },
    { value: "apartment", text: "Apartment" },
    { value: "resort", text: "Resort" },
    { value: "villa", text: "Villa" },
    { value: "tourist", text: "Tourist Attraction" },
  ];


  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [dataa, setDataa] = useState(null);

  const location = useLocation();
  const dataaId = location.pathname.split("/")[3];

  const [selected, setSelected] = useState(
      type[1].value
  );
  // const [selectedTwo, setSelectedTwo] = useState(
  //     dest[1].value
  // );



  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e) => {
    // setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setDataa((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const selectOptions = type.map((typeOption) => {
    return (
      <option key={typeOption.value} value={typeOption.value}>
        {typeOption.text}
      </option>
    );
  });
  // const selectOptionsTwo = dest.map((destOption) => {
  //   return (
  //     <option key={destOption.value} value={destOption.value}>
  //       {destOption.text}
  //     </option>
  //   );
  // });

  useEffect(() => {
    axios.get(`/hotels/find/${dataaId}`).then((response) => {
      setDataa(response.data);
    });
  }, [dataaId]);

  if (!dataa) {
    return <div>Loading...</div>;
  }

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  



  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newhotel = {
        ...dataa,
        rooms,
      };

      await axios.put(`/hotels/${dataaId}`, newhotel);
      alert("Record updated Successfully")
    } catch (err) {
      console.log(err)
      alert("There was an error when updating")
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 style={{textTransform:"capitalize"}}>Edit {dataa.name} Room</h1>
        </div>
        <div className="bottom">
        
          <div className="right">
            <form>
            <div className="formInput">
                  <label>Name</label>
                  <input
                    id="name"
                    onChange={handleChange}
                    type="text"
                    value={dataa.name}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Address</label>
                  <input
                    id="address"
                    onChange={handleChange}
                    type="text"
                    value={dataa.address}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>

            <div className="formInput">
                  <label>Region</label>
                  <input
                    id="city"
                    onChange={handleChange}
                    type="text"
                    value={dataa.city}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Price</label>
                  <input
                    id="cheapestPrice"
                    onChange={handleChange}
                    type="text"
                    value={dataa.cheapestPrice}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Distance from the center</label>
                  <input
                    id="distance"
                    onChange={handleChange}
                    type="text"
                    value={dataa.distance}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Description</label>
                  <input
                    id="desc"
                    onChange={handleChange}
                    type="text"
                    value={dataa.desc}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>
            <div className="formInput">
                  <label>Type</label>
                  <input
                    id="type"
                    onChange={handleChange}
                    type="text"
                    value={dataa.type}
                    // placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
            </div>

              {/* {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    // value={dataa}
                    placeholder={input.placeholder}
                    style={{textTransform:"lowercase"}}
                  />
                </div>
              ))} */}

                  <div className="formInput">
                          <label>City</label>
                          <input
                            id="region"
                            onChange={handleChange}
                            type="text"
                            value={dataa.region}
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

export default EditHotel;
