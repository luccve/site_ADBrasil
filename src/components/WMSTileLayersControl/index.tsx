import { CRS } from "leaflet"
import {
    LayerGroup,
    LayersControl,
    WMSTileLayer,
} from "react-leaflet"

import type { LayersMapProps } from "../../@types/components"


export default function WMSTileLayersControl({ Opacity }: LayersMapProps) {

    
    return (


        <LayersControl position="bottomright" sortLayers={true} collapsed={false}  >

            <LayerGroup>

                <LayersControl.Overlay name="Estimativa de água disponível (SGB - 1 Aproximação)"
                >
                    <WMSTileLayer

                        format='image/png'
                        transparent
                        layers='0'
                        url='https://geoportal.sgb.gov.br/server/services/pronasolos/agua_disponivel/MapServer/WMSServer?&tiled=true&titulo=&styles&bgcolor=white'
                        version='1.1.0'
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

                <LayersControl.Overlay name="Potencial de terras para irrigação"
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

                <LayersControl.Overlay name="Estimativa de água disponível (EMBRAPA - 2 Aproximação)"
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



                <LayersControl.Overlay name="Mapa de solos do Brasil">
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

                <LayersControl.Overlay name="Biomas do Brasil">
                    <WMSTileLayer

                        format='image/png'
                        transparent
                        layers='CREN:lm_bioma_250'
                        url='https://geoservicos.ibge.gov.br/geoserver/CREN/wms?&tiled=true&titulo=&'
                        version='1.0.0'
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
                {/* <LayersControl.Overlay name="Vegetação Brasil">
                    <WMSTileLayer

                        format='image/png8'
                        transparent
                        layers='CREN:vegetacao_radambrasil'
                        url='https://geoservicos.ibge.gov.br/geoserver/CREN/wms?&tiled=true&titulo=&'
                        version='1.0.0'
                        crs={CRS.EPSG3857}
                        tileSize={256}
                        tms={true}
                        updateInterval={2000}
                        pane='overlayPane'
                        updateWhenIdle={true}
                        keepBuffer={10}
                        opacity={Opacity}
                    />
                </LayersControl.Overlay> */}

                {/* <LayersControl.Overlay name="Potencialidades agrícolas">
                    <WMSTileLayer

                        format='image/png'
                        transparent
                        layers='CREN:potencialidade_agricola'
                        url='https://geoservicos.ibge.gov.br/geoserver/CREN/wms?&tiled=true&titulo=&'
                        version='1.0.0'
                        crs={CRS.EPSG3857}
                        tileSize={256}
                        tms={true}
                        updateInterval={2000}
                        pane='overlayPane'
                        updateWhenIdle={true}
                        keepBuffer={10}
                        opacity={Opacity}
                    />
                </LayersControl.Overlay> */}
            </LayerGroup>


        </LayersControl>

    )
}