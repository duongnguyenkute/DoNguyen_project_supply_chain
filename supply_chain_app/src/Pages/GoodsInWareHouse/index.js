import SiteBar from "../../components/SiteBar"
import { useEffect, useState } from "react"
import './GoodsInWareHouse.css'
import WareHouseGoodsItem from "../../components/WareHouseGoodsItem";
import { useLocation } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';



function GoodsInWareHouse(){
    const location = useLocation();
    const dictData = location.state;
    let [listGoodsItems, setListGoodsItems] = useState([]);
    let [isMounted, setIsMouted]  = useState(false)
    useEffect(() => {
        var mounted = true;
        fetch('http://127.0.0.1:8000/relationship-warehouse-good?warehouse_id=' + dictData["$dtId"])
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setListGoodsItems(data)
            setIsMouted(true)
            console.log(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        return () => mounted = false;
      }, []);
    let a;
    if(isMounted == true){
        // console.log(isMounted)
        // console.log(listStoreRoom.length)
        a = listGoodsItems.map((element1, index) =>{
            element1["key"] = index;
            element1['warehouse_id'] = dictData["$dtId"]

            return <WareHouseGoodsItem data= {element1}/> 
        } )
        // console.log(a)
    }
    var loadingData = <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
                            <SpinnerDotted/>
                            <p style={{fontSize: "26px"}}>Loading data</p>
                        </div>
    return(
        <div>
            <SiteBar data = {{'Page': "Warehouse Inventory"}}/>
            <div className="goods-items-data-container">
            {isMounted == true &&
                a
            }
            {isMounted === false &&
                loadingData    
            }
            </div>
 
        </div>
    )

}

export default GoodsInWareHouse