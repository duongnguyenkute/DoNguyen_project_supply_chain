import "./OrderItemFromWareHouse.css"
import OrderQuantityIcon from "./check-out.png"
import PinIcon from "./pin.png"
import PriceIcon from "./price_img.png"
import OnStockIcon from "./stock_img.png"
import { LuDollarSign } from "react-icons/lu"
import FastDelivery from "./fast-delivery.png"
function OrderItemFromWarehouse({data}){

    const dictData = {...data}

    const goodsIconData = {
        "Coca-Cola": <img  width="64" height="64" src="https://img.icons8.com/cotton/64/cola.png" alt="cola"/>,
        "Hat" : <img width="64" height="64" src="https://img.icons8.com/emoji/48/top-hat-emoji.png" alt="top-hat-emoji"/>,
        "Shoes": <img width="64" height="64" src="https://img.icons8.com/color/48/pair-of-sneakers.png" alt="pair-of-sneakers"/>,
        "T-Shirt" : <img width="64" height="64" src="https://img.icons8.com/dusk/64/t-shirt.png" alt="t-shirt"/>,
        "Dress": <img width="64" height="64" src="https://img.icons8.com/color/48/wedding-dress.png" alt="wedding-dress"/>

    }

    console.log("dictData: ", dictData)

    let orderData
   
    orderData = dictData['data']["list_order"].map((element, index)=>{


        if(element){
            const formattedDistance = (element["distance"]).toFixed(4);
            return (
                <div className= {"order-detail-item"}>
                    <p>Distance: {formattedDistance} Km</p>
    
    
                    <div style={{display: "inline-block"}}>
                        <img src={PriceIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                        <p style={{display: "inline-block", paddingLeft: "4px"}}>Price: {element["Price"]}</p>
                        <LuDollarSign className='dollar-container'/>
                    </div>
                    {/* <p>Price: {element["Price"]}</p> */}
                    {/* <p>Order Quantity: {element["order_quantity"]}</p> */}
    
                    <div >
                        <img src={OrderQuantityIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                        <p style={{display: "inline-block", paddingLeft: "4px"}}>Order Quantity: {element["order_quantity"]}</p>
                    </div>
                    
                    <div >
                        <img src={PinIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                        <p style={{display: "inline-block", paddingLeft: "4px"}}>W Location: {element["WLocation"]}</p>
                    </div>
    
                    {/* <p>Delivery time: {element["ShipmentDate"]}</p> */}

                    <div style={{"display": "flex", "alignItems": "center", "justifyContent": "center"}} >
                        <img src={FastDelivery} alt="Order Quantity" style={{width: "25px", height: "25px"}}/>
                        <p style={{display: "inline-block", paddingLeft: "4px"}}>Delivery time: {element["ShipmentDate"]}</p>
                    </div>
                </div>
            )
        }
    })

        
    if(dictData['data']["list_order"].length === 0){
        <div className="order-item-container">
            <div>
                <p>Goods Name: {dictData["GoodsName"]}</p>
                {/* <p>Remaining Quantity: {dictData["Quantity"]}</p> */}
                <div style={{display: "inline-block"}}>
                    <img src={OnStockIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                    <p style={{display: "inline-block", paddingLeft: "4px"}}>On Stock: {dictData["Quantity"]}</p>
                </div>
                <div>   
                <img src={OrderQuantityIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                <p>Order Quantity: 0/{dictData["Quantity"]}</p>
                </div>
            </div>
        </div>
    }
    return (
        <div className="order-item-container">

            <div  className='order-fwarehouse-item-contain' 
            >
                {goodsIconData[dictData["GoodsName"]]}
                <p >Name: {dictData["GoodsName"]}</p>
                {/* <p >Remaining Quantity: {dictData["Quantity"]}</p> */}

                <div style={{display: "block"}}>
                    <img src={OnStockIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                    <p style={{display: "inline-block", paddingLeft: "4px"}}>On Stock: {dictData["Quantity"]}</p>
                </div>

                <div style={{display: "block"}}>
                    <img src={OrderQuantityIcon} alt="Order Quantity" style={{width: "16px", height: "16px"}}/>
                    <p style={{display: "inline-block", paddingLeft: "4px"}}>Order Quantity:  {dictData["Count"] - dictData['data']['remaining']}/{dictData["Count"]}</p>
                </div>
            </div>
            
            <div className="order-detail-container">
                {orderData}  
            </div>
        </div>
    )
}

export default OrderItemFromWarehouse