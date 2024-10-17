import L, { LeafletMouseEvent } from "leaflet";
import { useContext } from "react";
import { ContextMap } from "../../contexts";

import { useMap, useMapEvents } from "react-leaflet";
import type { MapEventsProps } from "../../@types/components";

import RequestCoordsService from "../../services";
import { ComplexLayer } from "../../@types/data";



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
                            const camada = layer.options as ComplexLayer;
                            setLayer("Alagoas AD (EMBRAPA)")
                            if (camada.layers as string == "geonode:adbrasil" || camada.layers == "BDIA:gpc_pedo"
                                || camada.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });

                    } else if (response.region == "PB") {
                        map.eachLayer((layer) => {
                            const camada = layer.options as ComplexLayer;
                            setLayer("ZONPB AD (EMBRAPA)")
                            if (camada.layers == "geonode:adbrasil" || camada.layers == "BDIA:gpc_pedo"
                                || camada.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });

                    } else if (response.region == "SP") {
                        map.eachLayer((layer) => {
                            const camada = layer.options as ComplexLayer;
                            setLayer("São Paulo AD (EMBRAPA)")
                            if (camada.layers == "geonode:adbrasil" || camada.layers == "BDIA:gpc_pedo"
                                || camada.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
                                map.removeLayer(layer)
                            }
                        });
                    } else if (response.region == "PE") {
                        map.eachLayer((layer) => {
                            const camada = layer.options as ComplexLayer;
                            setLayer("Pernambuco AD (EMBRAPA)")
                            if (camada.layers == "geonode:adbrasil" || camada.layers == "BDIA:gpc_pedo"
                                || camada.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45") {
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
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker || layer instanceof L.GeoJSON) {
                        map.removeLayer(layer);
                    }
                });

            },
            layeradd(e) {
                const camada1 = e.layer.options as ComplexLayer;
                if (context?.centroides && camada1.layers) {
                    const { lat, lng } = context.centroides;
                    const cod = context.filter;

                    const verify = layers.includes(camada1.layers)
                    if (verify) {
                        map.eachLayer((layer) => {
                            const camada = layer.options as ComplexLayer;
                            if (camada.layers == "geonode:adbrasil" || camada.layers == "BDIA:gpc_pedo"
                                || camada.layers == "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45" ||
                                camada.layers == "geonode:ad_98a8dcca664f761f5546492208425b3c") {
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
