import React from 'react';
import "./TruckShipmentItem.css"
import { TbTemperatureCelsius } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useState } from 'react';
import ModalTruckShipment from '../ModalTruckShipment';
import IconBlock from './block-icon.png'
import CheckIcon from './check.png'
import PinIcon from './pin.png'
const TruckShipmentItem = ({ data }) => {
    const dictData = {...data};
    const [modalState, setModalState] = useState("modal display-none")
    const [shipmentStatus, setShipmentStatus] = useState(dictData['is_free'])
    const navigator = useNavigate()


    return (
        <main>
            <div key={dictData["key"]} className='truckshipment-item-contain' onClick={()=>{
                console.log(dictData)
                data = {"TruckShipmentID" : dictData["TruckShipmentID"],
                        "StoreroomLocation": ""
                }
                 navigator("/cargo-on-truck", {state: data})
            }}>
            <MdOutlineLocalShipping className='truckshipment-item-icon'/>
            <p>StockLevel: {dictData["StockLevel"]}</p>
            <p>Humidity: {dictData["Humidity"]}</p>
            <div style={{margin: "8px"}} >
                    <img src = {PinIcon  } alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    {/* <p>Localtion: {dictData["Location"]}</p> */}
                    <p style={{display: 'inline'}} >Current Localtion: {dictData["Location"]}</p>
            </div>
            {/* <p>Current Localtion: {dictData["Location"]}</p> */}
            <div className='temperature-container'>
                <p className='temperature-container'>Temperature: {dictData["Temperature"]}</p>
                <TbTemperatureCelsius className='temperature-container'/>
            </div>
            
            <div style={{margin: "8px"}} >
                    <img src = {PinIcon  } alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    {/* <p>Localtion: {dictData["Location"]}</p> */}
                    <p style={{display: 'inline'}} >WareHouse Location: {dictData["WLocation"]}</p>
            </div>

            {/* <p>WareHouse Location: {dictData["WLocation"]}</p> */}
            
        </div>
        </main>

    );
};

export default TruckShipmentItem;