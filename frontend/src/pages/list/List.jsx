import "./list.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Empty from "./Empty";

const List = () => {


  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state?.destination || ""
  );
  const [dates, setDates] = useState(
    location.state?.dates || [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]
  );
  const [openDate, setOpenDate] = useState(false);
  const options = useState(
    location.state?.options || {
      adult: 1,
      children: 0,
      room: 1,
    }
  );
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1500);
  const [filter, setFilter] = useState(false);
  let inner = window.innerWidth;
  useEffect(() => {
    if (inner >= 992) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [inner]);
  const type = [
    { value: " ", text: "All" },
    { value: "hotel", text: "Hotel" },
    { value: "apartment", text: "Apartments" },
    { value: "resort", text: "Resorts" },
    { value: "villa", text: "Villas" },
    { value: "tourist", text: "Tourist Attraction" },
  ];
 

  const ratingdata = [1, 2, 3, 4, 5];
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(
    location.state?.type || type[0].value
  );


  const optionSelect = type.map((item) => {
    return (
      <option key={item.value} value={item.value}>
        {item.text}
      </option>
    );
  });


  const { data, loading } = useFetch(
    // `https://thankful-bass-waders.cyclic.app/api/hotels`
    `/hotels`
  );

// const getData = "region"

// const getValues = data.map((value)=>{
//   return (value[getData])
// })

// console.log(getValues);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const datas = data.filter((item) => {
    if (destination === "") {
      return item;
    }

    // return item.city
    // console.log(item.city);
    // return item.region.toLowerCase().includes(destination.toLowerCase());
    return item.city.toLowerCase().includes(destination.toLowerCase());
  });


 

  
  const typeoption = datas.filter((item) => {
    if (selected === " ") {
      return item;
    }

    // console.log(item.type);
    return item.type.toLowerCase().includes(selected.toLowerCase());
  });





  const rateoption = typeoption.filter((item) => {
    if (active === null) {
      return item;
    }
    return item.rating === active;
  });




  const minmax = rateoption.filter((item) => {
    return item.cheapestPrice >= min && item.cheapestPrice <= max;
  });

  return (
    <div>
      <Header type="list" />
      <div className="listContainer container">
        <h3 className="mb-2">Choose from wide range of reservations</h3>
        <div className="mb-4 available">
          <span className="first">Available destinations:</span>
          <span className="second">accra,ashanti,eastern,western,central,volta,savannah,northern,bono,bono-east,ahafo,north-east,upper-east,upper-west,oti,western-north</span>
        </div>
        <div className="listWrapper row gy-5">
          <div className="col-lg-3 col-md-12">
            <div className="position-relative">
              <button
                onClick={() => {
                  setDestination("");
                  setSelected(type[0].value);
            
                  setActive(null);
                }}
                className="clear btn btn-sm"
              >
                clear filter
              </button>
              <div className="listSearch">
                <i
                  className="bx bx-filter"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Filter"
                  onClick={() => {
                    setFilter(!filter);
                  }}
                ></i>
                <h1 className="lsTitle">Search</h1>
                <div className="lsItem">
                  <label>Region</label>
                  <input
                    placeholder="Type preferred region"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                    type="text"
                  />
            
                </div>
                <div className="lsItem">
                  <label>Type</label>
                  <select
                    value={selected}
                    onChange={handleChange}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    {optionSelect}
                  </select>
                </div>
                {filter && (
                  <div className="lsItem">
                    <label>Ratings</label>
                    <div className="rating-cont">
                      {ratingdata.map((item, i) => {
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setActive(item);
                            }}
                            className={`btn btn-sm rating-btn me-2 ${
                              active === item && "active"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                      <button
                        className="btn btn-sm cancel-btn"
                        onClick={() => {
                          setActive(null);
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
                {filter && (
                  <div className="lsItem lsOpt">
                    <label>Check-in Date</label>
                    {!dates && (
                      <span onClick={() => setOpenDate(!openDate)}>
                        Select duration
                      </span>
                    )}
                    {dates && (
                      <span onClick={() => setOpenDate(!openDate)}>
                        {`${format(
                          dates[0].startDate,
                          "MM/dd/yyyy"
                        )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                      </span>
                    )}

                    {openDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date-list"
                        minDate={new Date()}
                      />
                    )}
                  </div>
                )}
                {filter && (
                  <div className="lsItem">
                    <label>Options</label>
                    <div className="lsOptions">
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Min price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          value={min}
                          onChange={(e) => setMin(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Max price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          value={max}
                          onChange={(e) => setMax(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Adult</span>
                        <input
                          type="number"
                          min={1}
                          className="lsOptionInput"
                          placeholder={options?.adult}
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Children</span>
                        <input
                          type="number"
                          min={0}
                          className="lsOptionInput"
                          placeholder={options?.children}
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Room</span>
                        <input
                          type="number"
                          min={1}
                          className="lsOptionInput"
                          placeholder={options?.room}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-8">
            <div className="listResult">
              {minmax.length === 0 && !loading && <Empty />}
              {loading ? (
                // "loading"
                <div className="d-flex justify-content-center">
                  <div class="lds-dual-ring"></div>
                </div>
              ) : (
                <>
                <div className="row gy-4">
                  {minmax.map((item) => (
                    <SearchItem date={dates} item={item} key={item._id} />
                  ))}
                </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
