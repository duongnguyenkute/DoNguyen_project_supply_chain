import React from 'react';
import "./CargoOnTruckItem.css"
import { LuDollarSign } from "react-icons/lu";
import { useState, useEffect } from 'react';
import PriceIcon from "./price_img.png";
import OnStockIcon from "./stock_img.png";
import PinIcon from "./pin.png"
import SquareIcon from "./square.png"
import { useNavigate } from 'react-router-dom';



const CargoOnTruckItem = ({ data, handleChildChange }) => {

    

    const dictData = {...data};
    const navigate = useNavigate()
    const [modalAddState, setModalAddState] = useState("modal display-none")
    const [isChecked, setIsChecked] = useState(false)

    const goodsIconData = {
        "Coca-Cola": <img  width="64" height="64" src="https://img.icons8.com/cotton/64/cola.png" alt="cola"/>,
        "Hat" : <img width="64" height="64" src="https://img.icons8.com/emoji/48/top-hat-emoji.png" alt="top-hat-emoji"/>,
        "Shoes": <img width="64" height="64" src="https://img.icons8.com/color/48/pair-of-sneakers.png" alt="pair-of-sneakers"/>,
        "T-Shirt" : <img width="64" height="64" src="https://img.icons8.com/dusk/64/t-shirt.png" alt="t-shirt"/>,
        "Dress": <img width="64" height="64" src="https://img.icons8.com/color/48/wedding-dress.png" alt="wedding-dress"/>

    }
    // console.log(goodsIconData[dictData["GoodsName"]])

    // useEffect(()=>{
    //     return ()=>{
    //         if(isChecked == true){
    //             console.log(dictData["GoodsName"])
    //         }
    //         // dictData["GoodsName"]
    //             console.log(dictData["GoodsName"], isChecked)

    //     }
    // }, [])

    let addGoodsToWareHouse = <div className={modalAddState}>
                                <section className="cargo-item-modal-main">
                                    <h1>Delivery to Storeroom </h1>
                                    <div className='cargo-item-modal-content'>
                                        <div  className='p-text cargo-item-modal-row'>
                                            <div className='cargo-item-modal-col-custom1'>
                                                {goodsIconData[dictData["GoodsName"]]}
                                                {/* goods */}
                                            </div>
                                            <div className='cargo-item-modal-col-half'>
                                                <p className='p-text p-bold-ware' style={{    lineHeight: "53.48px"}}>{dictData["GoodsName"]}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='p-text cargo-item-modal-row mt-16'>
                                        <div className='cargo-item-modal-col-custom1'>
                                            <img src = {OnStockIcon} alt='Price Img' style={{width: "16px", height: "16px"}}/>
                                            <p className='p-text p-bold-ware'>Order-quantity</p>
                                        </div>
                                        <div className='cargo-item-modal-col-half'>
                                            <p className='p-text '> {dictData["Count"]}</p>
                                        </div>
                                    </div>

                                    <div className='p-text cargo-item-modal-row mt-16'>
                                        <div className='cargo-item-modal-col-custom1' >
                                        <img src = {PriceIcon} alt='Price Img' style={{width: "16px", height: "16px"}}/>
                                            <p  className='p-text p-bold-ware'>Price</p>
                                        </div>
                                        <div className='cargo-item-modal-col-half'>
                                            <p className='p-text '>{dictData["Price"]}</p>
                                            <LuDollarSign className='dollar-container'/>
                                        </div>
                                    </div>

                                    <div className='p-text cargo-item-modal-row mt-16'>
                                        <div className='cargo-item-modal-col-custom1' >
                                        <img src = {PinIcon} alt='Pin Img' style={{width: "16px", height: "16px"}}/>
                                        <p className='p-text p-bold-ware' >Delivery to</p>
                                        </div>
                                        <div className='cargo-item-modal-col-half'>
                                            <p className='p-text '>{dictData["SLocation"]}</p>
                                        </div>
                                    </div>


                                    <div className='p-text cargo-item-modal-row mt-16'>
                                        <div className='cargo-item-modal-col-custom1' >
                                        {/* <img src = {SquareIcon  } alt='Price Img' style={{width: "16px", height: "16px"}}/> */}
                                        {/* <p style={{display: 'inline'}} > Delivery time: {dictData["ShipmentTime"]}</p> */}
                                        <img src = {SquareIcon} alt='Pin Img' style={{width: "16px", height: "16px"}}/>
                                        <p className='p-text p-bold-ware' >Delivery time</p>
                                        </div>
                                        <div className='cargo-item-modal-col-half'>
                                            <p className='p-text '>{dictData["ShipmentTime"]}</p>
                                        </div>
                                    </div>


                                    <div style={{marginBottom: "16px", justifyContent: "space-around"} } className='cargo-item-modal-row mt-16'>
                                        <button style={{margin: "0px 8px", width: "72px", borderRadius: '4px', padding: "4px"}} type="button" onClick={()=>{
                                            console.log(dictData)
                                            setModalAddState("modal display-none")
                                        }}>
                                        Close
                                        </button>
                                        <button  style={{margin: "0px 8px", width: "72px", borderRadius: '4px', padding: "4px"}} 
                                            type="button" 
                                            onClick={()=>{
                                                fetch('http://127.0.0.1:8000/add-goods-to-storeroom?storeroom_id=' + dictData['StoreroomID']
                                                                                                +'&goods_id=' + dictData['GoodsID']
                                                                                                +'&Count=' + dictData['Count']
                                                                                                +'&Price=' + dictData['Price']
                                                                                                +'&billDetailID=' + dictData['BillDetailID']
                                                                                                )
                                                    .then((respone)=>{
                                                        console.log(respone)
                                                        setModalAddState("modal display-none")
                                                        return respone.json
                                                    }).then((data)=>{
                                                        console.log(data)
                                                        data = {"TruckShipmentID" : dictData["TruckShipmentID"],
                                                        "StoreroomLocation": ""
                                                        }
                                                        navigate("/cargo-on-truck", {state: data})
                                                        window.location.reload()
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
            <div key={dictData["key"]} className={ 'cargo-item-contain' } onClick={()=>{
                setModalAddState('modal display-block')
                // console.log("dictData: ", dictData)
                console.log(isChecked)
            }}> 
            <div style={{display: "flex",
    justifyContent: "flex-end"}}>
                <input type='checkbox' style={{width: '20px', height: "20px"}} onChange={(e)=>{
                    setIsChecked(e.target.checked)
                    handleChildChange(e.target.checked, dictData)
                }} onClick={(e)=>{
                    e.stopPropagation()
                    // console.log(isChecked)
                    // setIsChecked(!isChecked)
                }}
                />
            </div>
                {goodsIconData[dictData["GoodsName"]]}
                <p >Name: {dictData["GoodsName"]}</p>

                <div style={{margin: "8px"}} >
                    <img src = {OnStockIcon} alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    <p style={{display: 'inline'}} > Order Quantity: {dictData["Count"]}</p>
                </div>
                <div className='dollar-container'>
                    <img src = {PriceIcon} alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    <p  style={{display: 'inline'}}>Price: {dictData["Price"]}</p>
                    <LuDollarSign className='dollar-container'/>
                </div>

                <div style={{margin: "8px"}} >
                    <img src = {PinIcon} alt='Pin Img' style={{width: "16px", height: "16px"}}/>
                    <p style={{display: 'inline'}} > Delivery to: {dictData["SLocation"]}</p>
                </div>

                <div style={{margin: "8px"}} >
                    <img src = {SquareIcon  } alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    <p style={{display: 'inline'}} > Delivery time: {dictData["ShipmentTime"]}</p>
                </div>
            </div>
       </main>
    );
};

export default CargoOnTruckItem;