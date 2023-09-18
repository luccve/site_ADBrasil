import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"

import { MdOutlineGpsFixed } from 'react-icons/md';
import { FiLayers } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiLocation } from 'react-icons/ti';
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, DivIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

import ModalComponente from '../../components/modal/modalComponente';


const Map = () => {

    const [modal, setModal] = useState<Boolean>(false);
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [center, setCenter] = useState<[number, number]>([-12.1, -46.2]);
    const tileStreet = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSattelite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const [layer, setLayer] = useState<string>(tileStreet);
    const [zoom, setZoom] = useState<number>(4);
    const icon = new DivIcon({
        html: renderToString(<div className='text-4xl text-[#000]'><TiLocation /></div>),
        iconAnchor: [18, 20],
        className: 'marker'

    })

    const LocationMarker = () => {

        const map = useMapEvents({
            click(e) {

                setPosition(e.latlng);

                map.setZoomAround(e.latlng, 8);
            },
            dblclick(e) {

                setPosition(e.latlng);
                toggleModal();
            }


        });

        return position === null ? null : (
            <Marker icon={icon} position={position} />
        );
    }

    const handlePosition = () => {

        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCenter([latitude, longitude]);
                setZoom(8);
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

    const ZoomMap = () => {
        const { lat, lng } = position as { lat: number, lng: number };
        setCenter([lat, lng]);
        setZoom(8);
    };


    const toggleModal = () => {
        if (position) {

      
            setTimeout(() => {
                ZoomMap();

                const timer = setInterval(ZoomMap, 500);

              
                clearInterval(timer);
            }, 500);


        }
        setModal(!modal);

    };

    const clearMarker = () => {
        setPosition(null);
        setUserLocation(null);
        setZoom(4);
        setCenter([-12.1, -46.2]);

    }


    let mapKey = position ? center.join('_') : 'default';



    return (
        <>
            <div className='relative h-screen'>
                <div className='z-1'>

                    <MemoizedMapContainer
                        mapKey={mapKey}
                        center={center}
                        zoom={zoom}
                        layer={layer}
                    >

                        {userLocation && <Marker icon={icon} position={userLocation}>
                        </Marker>}
                        <LocationMarker />
                    </MemoizedMapContainer>


                    {/* <MapContainer fadeAnimation={true} tap={true} key={mapKey} style={{ width: '100%', height: '100vh', zIndex: 0 }} center={userLocation ? userLocation : center} zoom={zoom} scrollWheelZoom={true}>
                        <TileLayer

                            url={layer}
                        />
                        {userLocation && <Marker position={userLocation}>
                        </Marker>}
                        <LocationMarker />

                    </MapContainer> */}
                </div>

                {/* AreaBTN */}
                <div className='absolute w-auto top-20 left-1 flex flex-col max-md:flex-row rounded-xl bg-blue 
                   max-md:top-10 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 z-50
                '>

                    <button className=' h-[35px] z-20 text-white p-2 m-2 ' onClick={handlePosition}>
                        <MdOutlineGpsFixed className='hover:scale-125 hover:text-white text-xl' />
                    </button>
                    <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={toggleLayer}>
                        <FiLayers className='hover:scale-125 hover:text-white text-xl' />
                    </button>
                    <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={clearMarker}>
                        <AiOutlineClear className='hover:scale-125 hover:text-white text-xl' />
                    </button>
                    <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={toggleModal}>
                        <AiOutlineSearch className='hover:scale-125 hover:text-white text-xl' />
                    </button>
                </div>


                {modal &&
                    <ModalComponente coords={position} title='Digite as coordenadas do ponto que será selecionada no mapa, as coordenadas estão na projeção 3857 Web Mercator'
                        latLong={setPosition} onClose={toggleModal} />}
            </div>

        </>

    );

}


const MemoizedMapContainer: React.FC<{
    mapKey: string;
    center: [number, number];
    zoom: number;
    layer: string;
    children: React.ReactNode;
}> = React.memo(({ mapKey, center, zoom, layer, children }) => (
    <MapContainer
        fadeAnimation={true}
        tap={true}
        key={mapKey}
        style={{ width: '100%', height: '100vh', zIndex: 1 }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
    >
        <TileLayer url={layer} />
        {children}
    </MapContainer>
));



export default Map;
