import useFetch from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";

import "./featured.scss";
import Regions from "../Regions.jsx";

const savanah_img="https://visitghana.com/wp-content/uploads/2021/02/8719_Mole.jpg"
const accra_img="https://www.ama.gov.gh/img/fade-slider/accra-1.jpg"
const ashanti_img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/44/44/b4/that-s-the-picture.jpg?w=600&h=400&s=1"
const eastern_img="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/c0/42/42/boti-falls-eastern-region.jpg?w=400&h=-1&s=1"
const western_img="https://i.ytimg.com/vi/aDi_skjJeqE/mqdefault.jpg"
const central_img="https://visitghana.com/wp-content/uploads/2019/05/4166_Elmina-Castle-Ghana-1990s.jpg"
const northern_img="https://visitghana.com/wp-content/uploads/2019/05/4170_larabanga.jpg"
const volta_img="https://grassroottours.com/wp-content/uploads/2019/05/ls-slider-5-slide-1-608x342.jpg"

const Featured = () => {
  const { data, loading } = useFetch(
    // "https://thankful-bass-waders.cyclic.app/api/hotels/countByCity?cities=berlin,madrid,london,paris"
    // "/hotels/countByCity?cities=accra,kumasi,koforidua,takoradi,cape coast,ho,savannah,tamale,bono,bono-east,ahafo,north-east,upper-east,upper-west,oti,western-north"
    "/hotels/countByRegion?regions=accra,ashanti,eastern,western,central,volta,savannah,northern,bono,bono-east,ahafo,north-east,upper-east,upper-west,oti,western-north"
  );
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="homeTitle mb-3">Property by Region</h1>
      <div className="featured row gy-3 gx-md-3 gx-3 justify-content-center">
        {loading || data.length === 0 ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <Regions region={"Greater Accra Region"} img={accra_img}  destination={"accra"}/>
            <Regions region={"Ashanti Region"} img={ashanti_img}  destination={"ashanti"}/>
            <Regions region={"Eastern Region"} img={eastern_img}  destination={"eastern"}/>
            <Regions region={"Western Region"} img={western_img}  destination={"western"}/>
            <Regions region={"Central Region"} img={central_img}  destination={"central"}/>
            <Regions region={"Volta Region"} img={volta_img}  destination={"volta"}/>
            <Regions region={"Savannah Region"} img={savanah_img}  destination={"savannah"}/>
            <Regions region={"Northern Region"} img={northern_img}  destination={"northern"}/>
            {/* <Regions region={"Greater Accra Region"} img={savanah_img} data={data[0]} destination={"accra"}/>
            <Regions region={"Ashanti Region"} img={savanah_img} data={data[1]} destination={"ashanti"}/>
            <Regions region={"Eastern Region"} img={savanah_img} data={data[2]} destination={"eastern"}/>
            <Regions region={"Western Region"} img={savanah_img} data={data[3]} destination={"western"}/>
            <Regions region={"Central Region"} img={savanah_img} data={data[4]} destination={"central"}/>
            <Regions region={"Volta Region"} img={savanah_img} data={data[5]} destination={"volta"}/>
            <Regions region={"Savannah Region"} img={savanah_img} data={data[6]} destination={"savannah"}/>
            <Regions region={"Northern Region"} img={savanah_img} data={data[7]} destination={"northern"}/> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
