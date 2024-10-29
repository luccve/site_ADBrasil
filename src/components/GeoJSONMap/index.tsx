import { useContext, useEffect, useState } from "react";
import { ContextMap, } from "../../contexts";
import { GeoJSON } from "react-leaflet";
import type { GeoJSON as GJtypes } from "../../@types/data";
import { LayersMapProps } from "../../@types/components";

const GeoJSONMap: React.FC<LayersMapProps> = ({ Opacity }: LayersMapProps) => {


    const [data, setData] = useState<GJtypes | any>(null);
    const [color, setColor] = useState<string>('transparent');
    const [loading, setLoading] = useState(false);
    const context = useContext(ContextMap);

    async function delayedFunction() {


        await new Promise(resolve => setTimeout(resolve, 1300));
        setLoading(true);

    }



    useEffect(() => {
        setLoading(false);

        if (context && context.geojson && context.color) {

            setData(context.geojson);
            setColor(context.color);
        } else {
            setData(null);
            setColor('transparent');
        }

        delayedFunction()

    }, [context?.geojson]);
    const uniqueKey = context?.geojson ? JSON.stringify(context.geojson) : "no-data";

 
    return (
        <> <div key={uniqueKey}>{loading && (
            <GeoJSON
                data={data}
                style={{ fillColor: color, color: "#000", weight: 1, fillOpacity: Opacity }}
            />
        )}</div></>
    );
}

export default GeoJSONMap;
