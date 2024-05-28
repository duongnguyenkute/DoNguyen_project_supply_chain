import SiteBar from "../../components/SiteBar";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPlaceOrderFWhouse.css"
import { useState, useEffect } from "react";
import OrderItemFromWarehouse from "../../components/OrderItemFromWareHouse";


function ResultPlaceOrderFWhouse(){
    const navigate = useNavigate()
    const location = useLocation();
    const listData = location.state
    console.log("List Data", listData)
    const [isMounted, setIsMouted] = useState(false)
    const [listResultOrder, setListResultOrder] = useState([])

    const [resultItems, setResultItems] = useState([]);
    let tempListResultOrder = []
    let a

    async function fetchData(item) {
        const { GoodsID, Count, StoreroomID, GoodsName, Quantity } = item;
        try {
            const response = await fetch(`http://127.0.0.1:8000/test-order-from-warehouse?StoreRoomID=${StoreroomID}&GoodsID=${GoodsID}&Count=${Count}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            tempListResultOrder.push({ data, GoodsName, Count, Quantity });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    
    async function fetchAllData(listData) {
        for (const item of listData) {
            await fetchData(item);
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        setResultItems(tempListResultOrder.map((element, index) => {
            if (index % 2 === 0) {
                return <OrderItemFromWarehouse key={index} data={element} />;
            }
            return null; // Skip odd indices
        }));
        setListResultOrder(tempListResultOrder.filter((element, index) => index % 2 === 0));
    }
    
    useEffect(() => {
        fetchAllData(listData);
        console.log("resultItems", tempListResultOrder)
    }, []);

    
    return (
        <div>
            <SiteBar data={{"Page": "Order Result"}} />
            <div className="list-result-container" >
            {resultItems}
            </div>
            <div className="order-apply-container">
                <button className="order-apply-button" onClick={()=>{
                    console.log('Clicked')
                    const requestData = JSON.stringify({"data": listResultOrder })

                    console.log(requestData)

                    fetch('http://127.0.0.1:8000/process_item', {
                        method: 'POST', // Thay đổi phương thức thành POST
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                          },
                        body: requestData,
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // setListStoreRoom(data);
                        // setIsMouted(true);
                        console.log("fetch Susscessfull")
                        console.log(data);
                        // console.log(dictData['$dtId'])
                        const data_state = { '$dtId': data['StoreroomID']};
                        console.log(data_state)
                        navigate("/goods-items-data", { state: data_state });
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            //    console.log(JSON.stringify(listResultOrder))
                }}>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ResultPlaceOrderFWhouse