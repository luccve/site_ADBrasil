import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents, } from "react-leaflet"
// import GeoCode from "../../../public/adpe.json";

import { MdOutlineGpsFixed } from 'react-icons/md';
import { FiLayers } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiLocation } from 'react-icons/ti';
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, DivIcon, LatLng } from 'leaflet';
import { renderToString } from 'react-dom/server';


import ModalComponente from '../../components/modal/modalComponente';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { WFSObject } from '../../@types/data';


const Map = () => {

    const [modal, setModal] = useState<Boolean>(false);
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [layersAdd, setLayersAdd] = useState<string[]>([]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [center, setCenter] = useState<[number, number]>([-12.1, -46.2]);
    const tileStreet = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSattelite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const [_info, setInfo] = useState<WFSObject>({});
    const [prefix, setPrefix] = useState('');
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
                // map.setZoomAround(e.latlng, 8);
                SetQuery(e.latlng);
            },



        });

        map.tap

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

    const State = (prefix: string) => {
        const url = `http://geoinfo.cnpa.embrapa.br/geoserver/gwc/service/gmaps?layers=geonode:pluv_${prefix}_2&zoom={z}&x={x}&y={y}&format=image/png8`;
        // setLayersAdd(old => [...old, url]);
        setLayersAdd([url]);
        setPrefix(prefix);
    };

    const SetQuery = (latLng: LatLng) => {
        const { lat, lng } = latLng;
        const url = `http://geoinfo.cnpa.embrapa.br/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Apluv_${prefix}_2&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature&CQL_FILTER=INTERSECTS%28the_geom%2CPOINT%28${lng}%20${lat}%29%29`;



        if (layersAdd[0].split(':')[2].split('_')[1].includes(prefix)) {

            fetchQuery(url);
        }


    };

    const fetchQuery = async (url: string) => {
        try {
            let object = await fetch(url, { method: 'GET' });

            let data = await object.json();

            setInfo(data['features'][0]['properties']);

        } catch (error) {
            alert('Selecione a área exata do estado');
        }


    }


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
        setLayersAdd([]);
        setPrefix('');

    };

    // const transform4326To3857 = (y: number, x: number) => {
    //     const X = 20037508.34;

    //     let long3857 = (x * X) / 180;

    //     let lat3857 = Number(y) + 90;

    //     lat3857 = lat3857 * (Math.PI / 360);
    //     lat3857 = Math.tan(lat3857);
    //     lat3857 = Math.log(lat3857);
    //     lat3857 = lat3857 / (Math.PI / 180);

    //     lat3857 = (lat3857 * X) / 180;

    //     return { lat: Number(lat3857), lng: Number(long3857) };
    // }


    let mapKey = position ? center.join('_') : 'default';



    return (
        <>
            <div className='min-h-screen min-w-screen grid place-self-center'>
                <div className='z-1 relative'>

                    <MemoizedMapContainer
                        mapKey={mapKey}
                        center={center}
                        zoom={zoom}
                        layer={layer}
                    >

                        {userLocation && <Marker icon={icon} position={userLocation}>
                        </Marker>}
                        {/* {geoData && <GeoJSON bubblingMouseEvents data={geoData} />} */}
                        <LocationMarker />
                        {layersAdd.map((item, index) => {
                            return <TileLayer key={index * Math.random() * 0.2} url={item} />
                        })}
                    </MemoizedMapContainer>




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
                        <Link className=' h-[35px] z-20 text-white p-2 m-2' to={"/"}>
                            <HiHome className='hover:scale-125 hover:text-white text-xl' />
                        </Link>
                        <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={() => State('pe')}>
                            <h1>PE</h1>
                        </button>
                        <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={() => State('al')}>
                            <h1>AL</h1>
                        </button>
                        <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={() => State('se')}>
                            <h1>SE</h1>
                        </button>
                        <button className=' h-[35px] z-20 text-white p-2 m-2' onClick={() => State('ba')}>
                            <h1>BA</h1>
                        </button>
                    </div>



                    {/* Info */}
                    {prefix && <div className='absolute w-auto top-20 right-1 flex flex-col max-md:flex-row rounded-xl bg-blue 
                   max-md:top-[90%] max-md:h-[100px] max-md:left-2/3 max-md:transform max-md:-translate-x-2/3 max-md:-translate-y-1/2 z-50
                '>

                        <button className='h-[35px] z-20 text-white p-2 m-2'>
                            <h1 className='hover:scale-125 hover:text-white text-sm font-bold' >{_info.NM_MUNICIP}</h1>
                        </button>

                    </div>}

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
