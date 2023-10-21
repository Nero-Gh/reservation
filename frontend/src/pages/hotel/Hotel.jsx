import "./hotel.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import ImageGallery from "react-image-gallery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Charge from "../payment/Charge";
import GoogleMap from "../../components/map/GoogleMap";

const Hotel = () => {
  const labels = {
    1: "Useless+",
    2: "Poor+",
    3: "Good",
    4: "Impressive",
    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openModal, setOpenModal] = useState(false);


  const { images, data, loading } = useFetch(
    // `https://thankful-bass-waders.cyclic.app/api/hotels/find/${id}`
    `/hotels/find/${id}`
  );

  const value = data.rating;
  const [hover, setHover] = useState(-1);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

 
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const amountCal = days * data.cheapestPrice * options.room + "00"

  localStorage.setItem('price',amountCal )


  const notify = () => {
    toast.warning("Not authenticated, Redirecting to login page");
  };

  const delay = () => {
    navigate("/login");
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      notify();
      setTimeout(delay, 1500);
    }
  };


  const maplink = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=+"+(data.name)+"&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"

  console.log(maplink);

  const myname= data.name


  return (
    <div>
      <ToastContainer autoClose={3000} />

      <Header type="list" />

      <div className="hotelContainer container">
        {loading || data.length === 0 ? (
          <div className="d-flex justify-content-center">
            <div class="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="hotelWrapper">
            <div className="d-md-flex d-block justify-content-md-between">
              <div>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <div className="hotelDistance">
                  Excellent location – {data.distance}m from center
                </div>
                <div className="hotelPriceHighlight">
                  {/* Book a stay over Ghc{data.cheapestPrice} at this property. */}
                  Book a stay over Ghc{data.cheapestPrice}at this property.
                </div>
              </div>

              <div>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    readOnly
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
              </div>
            </div>

            <div className="row mt-5 gy-5">
              <div className="col-lg-8">
                <ImageGallery items={images} />
                <div className="myMap">
 
                <GoogleMap name={data.name}/>
              
                </div>
              </div>

              <div className="col-lg-4">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>

                <div className="hotelDetails mt-5">
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}- {data.type == "tourist"?"days":"night stay!"}</h1>
                    <span>
                      Located in the real heart of {data.city}, this property
                      has an excellent location score of {data.rating}
                    </span>
                    <h2>
                      <b>Ghc{days * data.cheapestPrice * options.room}</b> (
                      {days} {data.type == "tourist" ? "":"nights"})
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </div>
                </div>

                <p className="hotelInfo">
                  Rooms reservation are 2 {data.type == "tourist" ? "days":"night"} by default, you can change it
                  when you explore or search
                </p>
             
              </div>
            </div>
          </div>
        )}
      </div>

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}

      <Footer />
    </div>
  );
};

export default Hotel;
