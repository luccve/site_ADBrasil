import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import icon from "../icon";

interface handlePositionProps {
    close: boolean;
}

const HandlePositionMap: React.FC<handlePositionProps> = ({ close }: handlePositionProps) => {

    const [position, setPosition] = useState<LatLngExpression | null>(null);


    useMapEvents(
        {
            click(e: LeafletMouseEvent) {

                const { lat, lng } = e.latlng;
                close ?
                    setPosition(null) : setPosition([lat, lng])
            },
        });


    return position && close ? <Marker position={position} icon={icon} /> : null;
};

export default HandlePositionMap;
