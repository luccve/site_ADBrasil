
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
import ClearLayers from '../../components/clearLayers';
import HandlePositionMap from '../../components/handlePositionMap';
import OpacitySliderMap from '../../components/opacitySliderMap';
import WMSTileLayersControl from '../../components/WMSTileLayersControl';
import GetLegendsMaps from '../../components/getLegendsMaps';
import SearchClip from '../../components/SearchClip';
import ModalSearch from '../../components/modal/modalSearch';
import ModalAlert from '../../components/modal/modalAlert';
import WMSFilter from '../../components/WMSFilter';


const MapPage = () => {
    const [alert, setAlert] = useState(true);
    const [modal, setModal] = useState(false);
    const mapContainerRef = useRef(null);
    const [elementOpacity, setElementOpacity] = useState<number>(1);
    const [layer, setLayer] = useState("Estimativa de água disponível");

    const [valueWMSMap, setValue] = useState<string | null>(null);
    const instrucoes = {
        "Camadas": "Os mapas no seu canto inferior direito contém escalas e bases cartograficas diferentes, observe na legenda a escala do mesmo. Por padrão a camada da Estimativa de água disponível do Brasil inicia habilitada.",
        "Funcionalidades": "Este serviço conta com diversas funcionalidades, que estão espalhadas no canto superior esquerdo e na barra de menus na sua direita.",
        "Eventos": "O usuário poderá clicar no mapa que retornará informações da Unidade de Mapeamento do solo, e sobretudo, informações de água disponível e potencial para irrigação de cada componente."
    }
    const [close, onClose] = useState(false);
    const [clearLayers, setClearLayers] = useState(false);

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
                <WMSFilter setLayer={setLayer} Opacity={elementOpacity} />
                <GeoJSONMap Opacity={elementOpacity} />
                <SearchClip opacity={elementOpacity} valueWMSMap={valueWMSMap} onClose={onClose} />
                {!modal && <MapEvents setLayer={setLayer} setLoading={setModal} />}
                <MinimapControl position={[0, 0]} zoom={2} />
                <GetCoordinates />
                <GetPosition />
                <ClearLayers clear={clearLayers}  setClear={setClearLayers}/>
                <WMSTileLayersControl Opacity={elementOpacity} />
            </MapContainer>
            <GetLegendsMaps layer={layer} />
            <ModalSearch handleClear={setClearLayers} onValue={setValue} close={close} onClose={onClose} />
            <ModalAlert onClose={setAlert} message={instrucoes} title='Intruções de uso' visible={alert} />
            {modal && <ModalMap onClose={setModal} visible={modal} />}
        </div>

    );

}


export default MapPage;
