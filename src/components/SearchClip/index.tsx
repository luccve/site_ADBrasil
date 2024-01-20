import L, { CRS } from "leaflet";
import { useEffect, useRef } from "react";

import { TbZoomInAreaFilled } from "react-icons/tb";
import { createRoot } from "react-dom/client";
import { WMSTileLayer, useMap } from "react-leaflet";

interface SearchClip {
  search: React.Dispatch<boolean>;
  valueWMSMap: string | null;
  opacity: number;
}

const SearchClip = ({ search, valueWMSMap, opacity }: SearchClip) => {
  const map = useMap();
  const infoRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<any | null>(null);


  const IconComponent = ({ handleClick }: any) => (
    <button onClick={handleClick}>
      <TbZoomInAreaFilled className={'text-4xl hover:opacity-70 hover:scale-125 max-md-text-sm'} />
    </button>
  );



  useEffect(() => {
    if (!map || infoRef.current || rootRef.current) return;

    const info = L.DomUtil.create('div', 'legend');
    L.DomEvent.disableClickPropagation(info);

    infoRef.current = info;

    infoRef.current.style.backgroundColor = 'white';
    infoRef.current.style.fontSize = '12px';
    infoRef.current.style.padding = '5px';
    infoRef.current.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
    infoRef.current.style.fontStretch = 'normal';
    infoRef.current.style.borderRadius = '5px';

    const positionControl = L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: function () {
        return infoRef.current as HTMLElement;
      }
    });


    const handleClick = () => {
      search(true);

    };

    map.on('mousemove', () => {
      if (infoRef.current) {
        if (!rootRef.current) {
          rootRef.current = createRoot(infoRef.current);
        }
        rootRef.current.render(<IconComponent handleClick={handleClick} />);
      }
    });




    map.addControl(new positionControl());


    return () => {
      if (infoRef.current && rootRef.current) {
        rootRef.current.unmount();
      }

    };

  }, [map]);

  return (
    valueWMSMap ? <WMSTileLayer

      format='image/png'
      transparent
      layers='geonode:adbrasil_b0f18f25e5eac580ec58488ae35e3918'
      url={`https://geoinfo.dados.embrapa.br/geoserver/ows?SERVICE=WMS&REQUEST=GetMap&TILED=true&access_token=1M2RzHPj2f6WCNqPmNv2xTvCM713ax&cql_filter=sigla_uf LIKE '${valueWMSMap}'`}
      version='1.3.0'
      crs={CRS.EPSG3857}
      tileSize={256}
      tms={true}
      updateInterval={2000}
      pane='overlayPane'
      updateWhenIdle={true}
      keepBuffer={10}
      opacity={opacity}
    />
      : null)
};

export default SearchClip;
