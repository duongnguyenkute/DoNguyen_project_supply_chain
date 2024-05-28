import React from 'react';
import "./GoodsItem.css"
import { LuDollarSign } from "react-icons/lu";
import { useState } from 'react';
import PriceIcon from "./price_img.png";
import OnStockIcon from "./stock_img.png";

const GoodsItem = ({ data }) => {
    const dictData = {...data};
    const [modalState, setModalState] = useState("modal display-none")
    const [quantity, setQuantity] = useState()
    const [quantityRemaining, setQuantityRemaining] = useState(dictData["Count"])
    const [isDisabled, setIsDisabled] = useState(false);

    const goodsIconData = {
        "Coca-Cola": <img  width="64" height="64" src="https://img.icons8.com/cotton/64/cola.png" alt="cola"/>,
        "Hat" : <img width="64" height="64" src="https://img.icons8.com/emoji/48/top-hat-emoji.png" alt="top-hat-emoji"/>,
        "Shoes": <img width="64" height="64" src="https://img.icons8.com/color/48/pair-of-sneakers.png" alt="pair-of-sneakers"/>,
        "T-Shirt" : <img width="64" height="64" src="https://img.icons8.com/dusk/64/t-shirt.png" alt="t-shirt"/>,
        "Dress": <img width="64" height="64" src="https://img.icons8.com/color/48/wedding-dress.png" alt="wedding-dress"/>

    }
    console.log(goodsIconData[dictData["goodsname"]])
    return (
       <main>
            <div className={modalState}>
                    <section className="modal-main-store">
                        <h1>Place Order</h1>
                        <div className='modal-content'>
                            <div  className='p-text modal-row-goods-item'>
                                <div className='modal-col-four'>
                                    {goodsIconData[dictData["goodsname"]]}
                                </div>
                                <div className='modal-col-half'>
                                    <p className='p-text p-bold' style={{    lineHeight: "53.48px"}}>{dictData["goodsname"]}</p>
                                </div>
                            </div>
                            
                            <div className='p-text modal-row-goods-item mt-16'>
                                <div className='modal-col-four'>
                                    <p className='p-text p-bold'>Remaining</p>
                                </div>
                                <div className='modal-col-half'>
                                    <p className='p-text '>{quantityRemaining}</p>
                                </div>
                            </div>
                            <div className='p-text modal-row-goods-item mt-16'>
                                <div className='modal-col-four' >
                                    <p  className='dollar-container p-text p-bold'>Price</p>
                                </div>
                                <div className='modal-col-half'>
                                    <p className='p-text'>{dictData["Price"]}</p>
                                    <LuDollarSign className='dollar-container'/>

                                </div>
                            </div>

                            <div className='p-text modal-row-goods-item' style={{ margin: '16px 0px'}}>
                                <div className='modal-col-four' >
                                    <p  className='dollar-container p-text p-bold'>Quantity</p>
                                </div>
                                <div className='modal-col-half'>
                                    <input style={{padding: "8px", marginLeft: "16px"}} type="text " placeholder='Enter Quantity!' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            

                        </div>
                        <div className='modal-button-container'>
                            <button style={{padding: "8px" , width: "90px", marginRight: "44px"}} type="button" onClick={()=>{
                                setModalState("modal display-none")
                            }}>
                            Close
                            </button>
                            <button style={{padding: "8px" , width: "90px", marginLeft: "44px"}} type="button" onClick={()=>{
                                        fetch('http://127.0.0.1:8000/order-goods?goods_storeroom_id=' + dictData['dtId'] +'&remaining=' + (quantityRemaining - quantity)+'&price=' + dictData["Price"] )
                                            .then((respone)=>{
                                            console.log(respone)
                                            setModalState("modal display-none")
                                            setQuantityRemaining( quantityRemaining - quantity )
                                            });
                                    
                                }}>
                                    Confirm
                            </button>
                            
                        </div>
                    </section>
                </div>
            <div key={dictData["key"]} className={quantityRemaining  === 0 ?'goods-item-contain-disabled' : 'goods-item-contain' } onClick={()=>{
                console.log("Clicked!")
                if (quantityRemaining  !== 0){
                    setModalState("modal display-block")
                }
            }}>
                {goodsIconData[dictData["goodsname"]]}
                <p >Name: {dictData["goodsname"]}</p>

                <div style={{margin: "8px"}} >
                    <img src = {OnStockIcon} alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    <p style={{display: 'inline'}} >On Stock: {quantityRemaining}</p>
                </div>
                <div className='dollar-container'>
                    <img src = {PriceIcon} alt='Price Img' style={{width: "16px", height: "16px"}}/>
                    <p  style={{display: 'inline'}}>Price: {dictData["Price"]}</p>
                    <LuDollarSign className='dollar-container'/>
                </div>
                <div>
                    {quantityRemaining ===0 && <p style={{color: "blue", padding: "0px", borderRadius: "17px",  background: "red"}}>Empty</p>}
                </div>
            </div>
       </main>
    );
};

export default GoodsItem;