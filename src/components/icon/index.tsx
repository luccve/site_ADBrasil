import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { TiLocation } from "react-icons/ti";

const Icon = new DivIcon({
    html: renderToString(<div className='text-4xl text-[#000]'><TiLocation /></div>),
    iconAnchor: [18, 20],
    className: 'marker',
    
});

export default Icon;