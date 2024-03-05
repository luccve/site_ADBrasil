import { LatLngLiteral, LatLngExpression } from "leaflet";
import { useContext, useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import icon from "../icon";
import { ContextMap } from "../../contexts";
import RequestCoordsService from "../../services";

interface handlePositionProps {

    coords: LatLngLiteral | null;
    setLoading: React.Dispatch<boolean>;
    setLayer: React.Dispatch<React.SetStateAction<string>>
}

const LatLngRender: React.FC<handlePositionProps> = ({ coords, setLoading, setLayer }: handlePositionProps) => {
    const context = useContext(ContextMap);
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const map = useMap();
    const [marker, setMarker] = useState<JSX.Element | null>(null);


    async function fetchCoords(lat: number, lng: number) {
        try {
            const response = await RequestCoordsService.fetchCoords(lat, lng);

            if (context && context.setContext) {
                if (response?.resposta === 500) {
                    context.setContext({});
                } else if (response?.resposta === 200) {
                    context.setContext(response);
                    setLayer("Estimativa de água disponível (EMBRAPA)")

                } else {
                    context.setContext({});
                }
            }
        } catch (err) {
            alert(err);
        } finally {
            setLoading(true)
        }
    }

    useEffect(() => {
        if (coords) {

            setPosition([coords?.lat, coords?.lng])
            map.flyTo([coords?.lat, coords?.lng], 5)

            setMarker(
                <Marker position={[coords?.lat, coords?.lng]} icon={icon} />
            )
            fetchCoords(coords?.lat, coords?.lng)
            return
        }
        setMarker(null)
        return

    }, [coords])

    return position ? marker : null;
};

export default LatLngRender;
