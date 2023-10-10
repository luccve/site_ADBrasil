import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
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
import ModalAlert from '../../components/modal/modalAlert';
import { InfoUmProps } from '../../@types/components';


const Map = () => {

    const [infoMapa, setInfoMapa] = useState(false);
    const [message, setMessage] = useState<string | InfoUmProps>('');
    const [modal, setModal] = useState<Boolean>(false);
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const [layersAdd, setLayersAdd] = useState<string[]>([`https://geoinfo.cnpa.embrapa.br/geoserver/gwc/service/gmaps?layers=geonode:pluv_pe_2&zoom={z}&x={x}&y={y}&format=image/png8`]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [center, setCenter] = useState<[number, number]>([-12.1, -46.2]);
    const tileStreet = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSattelite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const [_info, setInfo] = useState<WFSObject>({});
    const [layer, setLayer] = useState<string>(tileStreet);
    const [zoom, setZoom] = useState<number>(4);


    const icon = new DivIcon({
        html: renderToString(<div className='text-4xl text-[#000]'><TiLocation /></div>),
        iconAnchor: [18, 20],
        className: 'marker'

    })

    const icon2 = new DivIcon({
        html: renderToString(<div className='text-4xl text-[#bf4b4b]'><TiLocation /></div>),
        iconAnchor: [18, 20],
        className: 'marker'

    })

    const ListeningEventsMaps = () => {

        useMapEvents({
            click(e) {

                setPosition(e.latlng);
                // map.setZoomAround(e.latlng, 8);
                SetQuery(e.latlng);
                setInfoMapa(true);
            },




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


    const SetQuery = (latLng: LatLng) => {
        const { lat, lng } = latLng;
        const url = `https://geoinfo.cnpa.embrapa.br/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Apluv_pe_2&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature&CQL_FILTER=INTERSECTS%28the_geom%2CPOINT%28${lng}%20${lat}%29%29`;
        fetchQuery(url);
        setMessage({
            cidade: _info.NM_MUNICIP,
            classe_solo: _info.ABR?.toString(),
            cod_um: _info.CD_GEOCODM?.toString(),
            id_um: _info.JUL?.toString(),
            lat: _info.NM_MUNICIP,
            lng: _info.NM_MUNICIP,
            relevo: _info.NM_MUNICIP,
            texture: _info.NM_MUNICIP,
            valor_ad: _info.NM_MUNICIP
        })
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

    };



    let mapKey = position ? center.join('_') : 'default';



    return (
        <>
            <div className='min-h-screen min-w-screen grid place-self-center'>
                <div className='z-1 relative'>

                    <ModalAlert message={message} onClose={setInfoMapa} visible={infoMapa} title={'Unidade de Mapeamento Selecionada'} />

                    <MemoizedMapContainer
                        mapKey={mapKey}
                        center={center}
                        zoom={zoom}
                        layer={layer}
                    >

                        {userLocation && <Marker icon={icon2} position={userLocation}>
                        </Marker>}
                        {/* {geoData && <GeoJSON bubblingMouseEvents data={geoData} />} */}
                        <ListeningEventsMaps />
                        {layersAdd.map((item, index) => {
                            return <TileLayer key={index * Math.random() * 0.2} url={item} />
                        })}

                        {/* {<WMSTileLayer
                            layers='CREN:PD_ORDEM'
                            format='image/png'
                            transparent
                            url='https://geoservicos.ibge.gov.br/geoserver/CREN/wms?service=WMS'
                            // layers='geonode:brasil_ad_solos_v5'
                            // url='http://geoinfo.cnps.embrapa.br/geoserver/wms?'
                            version='1.1.0'
                            crs={CRS.EPSG4326}
                            tileSize={512}
                            tms

                        />} */}

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

                    </div>

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
