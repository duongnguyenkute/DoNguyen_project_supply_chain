import SiteBar from "../../components/SiteBar"
import { useEffect, useState } from "react"
// import './OrderItemPage.css'
import OrderItem from "../../components/OrderItem"
import { useLocation } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';
import React from "react";
import { useNavigate } from "react-router-dom";



function OrderFromWarehousePage(){
    const navigator = useNavigate();
    const location = useLocation();
    const dictData = location.state;
    let [listOrderItems, setListOrderItems] = useState([]);
    let [isMounted, setIsMouted]  = useState(false)
    // let [listOrder, setListOrder] = useState({})
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
            setListOrderItems(data)
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
        // var temp_OrderState = {}
        a = listOrderItems.map((element1, index) =>{
            element1["key"] = index;
            // temp_OrderState[element1["GoodsID"]] = ""
            return <div>
                        <OrderItem data= {element1}/>
                        <input id= {element1["GoodsID"]} type="text" data = {element1} placeholder="Enter Quantity Order" ></input>
                    </div> 
        } )
        // setListOrder(temp_OrderState)
        // console.log(a)
    }
    var loadingData = <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
                            <SpinnerDotted/>
                            <p style={{fontSize: "26px"}}>Loading data</p>
                        </div>
    return(
        <div>
            <SiteBar data= {{'Page': "Place Order From Warehouse"}}/>
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
                    let item

                    let listPlaceOrder = []
                    for (item in listOrderItems){
                        
                        console.log("List Order: ",listOrderItems[item])
                        let inputElement = document.getElementById(listOrderItems[item]["GoodsID"])
                        let countValue = +inputElement.value
                        if(countValue !== 0){
                            listPlaceOrder = listPlaceOrder.concat([{"StoreroomID": dictData["$dtId"], "GoodsID":listOrderItems[item]["GoodsID"], "Count": inputElement.value , "GoodsName": listOrderItems[item]["goodsname"],  "Quantity": listOrderItems[item]["Count"]}, ])
                            console.log("List Place Order",listPlaceOrder)
                            console.log("Item place order", {"StoreroomID": dictData["$dtId"], "GoodsID":listOrderItems[item]["GoodsID"], "Count": inputElement.value })


                            console.log("Input Value: ", inputElement.value)
                        }
                        
                        inputElement.value = ""

                    }
                    
                    let b = listPlaceOrder.length
                    // alert(`list place order ${listPlaceOrder.length}`)
                    console.log("listPlaceOrder: ", b)
                    if(b == 0){
                        alert("Thông tin đặt hàng rỗng!")
                    }
                    else{
                        navigator('/result-place-order-from-whouse', {state: listPlaceOrder})
                    }


                }}>
                    Place Order
                </button>
            </div>
        </div>
    )

}

export default OrderFromWarehousePage