import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import SiteBar from "../SiteBar";
import warehouse from "./warehouse.png"; // Make sure this image is available

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 }
  }
];

function GlobalMap() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (markerId) => {
    setActiveMarker(markerId);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <div>
      <SiteBar data={{ Page: "Global Map" }} />
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: window.innerWidth - 120, height: window.innerHeight-120, top: '120px', left: '120px' }}
      >
        {markers.map(({ id, name, position }) => {
          return (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          )
        })}
      </GoogleMap>
    </div>
  );
}

export default GlobalMap;
