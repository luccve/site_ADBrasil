import { CRS } from "leaflet";
import { WMSTileLayer, useMap } from "react-leaflet";
import type { WMSFilterProps } from "../../@types/components";
import { useContext, useEffect, useState } from "react";
import { ContextMap } from "../../contexts";

const WMSFilter: React.FC<WMSFilterProps> = ({ Opacity, setLayer }: WMSFilterProps) => {
    const [wmsLayer, setWmsLayer] = useState<JSX.Element | null>(null);
    const context = useContext(ContextMap);
    const [mapRender, setmapRender] = useState(false);
    const map = useMap();


    useEffect(() => {
        setmapRender(false);
        if (context?.filterWMS) {
            const { field, operator, value, layer } = context?.filterWMS;
            const wmsLayerElement = (
                <WMSTileLayer
                    format='image/png'
                    transparent
                    layers={layer}
                    url={`https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true&titulo=&CQL_FILTER=${field} ${operator} ${value}`}
                    version='1.3.0'
                    crs={CRS.EPSG3857}
                    tileSize={256}
                    tms={true}
                    updateInterval={2000}
                    pane='overlayPane'
                    updateWhenIdle={true}
                    keepBuffer={10}
                    opacity={Opacity}
                    attribution="EMBRAPA"
                />
            );
            setWmsLayer(wmsLayerElement);

            setLayer('Estimativa de água disponível (EMBRAPA)')
            setTimeout(() => {
                setmapRender(true);
                map.eachLayer((layer) => {

                    if (layer.options.layers?.includes('geonode') || layer.options.layers?.includes('BDIA')) {
                        map.removeLayer(layer)
                    }
                });
            }, 1000);
            map.setView([-10.333333, -53.2], 4);
        } else {
            setWmsLayer(null);
        }


    },
        [context?.filterWMS?.operator, context?.filterWMS?.value, context?.filterWMS?.operator, context?.filterWMS?.layer, Opacity]);



    return mapRender && wmsLayer;
}

export default WMSFilter;
