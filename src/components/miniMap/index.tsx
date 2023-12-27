import { useCallback, useMemo, useState } from 'react'
import { useEventHandlers } from '@react-leaflet/core'
import {
  MapContainer,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet'

import { LatLng } from "leaflet";

import { MinimapControlProps, MinimapBoundsProps } from '../../@types/components'


const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }


function MinimapBounds({ parentMap, zoom }: MinimapBoundsProps) {
  const minimap = useMap()



  const onClick = useCallback(
    (e: { latlng: LatLng }) => {
      parentMap.setView(e.latlng, parentMap.getZoom())
    },
    [parentMap],
  )
  useMapEvent('click', onClick)


  const [bounds, setBounds] = useState(parentMap.getBounds())
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds())
    minimap.setView(parentMap.getCenter(), zoom)
  }, [minimap, parentMap, zoom])


  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])

  useEventHandlers({
    instance: parentMap, context: {
      __version: 1,
      map: parentMap,

    },
  }, handlers)

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}


export default function MinimapControl({ position, zoom }: MinimapControlProps) {
  const parentMap = useMap()
  const mapZoom = zoom || 0


  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 100, width: 100 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [],
  )

  const positionClass = (position && POSITION_CLASSES.topright)

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  )
}