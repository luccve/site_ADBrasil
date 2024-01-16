
import NavMap from '../../components/navMap';
import ModalMap from '../../components/modal/ModalMap';
import MinimapControl from '../../components/miniMap';
import GeoJSONMap from '../../components/GeoJSONMap';
import GetCoordinates from '../../components/getCoordinates';
import LayersMap from '../../components/TilerLayersMapControl';
import MapEvents from '../../components/mapEvents';
import { MapContainer, ScaleControl } from 'react-leaflet';
import { useContext, useEffect, useRef, useState } from 'react';
import GetPosition from '../../components/getPosition';
import { ContextMap } from '../../contexts';
import HandlePositionMap from '../../components/handlePositionMap';
import OpacitySliderMap from '../../components/opacitySliderMap';
import WMSTileLayersControl from '../../components/WMSTileLayersControl';
import GetLegendsMaps from '../../components/getLegendsMaps';


const MapPage = () => {

    const [modal, setModal] = useState(false);
    // const [ability, setAbility] = useState(false);
    const [message, setMessage] = useState({});
    const [title, seTitle] = useState("Clique no Mapa!")
    const context = useContext(ContextMap)
    const mapContainerRef = useRef(null);
    const [elementOpacity, setElementOpacity] = useState<number>(1);
    const [layer, setLayer] = useState("Estimativa de água disponível");

    useEffect(() => {

        if (context) {

            setMessage({

                AD: `${context.ad_um} mm/cm`,
                Ordem: context.c1_class,
                Relevo: context.c1_relevo,
                Textura: context.textura_c1,
                Latitude: context.Latitude,
                Longitude: context.Longitude,
                Componente_1: ` ${context.solo_c1} _Textura: ${context.textura_c1} _Relevo: ${context.c1_relevo}\n _Valor de AD: ${context.ad_c1}`,
                Componente_2: ` ${context.solo_c2} _Textura: ${context.textura_c2} _Relevo: ${context.c2_relevo}\n _Valor de AD: ${context.ad_c2}`,
                Componente_3: ` ${context.solo_c3} _Textura: ${context.textura_c3} _Relevo: ${context.c3_relevo}\n _Valor de AD: ${context.ad_c3}`,
                Componente_4: ` ${context.solo_c4} _Textura: ${context.textura_c4} _Relevo: ${context.c4_relevo}\n _Valor de AD: ${context.ad_c4}`,
                Componente_5: ` ${context.solo_c5} _Textura: ${context.textura_c5} _Relevo: ${context.c5_relevo}\n _Valor de AD: ${context.ad_c5}`,
            });
            seTitle("Unidade de mapeamento")
        }

    }, [context?.ad_um, modal]);

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
                {!modal && <MapEvents setLayer={setLayer} setLoading={setModal} />}
                <MinimapControl position={[0, 0]} zoom={2} />
                <GetCoordinates />
                <GetPosition />
                <WMSTileLayersControl Opacity={elementOpacity} />
            </MapContainer>
            <GetLegendsMaps layer={layer} />
            {modal && <ModalMap message={message} onClose={setModal} visible={modal} title={title} />}
        </div>

    );

}


export default MapPage;
