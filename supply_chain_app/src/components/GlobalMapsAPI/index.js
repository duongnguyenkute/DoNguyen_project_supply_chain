import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline, InfoWindow } from 'google-maps-react';
import warehouse from './warehouse.png';
import truck from './truck.png'
import storeroom from './storeroom.png'
import SiteBar from '../SiteBar';
import { SpinnerDotted } from 'spinners-react';
import WareHouseItem from '../WareHouseItem';

const googleApi = ""; // Thay thế bằng khóa API thực tế của bạn

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twinData: [],
      selectedMarker: null, // Khởi tạo state để lưu trữ dữ liệu từ API
    };
  }

  componentDidMount() {
    // Gọi API để lấy dữ liệu
    fetch('http://127.0.0.1:8000/select-all-twin')
      .then(response => response.json())
      .then(data => {
        // Lưu dữ liệu vào state
        this.setState({ twinData: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { twinData, selectedMarker } = {...this.state};
    console.log("selected Marker == nulll", selectedMarker === null)
    if (twinData.length === 0 ){
      return (
        <div style={{width: window.innerWidth - 0.1* window.innerWidth, paddingTop: "16px"}}>
          <SpinnerDotted/>
          <p style={{fontSize: "26px"}}>Loading data</p>
        </div>
      )
    }
    var warehouse_trucks = []
    var storeroom_list = []
    var ware_marker
    var modal_marker
    

    if(twinData.length != 0){
      warehouse_trucks = twinData["waretruck"]
      storeroom_list = twinData["storerooms"]

      ware_marker = warehouse_trucks.map((element1, index) =>{
        return <Marker
          position={{ lat: element1['wLatiture'], lng: element1["wLongtiture"] }}
          icon={{
            url: warehouse,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
          onClick={() => {
            element1['Latiture'] = element1['wLatiture']
            element1['Longtiture'] = element1["wLongtiture"]
            console.log("Clicked!")
            this.setState({selectedMarker : element1})
        }}/>
    } )

    var storeroom_marker = storeroom_list.map((element1, index) =>{
      return <Marker
        position={{ lat: element1['Latiture'], lng: element1["Longtiture"] }}
        icon={{
          url: storeroom,
          scaledSize: new window.google.maps.Size(30, 30)
        }}
        onClick={() => {
          this.setState({selectedMarker : element1})
      }}/>
    })
    var truck_marker = warehouse_trucks.map((element1, index) =>{
      return <Marker
        position={{ lat: element1['tLatiture'], lng: element1["tLongtiture"] }}
        icon={{
          url: truck,
          scaledSize: new window.google.maps.Size(30, 30)
        }}
        onClick={() => {
          element1['Latiture'] = element1['tLatiture']
          element1['Longtiture'] = element1["tLongtiture"]
          this.setState({selectedMarker : element1})
      }}/>
    })
    }
    
    return (
      <div className='container'>
        <SiteBar data={{ Page: "Global Map" }} />
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 21.02450,
            lng: 105.84117
          }}
          containerStyle={{ width: window.innerWidth - 120, height: window.innerHeight-120, top: '120px', left: '120px' }}
        >
          {ware_marker}
          {truck_marker}
          {storeroom_marker}

        </Map>
      </div>
    );
  }
}
const WrappedMapContainer = GoogleApiWrapper({
  apiKey: googleApi
})(MapContainer);

export default WrappedMapContainer;
