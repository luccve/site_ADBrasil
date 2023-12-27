import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';




const GetCoordinates = () => {
  const map = useMap();
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map || infoRef.current) return;

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
        position: 'bottomleft'
      },

      onAdd: function () {
        return infoRef.current as HTMLElement;
      }
    });

    map.on('mousemove', (e) => {
      
      if (infoRef.current) {
        infoRef.current.textContent = `Lat: ${e.latlng.lat.toFixed(4)} | Long: ${e.latlng.lng.toFixed(4)}`;
      }
    });

  

    map.addControl(new positionControl());

  }, [map]);

  return null;
}

export default GetCoordinates;
