
import {
    LayerGroup,
    LayersControl,
    TileLayer
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
            </LayerGroup>



        </LayersControl>

    )
}