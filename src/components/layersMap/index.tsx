import { CRS } from "leaflet"
import {
    LayersControl,
    TileLayer,
    WMSTileLayer,

} from "react-leaflet"




export default function LayersMap() {
    return (


        <LayersControl position="topleft" sortLayers={true}>


            <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>



            <LayersControl.BaseLayer name="Nat Geo World Map">
                <TileLayer
                    attribution="Nat Geo World Map"
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
                <TileLayer
                    attribution="Google Satellite Hybrid"
                    url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="Google Maps">
                <TileLayer
                    attribution="Google Maps"
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Roads">
                <TileLayer
                    attribution="Google Roads"
                    url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
                />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay name="Estimativa de água disponível">
                <WMSTileLayer

                    format='image/png'
                    transparent
                    layers='0'
                    url='https://geoportal.sgb.gov.br/server/services/pronasolos/agua_disponivel/MapServer/WMSServer?&tiled=true&titulo=&'
                    version='1.1.0'
                    crs={CRS.EPSG3857}
                    tileSize={256}
                    tms={true}
                    updateInterval={2000}
                    pane='overlayPane'
                    updateWhenIdle={true}
                    keepBuffer={10}

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

                />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Vegetação Brasil">
                <WMSTileLayer

                    format='image/png8'
                    transparent
                    layers='CREN:vegetacao_radambrasil'
                    url='https://geoservicos.ibge.gov.br/geoserver/CREN/wms?'
                    version='1.0.0'
                    crs={CRS.EPSG3857}
                    tileSize={256}
                    tms={true}
                    updateInterval={2000}
                    pane='overlayPane'
                    updateWhenIdle={true}
                    keepBuffer={10}

                />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Potencialidades agrícolas">
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

                />
            </LayersControl.Overlay>
        </LayersControl>

    )
}