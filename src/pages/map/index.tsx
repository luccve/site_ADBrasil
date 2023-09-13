import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import 'leaflet/dist/leaflet.css'



const Map = () => {

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);



    const hancleClick = () => {

        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
            },
            error => {
                console.error(error.message);
            }
        );
    };





    const mapKey = userLocation ? userLocation.join('_') : 'default';

    return (
        <>
            <button className='absolute w' onClick={hancleClick}>Minha localização</button>
            <MapContainer fadeAnimation={true} tap={true} key={mapKey} style={{ width: '1280px', height: '100vh' }} center={userLocation ? userLocation : [-12.1, -46.2]} zoom={4} scrollWheelZoom={true}>
                <TileLayer

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {userLocation && <Marker position={userLocation}>
                    <Popup>
                        Você está aqui!
                    </Popup>
                </Marker>}

            </MapContainer>
        </>

    );

}

export default Map;
