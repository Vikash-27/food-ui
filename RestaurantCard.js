import { CDN_URL } from "../utils/constant";
// RestaurantCard Component
const RestaurantCard = (props) => {
    const { name, cuisines, avgRating, cloudinaryImageId ,areaName} = props.ResObj.info;
    return (
      <div className="res-card">
        <img
          className="res-logo"
          alt="res-img"
          src={CDN_URL+cloudinaryImageId}
        />
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4> ⭐{avgRating}  stars</h4>
        <p>{areaName}</p>
      </div>
    );
  };

export default RestaurantCard;