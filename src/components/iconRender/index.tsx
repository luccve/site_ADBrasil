import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { TbZoomInAreaFilled } from "react-icons/tb";

const IconRender = new DivIcon({
    html: renderToString(<div className='text-4xl text-[#000000]'><TbZoomInAreaFilled /></div>),
    iconAnchor: [18, 20],
    className: 'marker',

});

export default IconRender;