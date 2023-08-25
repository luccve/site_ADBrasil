import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import 'leaflet/dist/leaflet.css'

export type MapContainerProps = {
    width: string,
    height: string
}

const Map = ({ width, height }: MapContainerProps) => {

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            error => {
                console.error(error.message);
            }
        );
    }, []);





    const mapKey = userLocation ? userLocation.join('_') : 'default';

    return (

        <MapContainer key={mapKey} style={{ width: width, height: height }} center={userLocation ? userLocation : [-12.1, -46.2]} zoom={4} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && <Marker position={userLocation}>
                <Popup>
                   Você está aqui!
                </Popup>
            </Marker>}

        </MapContainer>

    );

}

export default Map;
