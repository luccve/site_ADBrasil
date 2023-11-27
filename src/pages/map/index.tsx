import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents, GeoJSON, WMSTileLayer } from "react-leaflet"

import { MdOutlineGpsFixed } from 'react-icons/md';
import { FiLayers } from 'react-icons/fi';
import { AiOutlineClear } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiLocation } from 'react-icons/ti';
import { LatLngExpression, DivIcon, LatLng, CRS } from 'leaflet';
import { renderToString } from 'react-dom/server';


import ModalComponente from '../../components/modal/modalComponente';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import ModalAlert from '../../components/modal/modalAlert';
import { InfoUmProps } from '../../@types/components';

import 'leaflet/dist/leaflet.css'


const Map = () => {

    const [color_geoData, setColor_geoData] = useState<string>('#000');
    const [infoMapa, setInfoMapa] = useState(false);
    const [message, setMessage] = useState<string | InfoUmProps>('');
    const [modal, setModal] = useState<Boolean>(false);
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    // const [layersAdd, setLayersAdd] = useState<string[]>([`https://geoinfo.cnpa.embrapa.br/geoserver/gwc/service/gmaps?layers=geonode:pluv_pe_2&zoom={z}&x={x}&y={y}&format=image/png8`]);
    const [layersAdd, _setLayersAdd] = useState<string[]>([`https://geoportal.sgb.gov.br/server/rest/services/pronasolos/agua_disponivel/MapServer?`]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [center, setCenter] = useState<[number, number]>([-12.1, -46.2]);
    const tileStreet = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileSattelite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const [layer, setLayer] = useState<string>(tileStreet);
    const [zoom, setZoom] = useState<number>(4);
    const [geoData, setGeoData] = useState<any>({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [1, 1],
        },
        "properties": {
            "name": "Dinagat Islands"
        }
    });

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
                setGeoData(null);
                setPosition(e.latlng);
                // map.setZoomAround(e.latlng, 8);
                SetQuery(e.latlng);
                // setZoom(e.sourceTarget._animateToZoom);
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

    function changeColor(ad: number | null) {
        const colorRanges = [
            { min: 1.84, max: Infinity, color: "#8500A8" },
            { min: 1.4, max: 1.84, color: "#005CE6" },
            { min: 1.06, max: 1.4, color: "#00C4FF" },
            { min: 0.8, max: 1.06, color: "#37A800" },
            { min: 0.61, max: 0.8, color: "#4DE600" },
            { min: 0.46, max: 0.61, color: "#FFAB00" },
            { min: 0.34, max: 0.46, color: "#FFFF73" },
            { min: -Infinity, max: 0.34, color: "#9C9C9C" },
        ];

        let newAd = Number(ad);
        if (newAd === null) {
            return "transparent";
        }

        let colorRange = colorRanges.find(
            (range) => range.min <= newAd && newAd <= range.max
        );
        return colorRange ? colorRange.color : "transparent";
    }

    const toggleLayer = () => {

        setLayer(layer == tileStreet ? tileSattelite : tileStreet);

    };

    const ZoomMap = () => {
        const { lat, lng } = position as { lat: number, lng: number };
        setCenter([lat, lng]);
        setZoom(8);
    };




    const SetQuery = async (latLng: LatLng) => {

        const { lat, lng } = latLng;
        // const url = `https://geoinfo.cnpa.embrapa.br/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Apluv_pe_2&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature&CQL_FILTER=INTERSECTS%28the_geom%2CPOINT%28${lng}%20${lat}%29%29`;
        const url = `https://geoportal.sgb.gov.br/server/rest/services/pronasolos/agua_disponivel/MapServer/0/query?f=json&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&geometry={"x": ${lng}, "y": ${lat}, "spatialReference": {"wkid": 4326}}&outFields=ordem,subordem,grande_gru,subgrupos,textura,horizonte,relevo,total_ad,legad,objectid_1&outSR=4326&tolerance=10`;
        await fetchQuery(url, lat, lng);

    };

    const fetchQuery = async (url: string, lat: number, lng: number) => {
        try {
            let object = await fetch(url, { method: 'GET' });

            await object.json().then((response) => {

                setColor_geoData(changeColor(response.features[0].attributes.total_ad));
                if (response.features[0].attributes.total_ad > 0) {
                    setMessage({
                        ID: response.features[0].attributes.objectid_1,
                        Ordem: response.features[0].attributes.ordem,
                        Subordem: response.features[0].attributes.subordem,
                        Textura: response.features[0].attributes.textura,
                        AD: `${response.features[0].attributes.total_ad} mm/cm`,
                        Relevo: response.features[0].attributes.relevo,

                        Latitude: Number(lat.toPrecision(5)),
                        Longitude: Number(lng.toPrecision(5))
                    })
                } else {
                    setMessage({
                        ID: response.features[0].attributes.objectid_1,
                        Ordem: response.features[0].attributes.ordem,
                        Latitude: Number(lat.toPrecision(5)),
                        Longitude: Number(lng.toPrecision(5))
                    })
                }
                setGeoData(
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [response.features[0].geometry.rings],
                        },
                        "properties": {
                            "name": "Dinagat Islands"
                        }
                    }
                );



            })




        } catch (error) {
            setMessage('Selecione a área exata do estado');
        } finally {
            setInfoMapa(true);
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
        // setLayersAdd([]);

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
                        {geoData &&

                            <GeoJSON bubblingMouseEvents data={geoData}
                                style={{ color: color_geoData, weight: 1, fillOpacity: 1 }}
                            />
                        }
                        <ListeningEventsMaps />

                        {layersAdd.map((item, index) => {
                            return <TileLayer key={index * Math.random() * 0.2} url={item} />
                        })}

                        {<WMSTileLayer
                            
                            format='image/png8'
                            transparent
                            layers='0'
                            url='https://geoportal.sgb.gov.br/server/services/pronasolos/agua_disponivel/MapServer/WMSServer?'
                            version='1.1.0'
                            crs={CRS.EPSG3857}
                            tileSize={1024}
                            tms
                            

                        />}




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
