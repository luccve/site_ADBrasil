import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface ClearLayersProps {
    clear: boolean;
    setClear: React.Dispatch<boolean>;
}

const ClearLayers = ({ clear, setClear }: ClearLayersProps) => {

    const map = useMap();

    useEffect(() => {
        if (clear) {
            map.eachLayer((layer) => {
                if (layer.options.layers?.includes('geonode')) {

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