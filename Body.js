import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { SWIGGY_API_URL } from "../utils/constant";
import { SWIGGY_CAROUSEL_URL } from "../utils/constant";
import ShimmerCarousel from "./ShimmerCarousel";

// Body Component
const Body = () => {
  const [RestList2, setRestList2] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [searchText , setSearchText] = useState("");
  const [filteredDataList , setFilteredDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_API_URL);
      const json = await response.json();
      console.log(json);

      
      const restaurants = json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      const carouselRestaurants = json?.data?.cards?.[0].card?.card?.imageGridCards.info;

      if (restaurants && carouselRestaurants) {
        setRestList2(restaurants);
        setCarouselData(carouselRestaurants);
        setFilteredDataList(restaurants);
      } else {
        console.error("Restaurant data not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); 
    }
  };
  if (isLoading) {
    return (
      <div className="body">
        <div className=" ShimmerCarousel">
          <ShimmerCarousel/>
        </div>
        <div className="res-container">
          <Shimmer/> 
        </div>
      </div>
    );
  }

  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={() => {
          const filteredList = RestList2.filter((res) => res.info.avgRating > 4.2);
          setFilteredDataList(filteredList);
        }}>Top rated Restaurants</button>
        <input  className = "searchfield "type = "text" placeholder="Search for Restaurants" value = {searchText}
        onChange={(e) =>setSearchText(e.target.value)}
        />
        <button className="search-btn" 
        onClick={() => {
          const filteredSearchData = RestList2.filter((res) => res.info.name.toLowerCase().includes(searchText) )
          setFilteredDataList(filteredSearchData);
        }}
        > Search </button>
      </div>

      <div className="carousel">
        <div className="carousel-heading">
        <h1 > What's on your mind? </h1>
        </div>
        <br/>
        <div className="carousel-container">
          {carouselData.map((restaurant) => (<img src = {SWIGGY_CAROUSEL_URL + restaurant.imageId}/>))}
        </div>
      
      </div>
      
      <div>
        <div className = "res-container-heading"> 
           <h1>Restaurants with online food delivery  </h1>
          </div>
      <div className="res-container">
        {filteredDataList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} ResObj={restaurant} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Body;