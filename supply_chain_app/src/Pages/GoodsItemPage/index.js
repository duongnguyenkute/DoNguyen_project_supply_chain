import SiteBar from "../../components/SiteBar"
import { useEffect, useState } from "react"
import './GoodsItemPage.css'
import GoodsItem from "../../components/GoodsItem"
import { useLocation } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from "react-router-dom";

function GoodsItemPage(){
    const navigator = useNavigate()
    const location = useLocation();
    const dictData = location.state;
    let [listGoodsItems, setListGoodsItems] = useState([]);
    let [isMounted, setIsMouted]  = useState(false)
    useEffect(() => {
        var mounted = true;
        fetch('http://127.0.0.1:8000/relationship-storeroom-good?storeroom_id=' + dictData["$dtId"])
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

            return <GoodsItem data= {element1}/> 
        } )
        // console.log(a)
    }
    var loadingData = <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
                            <SpinnerDotted/>
                            <p style={{fontSize: "26px"}}>Loading data</p>
                        </div>
    return(
        <div>
            <SiteBar data= {{'Page': "Storeroom inventory"}}/>
            <div className="goods-items-data-container">
            {isMounted == true &&
                a
            }
            {isMounted === false &&
                loadingData    
            }
            </div>
            <div className="order-from-warehouse-container">
                <button className="order-from-warehouse-button" onClick={()=>{
                    const data = { '$dtId': dictData['$dtId']};
                    navigator("/order-from-warehouse", {state: data})
                }}>
                    Order from Warehouse
                </button>
            </div>
        </div>
    )

}

export default GoodsItemPage