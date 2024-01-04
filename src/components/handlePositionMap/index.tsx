import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import icon from "../icon";


const HandlePositionMap: React.FC = () => {

    const [position, setPosition] = useState<LatLngExpression | null>(null);


    useMapEvents(
        {
            click(e: LeafletMouseEvent) {

                const { lat, lng } = e.latlng;

                setPosition([lat, lng]);
            },
        });


    return position ? <Marker position={position} icon={icon} /> : null;
};

export default HandlePositionMap;
