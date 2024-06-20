import React, { useState, useEffect } from 'react';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);

    const fetchMenu = async () => {
        try {
            const response = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.6868&lng=83.2185&restaurantId=167119&submitAction=ENTER");
            const json = await response.json();
            console.log(json);
            setResInfo(json);
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    console.log("Resmenu rendered");

    // Destructure only if resInfo is not null and has the required structure
    let name, header1, offerlogo1, header2, offerlogo2, couponCode2, header4, offerlogo4, couponCode4, couponCode1, header3, offerlogo3, couponCode3, city, locality, costForTwoMessage, cuisines, slaString, lastMileTravelString, avgRating, totalRatingsString, enrichedText;
    if (resInfo?.data?.cards?.[2]?.card?.card?.info) {
        ({ name, city, locality, costForTwoMessage, cuisines, slaString, lastMileTravelString, avgRating, totalRatingsString } = resInfo.data.cards[2].card.card.info);
        slaString = resInfo.data.cards[2].card.card.info.sla.slaString; 
        enrichedText = resInfo.data.cards[2].card.card.info.expectationNotifiers[0].enrichedText;
    }

    if (resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[0]?.info) {
        header1 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[0]?.info.header;
        offerlogo1 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[0]?.info.offerLogo;
        couponCode1 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[0]?.info.couponCode;
    }

    if (resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[1]?.info) {
        header2 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[1]?.info.header;
        offerlogo2 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[1]?.info.offerLogo;
        couponCode2 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[1]?.info.couponCode;
    }

    if (resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[2]?.info) {
        header3 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[2]?.info.header;
        offerlogo3 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[2]?.info.offerLogo;
        couponCode3 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[2]?.info.couponCode;
    }

    if (resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[3]?.info) {
        header4 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[3]?.info.header;
        offerlogo4 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[3]?.info.offerLogo;
        couponCode4 = resInfo?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.[3]?.info.couponCode;
    }

    // Extract itemCards only if the path exists
    let itemCards = [];
    if (resInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card?.itemCards) {
        itemCards = resInfo.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards;
    }

    return (
        <div className='restaurantmenu'>
            {resInfo ? (
                <div className="restmenudata">
                    <p>Home/Vizag/{name}</p>
                    <h1>{name}</h1>
                    <div className='restmenucard'>
                        <h3>{avgRating} ({totalRatingsString})</h3>
                        <h4>{cuisines.join(", ")}</h4>
                        <h4>{locality}</h4>
                        <h4>{slaString}</h4>
                        <div dangerouslySetInnerHTML={{ __html: enrichedText }} />
                    </div>
                    <div className='restmenuOffers'>
                        <h3> Deals for You</h3>
                        <div className='bankoffers'>
                            <div className='offers'>
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerlogo1} alt="offer1" />
                                <h5>{header1}</h5>
                                <p>{couponCode1}</p>
                            </div>
                            <div className='offers'>
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerlogo2} alt="offer2" />
                                <h5>{header2}</h5>
                                <p>{couponCode2}</p>
                            </div>
                            <div className='offers'>
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerlogo3} alt="offer3" />
                                <h5>{header3}</h5>
                                <p>{couponCode3}</p>
                            </div>
                            <div className='offers'>
                                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerlogo4} alt="offer4" />
                                <h5>{header4}</h5>
                                <p>{couponCode4}</p>
                            </div>
                        </div>
                    </div>
                    <div className="resMenuFoodItems">
                        {itemCards.length > 0 ? (
                            <ul>
                                {itemCards.map(item => (
                                    <li key={item.card.info.id}>
                                        <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + item.card.info.imageId} alt={item.card.info.name} />
                                        <p>{item.card.info.name}</p>
                                        <p>₹{item.card.info.price / 100}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items available</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RestaurantMenu;
