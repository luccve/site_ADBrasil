import { LeafletMouseEvent } from "leaflet";
import { useContext } from "react";
import { ContextMap } from "../../contexts";

import {useMapEvents } from "react-leaflet";
import type { MapEventsProps } from "../../@types/components";

import RequestCoordsService from "../../services";



const MapEvents: React.FC<MapEventsProps> = ({ setLoading, setLayer }: MapEventsProps) => {
    const context = useContext(ContextMap);

    async function fetchCoords(lat: number, lng: number) {
        try {
            const response = await RequestCoordsService.fetchCoords(lat, lng);

            if (context && context.setContext) {
                if (response?.resposta === 500) {
                    context.setContext({});
                } else if (response?.resposta === 200) {
                    context.setContext(response);
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
                setLayer(e.name)

            }



        });

    return null;
};

export default MapEvents;
