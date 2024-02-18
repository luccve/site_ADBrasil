
import { CRS } from "leaflet"
import {
    LayerGroup,
    LayersControl,
    TileLayer,
    WMSTileLayer
} from "react-leaflet"




export default function TilerLayersMapControl() {

    return (


        <LayersControl position="topleft" sortLayers={true}>

            <LayerGroup>
                <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>



                <LayersControl.BaseLayer name="Nat Geo Relevo">
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

    )
}