import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { MdOutlineGpsFixed } from 'react-icons/md';
import { FiLayers } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css'



const Map = () => {

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const tileStreet = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSattelite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const [layer, setLayer] = useState<string>(tileStreet);


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

    const toggleLayer = () => {

        setLayer(layer == tileStreet ? tileSattelite : tileStreet);

    };




    const mapKey = userLocation ? userLocation.join('_') : 'default';

    return (
        <>
            <div className='relative h-screen'>

                <div className='z-1'>
                    <MapContainer fadeAnimation={true} tap={true} key={mapKey} style={{ width: '100%', height: '100vh', zIndex: 0 }} center={userLocation ? userLocation : [-12.1, -46.2]} zoom={4} scrollWheelZoom={true}>
                        <TileLayer

                            url={layer}
                        />
                        {userLocation && <Marker position={userLocation}>
                            <Popup>
                                Você está aqui!
                            </Popup>
                        </Marker>}


                    </MapContainer>
                </div>
                <div className='absolute w-auto top-20 left-1 flex flex-col rounded-xl bg-turquoise'>

                    <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={hancleClick}>
                        <MdOutlineGpsFixed className='hover:scale-125 hover:text-white text-xl' />
                    </button>
                    <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={toggleLayer}>
                        <FiLayers className='hover:scale-125 hover:text-white text-xl' />
                    </button>
                </div>

            </div>

        </>

    );

}

export default Map;
