import { CRS } from "leaflet"
import {
    LayerGroup,
    LayersControl,
    WMSTileLayer,
} from "react-leaflet"

import type { LayersMapProps } from "../../@types/components"
import { useContext, useEffect, useState } from "react"
import { ContextMap } from "../../contexts"

export default function WMSTileLayersControl({ Opacity }: LayersMapProps) {
    const context = useContext(ContextMap);
    
    const [alagoas, setAlagoas] = useState(false);
    const [paraiba, setParaiba] = useState(false);
    const [pernambuco, setPernambuco] = useState(false);
    const [saopaulo, setSaoPaulo] = useState(false);
  

    useEffect(() => {
        if (context?.region === "AL") {
            setAlagoas(true);
            setParaiba(false);
            setPernambuco(false);
            setSaoPaulo(false);
        } else if (context?.region === "PB") {
            setAlagoas(false);
            setParaiba(true);
            setPernambuco(false);
            setSaoPaulo(false);
        } else if (context?.region === "SP") {
            setAlagoas(false);
            setParaiba(false);
            setPernambuco(false);
            setSaoPaulo(true);
        } else if (context?.region === "PE") {
            setPernambuco(true);
            setAlagoas(false);
            setParaiba(false);
            setSaoPaulo(false);
        }
    }, [context?.region])

    return (

        <div id="container-wms" title="Adicione camadas para o mapa">
            <LayersControl position="bottomright" sortLayers={true} >

                <LayerGroup>
                    

                    <LayersControl.Overlay  name="Estimativa de água disponível (EMBRAPA)"
                        checked>
                        <WMSTileLayer
                            
                            format='image/png'
                            transparent
                            layers='geonode:adbrasil'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true&titulo=&'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            styles="geonode:adbrasil"
                            tileSize={256}
                            keepBuffer={10}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            opacity={Opacity}

                        />
                    </LayersControl.Overlay>



                    <LayersControl.Overlay name="Mapa de solos do Brasil (IBGE/EMBRAPA)">
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='BDIA:gpc_pedo'
                            url='https://geoservicos.ibge.gov.br/geoserver/BDIA/wms?service=WMS&tiled=true&titulo=&'
                            version='1.1.1'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}
                        />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Potencial de terras para irrigação (EMBRAPA)"
                    >
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}

                        />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="São Paulo AD (EMBRAPA)"
                        checked={saopaulo}>
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='geonode:saopaulo_ad_4109459bd64ccdddc10e3dfa510cc90b'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}

                        />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Pernambuco AD (EMBRAPA)"
                        checked={pernambuco}>
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='geonode:ad_98a8dcca664f761f5546492208425b3c'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}

                        />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Fernando de Noronha AD (EMBRAPA)"
                        checked={pernambuco}>
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='geonode:fn_10000_ad'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}

                        />
                    </LayersControl.Overlay>



                    <LayersControl.Overlay checked={alagoas} name="Alagoas AD (EMBRAPA)"
                    >
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='geonode:alagoas_ad'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}
                            accessToken="vInDUq9Gt1zuamdmxVbp7VdHymKEY2"

                        />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="ZONPB AD (EMBRAPA)"
                        checked={paraiba}>
                        <WMSTileLayer

                            format='image/png'
                            transparent
                            layers='geonode:paraiba_ad'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane='overlayPane'
                            updateWhenIdle={true}
                            keepBuffer={10}
                            opacity={Opacity}
                            accessToken="vInDUq9Gt1zuamdmxVbp7VdHymKEY2"

                        />
                    </LayersControl.Overlay>




                </LayerGroup>

                <LayerGroup >

                    <LayersControl.BaseLayer name="Unidades Federativas">
                        <WMSTileLayer
                            format='image/png'
                            transparent
                            layers='geonode:estados_br'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}

                            updateWhenIdle={true}
                            keepBuffer={10}

                        />

                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Limites Municipais">
                        <WMSTileLayer
                            format='image/png'
                            transparent
                            layers='geonode:municipio_2020'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}

                            updateWhenIdle={true}
                            keepBuffer={10}

                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Limites de Mesorregiões">
                        <WMSTileLayer
                            format='image/png'
                            transparent
                            layers='geonode:mesorregioes_br'
                            url='https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true'
                            version='1.3.0'
                            crs={CRS.EPSG3857}
                            tileSize={256}
                            tms={true}
                            updateInterval={2000}
                            pane="tilePane"
                            updateWhenIdle={true}
                            keepBuffer={10}

                        />
                    </LayersControl.BaseLayer>
                </LayerGroup>
            </LayersControl>
        </div >
    )
}