import SiteBar from "../../components/SiteBar"
import { useEffect, useState } from "react"
import './CargoOnTruckShipment.css'
import GoodsItem from "../../components/GoodsItem"
import { useLocation } from "react-router-dom";
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from "react-router-dom";
import CargoOnTruckItem from "../../components/CargoOnTruckItem";
import FindIcon from './find.png'

function CargoOnTruckShipment(){
    const navigator = useNavigate()
    const location = useLocation();
    let dictData = location.state;
    let [listGoodsItems, setListGoodsItems] = useState([]);
    let [isMounted, setIsMouted]  = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const[selectedCount, setSelectedCount] = useState(0)
    const [billDetails, setBillDetails]  = useState([])

    const handleChildChange = (isSelected, data_item) => {
        setSelectedCount((prevCount) => prevCount + (isSelected ? 1 : -1));
        console.log("is Selected data item: ", data_item)
          
          const targetBillDetailID = data_item.BillDetailID;
          
          // Tìm vị trí của phần tử có BillDetailID tương ứng
          const index = billDetails.findIndex(detail => detail.BillDetailID === targetBillDetailID);
          
          if (index !== -1) {
            // Nếu tìm thấy, xóa phần tử khỏi mảng
            billDetails.splice(index, 1);
            setBillDetails(billDetails)
          } else {
            // Ngược lại, thêm phần tử vào mảng
            billDetails.push({...data_item
            });
            setBillDetails(billDetails)
          }
          
          console.log("billDetails: ", billDetails);
          

      };
    // const handleChildOnClick = (isSelected, data_item) =>{
    //     console.log("is Selected data item: ", data_item)
    // }
    // const retrievedData = localStorage.getItem('myData');
    // const parsedData = JSON.parse(retrievedData);
    useEffect(() => {
        if(!isDataLoaded){
            var mounted = true;
                fetch('http://127.0.0.1:8000/get-shipment-storeroom-info?truckshipment_id=' + dictData["TruckShipmentID"] + "&storeroom_location=" + dictData["StoreroomLocation"])
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setListGoodsItems(data)
                    setIsMouted(true)
                    setIsDataLoaded(true);
                    console.log(data)
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            
            return () => mounted = false;
        }
      }, [isDataLoaded]);
    let a;
    if(isMounted == true){
        console.log('List Goods Items: ')
        console.log(listGoodsItems)
        a = listGoodsItems.map((element1, index) =>{
            element1["key"] = index;

            return (<div>
                 <CargoOnTruckItem data= {element1} handleChildChange={ handleChildChange}/> 
            </div>)
        } )
        console.log(a)
    }
    var loadingData = <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
                            <SpinnerDotted/>
                            <p style={{fontSize: "26px"}}>Loading data</p>
                        </div>
    return(
        <div>
            <SiteBar data= {{'Page': "Cargo on the truck"}}/>
            <div className="cargo-item-container">
                {a} 
            </div>
            <div className="storeroom-input-type-location">
                <img style={{width: '24px', height: "24px", marginLeft: "8px", background: "#fff", padding: '4px 8px'}} src={FindIcon} alt="find icon" onClick={()=>{
                    let inputElement = document.getElementById("find-truck-by-location")

                    dictData["StoreroomLocation"] = inputElement.value
                    setSelectedCount(0)
                    setIsDataLoaded(false)
                    // localStorage.setItem('myData', JSON.stringify({"TruckShipmentID": dictData["TruckShipmentID"],"StoreroomLocation": inputElement.value }));
                    // window.location.reload()
                }}/>

                <input id="find-truck-by-location" style={{padding: "4px 8px"}} placeholder="Enter Storeroom Location!"/>
                {/* <div>
                    <p>{selectedCount}</p>
                </div> */}
            </div>
            <div style={{position: "fixed", top: "120px", right: "20px"}}>
                <p>Selected: {selectedCount}</p>
                <button onClick={()=>{

                    let sended_data = JSON.stringify({"data": billDetails})
                    console.log("Sended data: ",sended_data)
                    fetch('http://127.0.0.1:8000/confirm-cargo-list', {
                        method: 'POST', // Thay đổi phương thức thành POST
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                          },
                        body: sended_data,
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("fetch Susscessfull")
                        console.log(data);
                        setIsDataLoaded(false)
                        setSelectedCount(0)
                        setBillDetails([])
                        
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
                }}>
                Confirm!
                </button>
            </div>
        </div>
    )

}

export default CargoOnTruckShipment