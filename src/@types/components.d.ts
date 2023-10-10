import { extend } from "leaflet";
import type { van_genuchtenProps } from "./data";

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


interface ModalAlertProps {
    title?: string;
    message: InfoUmProps | string;
    visible: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BtnLinkProps {
    Title: string;
    Path: string;
}

interface BtnRegularProps {
    Title: string;
    Path?: string;
    handleClick: () => void;
    children?: React.ReactNode;
}
interface InputTextProps {
    Title: string;
    handleFocus: () => void;
    handleBlur: () => void;
    handleTextChange: (state: React.Dispatch<React.SetStateAction<string>>, e: EventTarget & HTMLInputElement) => void;
    state: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

interface CharLineProps<T> extends van_genuchtenProps {
    setSelectedData?: React.Dispatch<React.SetStateAction<T | null>>;
}

interface BtnToggleArrowProps {
    pin: boolean;
    togglePin: () => void;
}

interface CardListProps {
    ArrayTitle: T[];
    ArrayRes: T[];
}

type InfoUmProps = {
    cidade?: string;
    cod_um?: string;
    id_um?: string;
    texture?: string;
    relevo?: string;
    classe_solo?: string;
    lat?: string;
    lng?: string;
    valor_ad?: string;

}
