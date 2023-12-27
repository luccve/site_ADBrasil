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

    useMapEvents({
        click(e: LeafletMouseEvent) {
            setLoading(true);
            const { lat, lng } = e.latlng;
            fetchCoords(lat, lng);

            setPosition([lat, lng]);
        },
    });

    async function fetchCoords(lat: number, lng: number) {
        const response = await RequestCoordsService.fetchCoords(lat, lng);
        if (context && context.setContext) {
            if (response?.resposta == 500) {

                context.setContext({});
            } else if (response?.resposta == 200) {
                context.setContext(response);
            }
        }

    }

    return position === null ? null : (
        <Marker icon={icon} position={position} />
    );
};

export default MapEvents;
