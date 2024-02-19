import { extend, Map, LatLng } from "leaflet";
import type { MyContextProps, van_genuchtenProps } from "./data";
import { Dispatch } from "react";

export interface CarrouselRegionProps {
    Array: ListaRegionsProps[];
    onSelect: React.Dispatch<React.SetStateAction<number | null | string>>;
    title: string;
    initialPosition: number | null;
}

export interface ListaRegionsProps {
    label: string;
}

export interface ListaTabsProps {
    type: string;
    name: string;
    tab: number;
}


export interface CarrouselTabs {
    onSelect: React.Dispatch<React.SetStateAction<T>>;
    Array: ListaTabsProps[];
}

export interface PTFttypes {
    type: number | null | string;
    region?: number | null | string;
    tab: number | null | string;

}

export interface ResultadoPTFProps {
    type: number;
    region: number;
    ptf: Array[number] | number;
    author: string;
    cc?: string;
    unidade?: string;
    AD?: number;
    funcionamento?: string;
    autoria: string;
    url: string;
    titulo: string;
    parametros: string;
    inputProps: string[];
    curva: string;
}


export interface ModalAlertProps {
    message?: string | Object;
    title?: string;
    visible: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    localStorage?: ()=>void;
}

export interface BtnLinkProps {
    Title: string;
    Path: string;
}

export interface BtnRegularProps {
    Title: string;
    Path?: string;
    handleClick: () => void;
    children?: React.ReactNode;
}
export interface InputTextProps {
    Title: string;
    handleFocus: () => void;
    handleBlur: () => void;
    handleTextChange: (state: React.Dispatch<React.SetStateAction<string>>, e: EventTarget & HTMLInputElement) => void;
    state: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

export interface CharLineProps<T> extends van_genuchtenProps {
    setSelectedData?: React.Dispatch<React.SetStateAction<T | null>>;
}

export interface BtnToggleArrowProps {
    pin: boolean;
    togglePin: () => void;
}

export interface CardListProps {
    ArrayTitle: T[];
    ArrayRes: T[];
}

export type InfoUmProps = {
    Ordem?: string;
    Subordem?: string;
    Textura?: string;
    AD?: string;
    'Água disponível'?: string;
    ID?: number;
    Relevo?: string;
    Latitude?: number;
    Longitude?: number;


}

export interface MapProps {
    mapKey: string;
    center: [number, number];
    zoom: number;

    children?: ReactNode;
    ref?: any;
}



interface MinimapControlProps {
    position: number[];
    zoom: number

}


interface MinimapBoundsProps {
    parentMap: Map
    zoom: number
}



interface MapEventsProps {
    setLoading: React.Dispatch<boolean>;
    setLayer: React.Dispatch<string>;
}

interface LayersMapProps {
    Opacity: number,

}

interface GetLegendsMapsProps {
    layer: string;
}

interface BtnLinkProps {
    Title: string;
    Path: string;
}