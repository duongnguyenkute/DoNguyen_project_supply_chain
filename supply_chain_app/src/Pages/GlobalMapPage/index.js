import { useLoadScript } from "@react-google-maps/api";
import GlobalMap from "../../components/GlobalMap";
// import { MapContainer } from "../../components/GlobalMapsAPI";
import WrappedMapContainer from "../../components/GlobalMapsAPI";

export default function GlobalMapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "" // Add your API key
  });
  return isLoaded ? <WrappedMapContainer /> : null;
}