
import { MapContainer, ScaleControl } from "react-leaflet"
import React from "react";
import { MapProps } from "../../@types/components";

const MemoizedMapContainer: React.FC<MapProps> = React.memo(({ mapKey, center, zoom, children, ref }) => (


    (<MapContainer
        fadeAnimation={true}
        tap={true}
        key={mapKey}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={ref}

    >

        <ScaleControl position="topleft" imperial={false} />
        {children}
    </MapContainer>)
));


export default MemoizedMapContainer;