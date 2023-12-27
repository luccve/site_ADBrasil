import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { MdPlace } from "react-icons/md";
import ReactDOMServer from "react-dom/server";
import Icon from "../icon";

const GetPosition = () => {
  const map = useMap();
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map || iconRef.current) return;

    const info = L.DomUtil.create('div', 'legend');
    L.DomEvent.disableClickPropagation(info);

    iconRef.current = info;
    iconRef.current.style.cursor = 'pointer';

    iconRef.current.style.backgroundColor = 'white';
    iconRef.current.style.padding = '10px';
    iconRef.current.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
    iconRef.current.style.fontStretch = 'normal';
    iconRef.current.style.borderRadius = '5px';
    const iconHtml = ReactDOMServer.renderToString(
      <MdPlace style={{ fontSize: '25px', color: 'black' }} />
    );
    iconRef.current.innerHTML = iconHtml;

    const positionControl = L.Control.extend({
      options: {
        position: 'topleft'
      },

      onAdd: function () {
        // Verifica se iconRef.current não é null antes de adicionar o evento
        if (iconRef.current) {

          iconRef.current.addEventListener('click', handleIconClick);
        }
        return iconRef.current as HTMLElement;
      },
      onRemove: function () {
        if (iconRef.current) {
          iconRef.current.removeEventListener('click', handleIconClick);
          
        }
      },
    });

    map.addControl(new positionControl());

    // Função para lidar com o clique no ícone
    function handleIconClick() {
      // Verifica se o navegador suporta a geolocalização
      try {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;

            map.flyTo([latitude, longitude], 10);

            // Adiciona o marcador com o ícone personalizado
            const userMarker = L.marker([latitude, longitude], { icon: Icon }).addTo(map);
            userMarker.bindPopup("Sua geolocalização").openPopup();
            
            const positionControl = L.Control.extend({
              options: {
                position: 'topleft'
              },

              onAdd: function () {
                return iconRef.current as HTMLElement;
              }
            });

            map.addControl(new positionControl());

          },
          (error: GeolocationPositionError) => {
            console.error(`Erro ao obter a posição do usuário: ${error.message}`);
          }
        );
      } catch (error) {
        console.error("Geolocalização não suportada pelo navegador.", error);
      }
    }




  }, [map]);

  return null;
};

export default GetPosition;
