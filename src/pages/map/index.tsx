
import NavMap from '../../components/navMap';
import ModalMap from '../../components/modal/ModalMap';
import MinimapControl from '../../components/miniMap';
import GeoJSONMap from '../../components/GeoJSONMap';
import GetCoordinates from '../../components/getCoordinates';
import LayersMap from '../../components/TilerLayersMapControl';
import MapEvents from '../../components/mapEvents';
import { MapContainer, ScaleControl } from 'react-leaflet';
import { useRef, useState } from 'react';
import GetPosition from '../../components/getPosition';

import HandlePositionMap from '../../components/handlePositionMap';
import OpacitySliderMap from '../../components/opacitySliderMap';
import WMSTileLayersControl from '../../components/WMSTileLayersControl';
import GetLegendsMaps from '../../components/getLegendsMaps';
import SearchClip from '../../components/SearchClip';
import ModalSearch from '../../components/modal/modalSearch';



const MapPage = () => {

    const [modal, setModal] = useState(false);
    const mapContainerRef = useRef(null);
    const [elementOpacity, setElementOpacity] = useState<number>(1);
    const [layer, setLayer] = useState("Estimativa de água disponível");
    const [valueWMSMap, setValue] = useState<string | null>(null);
   
    const [close, onClose] = useState(false);

    return (
        <div className={`flex items-center overflow-y-hidden h-screen relative bg-white`}>
            {<NavMap >
                <OpacitySliderMap setOpacity={setElementOpacity} />
            </NavMap>}

            <MapContainer
                fadeAnimation={true}
                tap={true}
                style={{ width: '100%', height: '100%', zIndex: 0 }}
                center={[-10.333333, -53.2]}
                zoom={4}
                scrollWheelZoom={true}
                ref={mapContainerRef}
            >

                <HandlePositionMap close={modal} />
                <ScaleControl position="bottomleft" imperial={false} />
                <LayersMap />
                <GeoJSONMap />
                <SearchClip opacity={elementOpacity} valueWMSMap={valueWMSMap} search={onClose} />
                {!modal && <MapEvents setLayer={setLayer} setLoading={setModal} />}
                <MinimapControl position={[0, 0]} zoom={2} />
                <GetCoordinates />
                <GetPosition />

                <WMSTileLayersControl Opacity={elementOpacity} />
            </MapContainer>
            <GetLegendsMaps layer={layer} />
            <ModalSearch onValue={setValue} close={close} onClose={onClose} />
            {modal && <ModalMap onClose={setModal} visible={modal} />}
        </div>

    );

}


export default MapPage;
