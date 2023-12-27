
import NavMap from '../../components/navMap';
import ModalMap from '../../components/modal/ModalMap';
import MinimapControl from '../../components/miniMap';
import GeoJSONMap from '../../components/GeoJSONMap';
import GetCoordinates from '../../components/getCoordinates';
import LayersMap from '../../components/layersMap';
import MapEvents from '../../components/mapEvents';
import { MapContainer, ScaleControl, } from 'react-leaflet';
import { useContext, useEffect, useState } from 'react';
import GetPosition from '../../components/getPosition';
import { Map } from 'leaflet';
import { MyContextProps } from '../../@types/data';
import { ContextMap } from '../../contexts';
const MapPage = () => {

    const [_map, _setMap] = useState<Map | null>(null);
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState<MyContextProps>({});
    const context = useContext(ContextMap)
    useEffect(() => {
        if (context){

            setMessage({
                ID: context.ID,
                AD: context.AD,
                Ordem: context.Ordem,
                Subordem: context.Subordem,
                Relevo: context.Relevo,
                Textura: context.Textura,
                Latitude: context.Latitude,
                Longitude: context.Longitude,
            });
        }
        
    }, [context?.AD, modal]);

    return (
        <div className={` flex items-center overflow-y-hidden h-screen relative bg-white`}>
            {<NavMap />}

            <MapContainer
                fadeAnimation={true}
                tap={true}
                style={{ width: '100%', height: '100%', zIndex: 0 }}
                center={[-10.333333, -53.2]}
                zoom={4}
                scrollWheelZoom={false}
            >

                <ScaleControl position="bottomleft" imperial={false} />
                <LayersMap />
                <GeoJSONMap />
                {!modal && <MapEvents setLoading={setModal} />}
                <MinimapControl position={[0, 0]} zoom={2} />
                <GetCoordinates />
                <GetPosition />
            </MapContainer>

            {modal && <ModalMap message={message} onClose={setModal} visible={modal} title='Unidade de Mapeamento' />
            }
        </div>

    );

}


export default MapPage;
