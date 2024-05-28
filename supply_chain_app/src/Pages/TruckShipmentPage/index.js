import SiteBar from "../../components/SiteBar"
import { useEffect, useState } from "react"
import './TruckShipmentPage.css'
import TruckShipmentItem from "../../components/TruckShipmentItem";
import { SpinnerDotted } from 'spinners-react';


function TruckShipmentPage(){
    let [listTruckShipment, setlistTruckShipment] = useState([]);
    let [isMounted, setIsMouted]  = useState(false)
    useEffect(() => {
        var mounted = true;
        console.log(mounted)
        fetch('http://127.0.0.1:8000/get-truckshipment')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setlistTruckShipment(data)
            setIsMouted(true)
            console.log(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        return () => mounted = false;
      }, []);
    let a;
    if(isMounted === true){
        // console.log(isMounted)
        // console.log(listTruckShipment.length)
        a = listTruckShipment.map((element1, index) =>{
            element1["key"] = index;

            return <TruckShipmentItem data= {element1}/> 
        } )
        // console.log(a)
    }
    var loadingData = <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
                            <SpinnerDotted/>
                            <p style={{fontSize: "26px"}}>Loading data</p>
                        </div>
    return(
        <div>
            <SiteBar data = {{"Page": "Truck data"}}/>
            <div className="retail-data-container">
            {isMounted === true &&
                a
            }
            {isMounted === false &&
                loadingData
            }
            </div>
 
        </div>
    )

}

export default TruckShipmentPage