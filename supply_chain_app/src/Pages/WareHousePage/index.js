import SiteBar from "../../components/SiteBar"
import { useEffect, useState } from "react"
import './WareHousePage.css'
import WareHouseItem from "../../components/WareHouseItem";
import { SpinnerDotted } from 'spinners-react';


function WareHousePage(){
    let [listWareHouse, setlistWareHouse] = useState([]);
    let [isMounted, setIsMouted]  = useState(false)
    useEffect(() => {
        var mounted = true;
        console.log(mounted)
        fetch('http://127.0.0.1:8000/get-ware-house')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setlistWareHouse(data)
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
        // console.log(listWareHouse.length)
        a = listWareHouse.map((element1, index) =>{
            element1["key"] = index;

            return <WareHouseItem data= {element1}/> 
        } )
        // console.log(a)
    }
    var loadingData = <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
                        <SpinnerDotted/>
                        <p style={{fontSize: "26px"}}>Loading data</p>
                    </div>
    return(
        <div>
            <SiteBar data= {{"Page": "Warehouse data"}}/>
            <div className="warehouse-data-container">
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

export default WareHousePage