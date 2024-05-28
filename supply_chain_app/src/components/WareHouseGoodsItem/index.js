import React from 'react';
import "./WareHouseGoodsItem.css"
import { LuDollarSign } from "react-icons/lu";
import { useState, useEffect } from 'react';
import PriceIcon from "./price_img.png"
import OnStock from "./stock_img.png"

const WareHouseGoodsItem = ({ data }) => {
    const dictData = {...data};
    const [modalState, setModalState] = useState("modal display-none")
    const [modalAddState, setModalAddState] = useState("modal display-none")
    const [quantity, setQuantity] = useState()
    const[storeRoomLocation, setStoreRoomLocation] = useState("")
    const [quantityRemaining, setQuantityRemaining] = useState(dictData["Count"])
    const [storeroomTemperature, setStoreroomTemperature] = useState("")
    const [storeroomHumidity, setStoreroomHumidity] = useState("")
    const [storeroomID, setStoreroomId] = useState("")
    const [truckShipmentID, setTruckShipmentID] = useState("")
    const [truckShipmentLocation, setTruckShipmentLocation] = useState("")
    const [truckShipmentTemperature, setTruckShipmentTemperature] = useState("")
    const [truckShipmentHumidity, setTruckShipmentHumidity] = useState("")
    const [goodsPrice, setGoodsPrice] = useState(dictData["Price"])
    const [price, setPrice] = useState()
    
    useEffect(() => {
        var mounted = true;
        fetch('http://127.0.0.1:8000/get-shipment-by-warehouse?warehouse_id=' + dictData["warehouse_id"])
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // setListGoodsItems(data)
            // setIsMouted(true)
            console.log(data)
            console.log("dictData:")
            console.log(dictData)
            setTruckShipmentHumidity(data['humidity'])
            setTruckShipmentID(data["id"])
            setTruckShipmentTemperature(data["temperature"])
            setTruckShipmentLocation(data['location'])
            // setIsMouted(true)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        return () => mounted = false;
      }, []);

    const goodsIconData = {
        "Coca-Cola": <img width="64" height="64" src="https://img.icons8.com/cotton/64/cola.png" alt="cola"/>,
        "Hat" : <img width="64" height="64" src="https://img.icons8.com/emoji/48/top-hat-emoji.png" alt="top-hat-emoji"/>,
        "Shoes": <img width="64" height="64" src="https://img.icons8.com/color/48/pair-of-sneakers.png" alt="pair-of-sneakers"/>,
        "T-Shirt" : <img width="64" height="64" src="https://img.icons8.com/dusk/64/t-shirt.png" alt="t-shirt"/>,
        "Dress": <img width="64" height="64" src="https://img.icons8.com/color/48/wedding-dress.png" alt="wedding-dress"/>

    }
    console.log(goodsIconData[dictData["goodsname"]])

    let shipToStoreRoomModal = <div className={modalState}>
                <section className="modal-main-ware">
                    <h1>Deliver to Storeroom</h1>
                    <div className='modal-content'>
                        <div  className='p-text modal-row'>
                            <div className='modal-col-third'></div>
                            <div className='modal-col-four'>
                                {goodsIconData[dictData["goodsname"]]}
                            </div>
                            <div className='modal-col-half'>
                                <p className='p-text p-bold-ware' style={{    lineHeight: "53.48px"}}>{dictData["goodsname"]}</p>
                            </div>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'></div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Remaining</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '>{quantityRemaining}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'></div>

                        <div className='modal-col-four' >
                            <p  className='p-text p-bold-ware'>Price</p>
                        </div>
                        <div className='modal-col-half'>
                            { quantityRemaining !==0   && <p className='p-text' style={{display: "inline"}}>Price: {goodsPrice}</p>}
                            <LuDollarSign className='dollar-container'/>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'></div>

                        <div className='modal-col-four' >
                            <p  className=' p-text p-bold-ware'>Quantity</p>
                        </div>
                        <div className='modal-col-half '>
                            <input className='p-text' style={{padding: "4px", marginLeft: "16px"}} type="text " placeholder='Enter Quantity!' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'>
                            <p  className=' p-text p-title-info'> Storeroom </p>
                        </div>
                        <div className='modal-col-four' >
                            <p  className=' p-text p-bold-ware'>Deliver to</p>
                        </div>
                        <div className='modal-col-half '>
                            <input className='p-text' style={{padding: "4px", marginLeft: "16px" }} type="text " placeholder="Enter Storeroom location!" value= {storeRoomLocation} onChange={(e) => setStoreRoomLocation(e.target.value)} onBlur={()=>{
                                fetch('http://127.0.0.1:8000/get-storeroom-by-location?storeroom_locaton=' + storeRoomLocation )
                                .then((response)=>{
                                    return response.json();
                                }).then((data)=>{
                                    console.log(data)
                                    if(data !== null){
                                    setStoreroomHumidity(data["humidity"])
                                    setStoreroomTemperature(data["temperature"])
                                    setStoreroomId(data['id'])
                                }})
                            }}/>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'></div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Humidity</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '>{storeroomHumidity}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'></div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>StoreroomID</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '> **************-{storeroomID.slice(-12)}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'></div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Temperature</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '>{storeroomTemperature}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'>
                            <p  className=' p-text p-title-info'> Truck info </p>
                        </div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Location</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '> {truckShipmentLocation}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'>
                        </div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Humidity</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '> {truckShipmentHumidity}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-third'>
                        </div>

                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Temperature</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '> {truckShipmentTemperature}</p>
                        </div>
                    </div>
                    <div style={{marginBottom: "16px", justifyContent: "space-around"} } className='modal-row mt-16'>
                        <button style={{margin: "0px 8px", width: "72px", borderRadius: '4px', padding: "4px"}} type="button" onClick={()=>{
                            console.log(dictData)
                            setModalState("modal display-none")
                        }}>
                        Close
                        </button>
                        <button style={{margin: "0px 8px", width: "72px", borderRadius: '4px', padding: "4px"}} type="button" onClick={()=>{          
                            fetch('http://127.0.0.1:8000/ship-goods-to-storeroom?goods_warehouse_id=' + dictData['id'] +'&remaining=' + (quantityRemaining - quantity)+'&price=' + dictData["Price"] )
                                .then((respone)=>{
                                    console.log(respone)
                                    setModalState("modal display-none")
                                    setQuantityRemaining( quantityRemaining - quantity )
                                    setQuantity("")
                                    return respone.json
                                }).then((data)=>{
                                    console.log(data)
                                    fetch("http://127.0.0.1:8000/ship-goods-to-store-by-truck?storeroom_id=" + storeroomID+ "&goods_id="+ dictData['dtId'] +"&count="+ quantity + "&price=" + dictData["Price"] + "&truckshipment_id=" + truckShipmentID ).then((response) =>{
                                        return response.json
                                    }).then((data)=>{
                                        console.log(data)
                                    })
                                });
                            }}>
                                Confirm
                        </button>
                        
                    </div>
                </section>
            </div>

    let addGoodsToWareHouse = 
            <div className={modalAddState}>
                <section className="modal-main-ware-addgoods">
                    <h1>Add Goods To WareHouse</h1>
                    <div className='modal-content'>
                        <div  className='p-text modal-row'>
                            <div className='modal-col-four'>
                                {goodsIconData[dictData["goodsname"]]}
                            </div>
                            <div className='modal-col-half'>
                                <p className='p-text p-bold-ware' style={{    lineHeight: "53.48px"}}>{dictData["goodsname"]}</p>
                            </div>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-four'>
                            <p className='p-text p-bold-ware'>Remaining</p>
                        </div>
                        <div className='modal-col-half'>
                            <p className='p-text '>{quantityRemaining}</p>
                        </div>
                    </div>

                    <div className='p-text modal-row mt-16'>
                        <div className='modal-col-four' >
                            <p  className='dollar-container p-text p-bold-ware'>Price</p>
                        </div>
                        <div className='modal-col-half'>
                            {quantityRemaining ===0 && <input  style={{display: 'inline', width :"64px", marginLeft: "16px", padding: "4px"}} placeholder='Price' className='dollar-container' value={price} onChange={(e)=> setPrice(e.target.value)}/>}
                            { quantityRemaining !==0   && <p className='p-text' style={{display: "inline"}}>Price: {goodsPrice}</p>}
                            <LuDollarSign className='dollar-container'/>
                        </div>
                    </div>
                    <div className='p-text modal-row' style={{ margin: '16px 0px'}}>
                                <div className='modal-col-four' >
                                    <p  className='dollar-container p-text p-bold-ware'>Quantity</p>
                                </div>
                                <div className='modal-col-half p-text'>
                                    {/* <input placeholder= "Enter Quantity" style={{padding: "4px"}} type="text "  value={quantity} onChange={(e) => setQuantity(e.target.value)} /> */}
                                    <input  style={{padding: "4px"}} type="text " placeholder='Enter Quantity!' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                    </div>
                    <div style={{marginBottom: "16px", justifyContent: "space-around"} } className='modal-row mt-16'>
                        <button style={{margin: "0px 8px", width: "72px", borderRadius: '4px', padding: "4px"}} type="button" onClick={()=>{
                            console.log(dictData)
                            setModalAddState("modal display-none")
                            setQuantity("")
                            setPrice("")
                        }}>
                        Close
                        </button>
                        <button  style={{margin: "0px 8px", width: "72px", borderRadius: '4px', padding: "4px"}} type="button" onClick={()=>{
                            let temp_price = quantityRemaining === 0 ? parseInt(price, 10) : goodsPrice
                            fetch('http://127.0.0.1:8000/add-goods-to-warehouse?warehouse_id=' + dictData['warehouse_id']
                                                                             +'&count=' + (quantityRemaining + parseInt(quantity, 10))
                                                                             +'&price=' + temp_price
                                                                             +'&goods_id=' + dictData['dtId']
                                                                             +'&remaining=' + quantityRemaining
                                                                             +'&goods_warehouse_id=' + dictData['id']
                                                                            )
                                .then((respone)=>{
                                    console.log(respone)
                                    setModalState("modal display-none")
                                    setQuantityRemaining( quantityRemaining + parseInt(quantity, 10))
                                    setModalAddState("modal display-none")
                                    setGoodsPrice(temp_price)
                                    setQuantity("")
                                    setPrice("")
                                    console.log(dictData["id"])
                                    console.log(dictData['warehouse_id'])
                                    console.log(dictData["dtId"])
                                    return respone.json
                                }).then((data)=>{
                                    console.log(data)
                                });
                            }}>
                                Confirm
                        </button>
                        
                    </div>
                </section>
            </div>


    return (
       <main>
            {addGoodsToWareHouse}
            {shipToStoreRoomModal}
            <div key={dictData["key"]} className='ware-goods-item-contain' 
            >
                {goodsIconData[dictData["goodsname"]]}
                <p>Name: {dictData["goodsname"]}</p>
                <div style={{margin: "8px"}}>
                    <img className='warehouse-img-icon' src={OnStock} alt="OnStock"/>
                    <p style={{display: "inline"}} >On Stock: {quantityRemaining}</p>
                </div>
                <div className='dollar-container' style={{margin: "8px"}} >
                    <img className='warehouse-img-icon' src={PriceIcon} alt='Price Icon' />
                    <p style={{display: "inline"}}>Price: {goodsPrice}</p>
                    <LuDollarSign className='dollar-container'/>
                </div>

                <div>
                    {quantityRemaining ===0 && <p style={{color: "blue", padding: "0px", borderRadius: "17px",  background: "red", marginTop: "16px", marginBottom: "4px"}}>Empty</p>}
                </div>
                <div>
                    <button className='ware-house-button' onClick={()=>{
                        setModalAddState("modal display-block")
                    }} >
                        Add goods
                    </button>
                    <button
                    //  className= {quantityRemaining ===0? 'ware-house-button-disabled': 'ware-house-button'} 
                     className= {'ware-house-button-disabled'} 
                    onClick={()=>{
                        console.log('Clicked!')
                        if(quantityRemaining !== 0){
                            setModalState("modal display-block")
                        }
                    }} >
                        Ship Goods
                    </button>
                </div>
            </div>
       </main>
    );
};


export default WareHouseGoodsItem;