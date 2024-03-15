import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

interface ClearLayersProps {
    clear: boolean;
    setClear: React.Dispatch<boolean>;
}

const ClearLayers = ({ clear, setClear }: ClearLayersProps) => {

    const map = useMap();


    useEffect(() => {
        if (clear) {
            map.eachLayer((layer) => {
                if (layer.options.layers?.includes('geonode') || layer.options.layers === ('BDIA:gpc_pedo')) {

                    map.removeLayer(layer);
                }
                if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
                    map.removeLayer(layer);
                }
            });



            map.setView([-10.333333, -53.2], 4);

            setClear(false);
        }
    }, [clear, map, setClear]);



    return null;
}

export default ClearLayers;
