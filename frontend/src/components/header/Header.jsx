import "./header.scss";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";

import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  // const notify = () => {
  //   toast.error("Destination is empty");
  // };
  const handleSearch = () => {
    // if (destination === "") {
    //   notify();
    // } else {
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
      navigate("/hotels", { state: { destination, dates, options } });
    // }
  };

  return (
    <div className={type === "list" ? "header listMode" : "header"}>

      <div className="headerContainer container">
        <Navbar />

        <div className="headerCont">
          <div>
            {type === "list" && (
              <h2 className="headerTitle text-center">
                Fresh, quite and peaceful
              </h2>
            )}
            {type !== "list" && (
              <>
                <div className="row headerWrapper">
                  <div className="col-md-8 col-10">
                    <h1 className="headerTitle">Fresh, quite and peaceful</h1>
                    <p className="headerDesc">
                      Get rewarded for your travels – unlock instant savings of
                      10% or more with a free booking account
                    </p>
                    <div className="col-md-12 button-cont my-but">
                      <button
                        className="headerBtn" 
                        onClick={() => {
                          navigate("/hotels", {
                            state: { destination, dates, options },
                          });
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
                <div className="headerSearch">
                  <div className="headerSearchItem">
                    <i className="bx bx-location-plus headerIcon"></i>
                    <input
                      type="text"
                      placeholder="Location"
                      className="headerSearchInput"
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div className="headerSearchItem">
                    <i class="bx bxs-calendar-plus headerIcon"></i>
                    <span
                      onClick={() => setOpenDate(!openDate)}
                      className="headerSearchText"
                    >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}</span>
                    {openDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date"
                        minDate={new Date()}
                      />
                    )}
                  </div>
                  <div className="headerSearchItem">
                    <i class="bx bxs-user headerIcon"></i>
                    <span
                      onClick={() => setOpenOptions(!openOptions)}
                      className="headerSearchText"
                    >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                    {openOptions && (
                      <div className="options">
                        <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.adult <= 1}
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.adult}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("adult", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.children <= 0}
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.children}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("children", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionItem">
                          <span className="optionText">Room</span>
                          <div className="optionCounter">
                            <button
                              disabled={options.room <= 1}
                              className="optionCounterButton"
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <span className="optionCounterNumber">
                              {options.room}
                            </span>
                            <button
                              className="optionCounterButton"
                              onClick={() => handleOption("room", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="headerSearchButton">
                    <button
                      className={
                        destination === "" ? "headerBtn2 active" : "headerBtn2"
                      }
                      onClick={handleSearch}
                      disabled={destination === ""}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
