import React from 'react';
import "./StoreItem.css"
import { IoStorefrontOutline } from "react-icons/io5";
import { TbTemperatureCelsius } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import PinIcon from "./pin.png"

const StoreItem = ({ data }) => {
    const dictData = {...data};
    const navigate = useNavigate();
    
    

    return (
        <div key={dictData["key"]} className='store-item-contain' onClick={()=>{
            console.log(dictData['$dtId'])
            const data = { '$dtId': dictData['$dtId']};
            console.log(data)
            navigate("/goods-items-data", { state: data });
        }}>
            <IoStorefrontOutline  className='store-item-icon'/>
            <p>StockLevel: {dictData["StockLevel"]}</p>
            <p>Humidity: {dictData["Humidity"]}</p>

            <div style={{margin: "8px"}} >
                    <img src = {PinIcon  } alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    {/* <p>Localtion: {dictData["Location"]}</p> */}
                    <p style={{display: 'inline'}} >Localtion: {dictData["Location"]}</p>
            </div>
            <div className='temperature-container'>
                <p className='temperature-container'>Temperature: {dictData["Temperature"]}</p>
                <TbTemperatureCelsius className='temperature-container'/>
            </div>
        </div>
    );
};

export default StoreItem;