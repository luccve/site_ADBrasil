import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { ComplexLayer } from "../../@types/data";
interface ClearLayersProps {
    clear: boolean;
    setClear: React.Dispatch<boolean>;
}


const ClearLayers = ({ clear, setClear }: ClearLayersProps) => {

    const map = useMap();

    function isComplexLayer(layer: any) {
        const camada = layer.options as ComplexLayer;
        if (camada.layers) {
            return true
        }
        return false
    }


    useEffect(() => {
        if (clear) {

            map.eachLayer((layer) => {

                if (isComplexLayer(layer)) {
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
