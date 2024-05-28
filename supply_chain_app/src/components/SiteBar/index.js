import "./SiteBar.css"
import { GiConsoleController, GiWorld } from "react-icons/gi";
import { ImTruck } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SiteBar( { data } ){
    const navigator = useNavigate()
    const dictData  = {...data}
    return (
        <div className="sitebar-container" style={{"height": window.innerHeight}}>
            <div className="icon-container" style={{'marginTop': '100px'}}>
                <GiWorld className="retail-icon " onClick={()=>{
                    console.log('/Global-map')
                    navigator('/Global-map')
                }}/>
                <span className="retail-text">World Map</span>
            </div>
            <div className="icon-container">
                <FaShoppingCart className="retail-icon " onClick={()=>{
                    console.log('/Retail-data')
                    navigator('/Retail-data')
                }} />
                <span className="retail-text">Retail-data</span>
            </div>
            <div className="icon-container">
                <ImTruck className="retail-icon" onClick={()=>{
                    console.log('/truckshipment-page')
                    navigator('/truckshipment-page')
                }}/>
                <span className="retail-text">Shipment-data</span>
            </div>
            <div className="icon-container">
                <FaWarehouse className="retail-icon" onClick={()=>{
                    console.log('/warehouse-page')
                    navigator('/warehouse-page')
                }}/>
                <span className="retail-text">WareHouse-data</span>
            </div>
            <div className = "appbar-container"  style={{"width": window.innerWidth}}>
                <h className= 'h-title-sitebar'>
                    {dictData['Page']}
                </h>
            </div>
        </div>
    )
}
export default SiteBar