import { LeafletMouseEvent } from "leaflet";
import { useContext } from "react";
import { ContextMap } from "../../contexts";

import { useMap, useMapEvents } from "react-leaflet";
import type { MapEventsProps } from "../../@types/components";

import RequestCoordsService from "../../services";



const MapEvents: React.FC<MapEventsProps> = ({ setLoading, setLayer }: MapEventsProps) => {
    const context = useContext(ContextMap);
    const map = useMap();
    const layers = ["geonode:adbrasil_b0f18f25e5eac580ec58488ae35e3918"]

    async function fetchCoords(lat: number, lng: number) {
        try {
            const response = await RequestCoordsService.fetchCoords(lat, lng);

            if (context && context.setContext) {
                if (response?.resposta === 500) {
                    context.setContext({});
                } else if (response?.resposta === 200) {
                    context.setContext(response);
                    setLayer("Estimativa de água disponível (EMBRAPA)")
                    if (response.region == "AL") {
                        map.eachLayer((layer) => {
                            setLayer("Alagoas AD (EMBRAPA)")
                            if (layer.options.layers == "geonode:adbrasil" || layer.options.layers == "BDIA:gpc_pedo"
                                || layer.options.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });

                    } else if (response.region == "PB") {
                        map.eachLayer((layer) => {
                            setLayer("ZONPB AD (EMBRAPA)")
                            if (layer.options.layers == "geonode:adbrasil" || layer.options.layers == "BDIA:gpc_pedo"
                                || layer.options.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });
                    } else if (response.region == "SP") {
                        map.eachLayer((layer) => {
                            setLayer("São Paulo AD (EMBRAPA)")
                            if (layer.options.layers == "geonode:adbrasil" || layer.options.layers == "BDIA:gpc_pedo"
                                || layer.options.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });
                    }



                } else {
                    context.setContext({});
                }
            }
        } catch (err) {
            alert(err);
        }
    }





    useMapEvents(
        {
            click(e: LeafletMouseEvent) {
                setLoading(true);
                const { lat, lng } = e.latlng;
                fetchCoords(lat, lng);



            },
            overlayadd(e) {
                setLayer(e.name);



            },
            layeradd(e) {

                if (context?.centroides && e.layer.options.layers) {
                    const { lat, lng } = context.centroides;
                    const cod = context.filter;
                    const verify = layers.includes(e.layer.options.layers)
                    if (verify) {
                        map.eachLayer((layer) => {

                            if (layer.options.layers == "geonode:adbrasil" || layer.options.layers == "BDIA:gpc_pedo"
                                || layer.options.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });

                        const z = Number(cod) ? 10 : 6
                        map.flyTo([lat, lng], z);
                    }
                }
            }
        });

    return null;
};

export default MapEvents;
