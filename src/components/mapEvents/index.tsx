import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useState, useContext } from "react";
import { ContextMap } from "../../contexts";

import { Marker, useMapEvents } from "react-leaflet";
import icon from "../icon";

import RequestCoordsService from "../../services";

interface MapEventsProps {
    setLoading: React.Dispatch<boolean>;
}

const MapEvents: React.FC<MapEventsProps> = ({ setLoading }: MapEventsProps) => {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const context = useContext(ContextMap);

    async function delayedFunction() {
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    async function fetchCoords(lat: number, lng: number) {
        try {
            const response = await Promise.race([RequestCoordsService.fetchCoords(lat, lng), delayedFunction()]);

            if (context && context.setContext) {
                if (response?.resposta === 500) {
                    context.setContext({});
                } else if (response?.resposta === 200) {
                    context.setContext(response);
                    setPosition([lat, lng]);
                } else {
                    context.setContext({});
                }
            }
        } catch (err) {
            alert(err);
        } 
    }

    useMapEvents({
        click(e: LeafletMouseEvent) {
            const { lat, lng } = e.latlng;
            setLoading(true);
            setPosition([lat, lng]);
            fetchCoords(lat, lng);
        },
    });

    return position === null ? null : <Marker icon={icon} position={position} />;
};

export default MapEvents;
