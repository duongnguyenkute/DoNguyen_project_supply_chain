import SiteBar from "../../components/SiteBar"
import GlobalMapPage from "../GlobalMapPage"
function WorldMapPage(){
    return (
        <div>
            <SiteBar data = {{"Page": "Global Map"}}/>
            <GlobalMapPage/>
        </div>
    )
}

export default WorldMapPage