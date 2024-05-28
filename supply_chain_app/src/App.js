
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import SiteBar from './components/SiteBar';
import RetailDataPage from './Pages/RetailDataPage';
// import HomePage from './Pages/HomePage';
import GoodsItemPage from './Pages/GoodsItemPage';
import TruckShipmentPage from './Pages/TruckShipmentPage';
import WareHousePage from './Pages/WareHousePage';
import GoodsInWareHouse from './Pages/GoodsInWareHouse';
// import WorldMapPage from './Pages/WorldMapPage';
import GlobalMapPage from './Pages/GlobalMapPage';
// import { MapContainer } from './components/GlobalMapsAPI';
import OrderFromWarehousePage from './Pages/OrderFromWarehousePage';
import ResultPlaceOrderFWhouse from './Pages/ResultPlaceOrderFWhouse';
import CargoOnTruckShipment from './Pages/CargoOnTruckShipment';
// import LoadingData from './components/LoadingData';
// import GlobalMapPage from './Pages/GlobalMapPage';
// import GlobalMap from './components/GlobalMap';
function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path= '/' element={<GlobalMapPage/>}/>
        <Route path= '/Retail-data' element = {<RetailDataPage/>}/>
        {/* <Route path='/home-page' element= {<HomePage/>}/> */}
        <Route path='/goods-items-data' element= {<GoodsItemPage/>}/>
        <Route path="/truckshipment-page" element = {<TruckShipmentPage/>}/>
        <Route path="/warehouse-page" element = {<WareHousePage/>}/>
        <Route path='/goods-in-warehouse' element= {<GoodsInWareHouse/>}/> 
        {/* <Route path="/Global-mapv2" element={<GlobalMapPage/>} /> */}
        <Route path="/Global-map" element={<GlobalMapPage/>} />
        <Route path= "/order-from-warehouse" element  = {<OrderFromWarehousePage/>} />
        <Route path='/result-place-order-from-whouse' element = {<ResultPlaceOrderFWhouse/>} />
        <Route path='/cargo-on-truck' element = {<CargoOnTruckShipment/>} />
        
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
