//id_solo INTEGER PRIMARY KEY AUTOINCREMENT, sigla_p VARCHAR(2), solo_subordem VARCHAR(100), id_p VARCHAR(2), textura VARCHAR(140), n_camadas VARCHAR(10), media VARCHAR(5), dp VARCHAR(5), cv VARCHAR(5), mediana VARCHAR(5), inter_interq VARCHAR(5), min VARCHAR(5), max VARCHAR(5)

import { LatLng } from "leaflet";

export interface ResultadoPTF {
  type?: number;
  Author: string;
  Result: string;
}

export interface type_table_solo {
  id_solo: string;
  sigla_p: string;
  solo_subordem: string;
  id_p: string;
  textura: string;
  n_camadas: string;
  media: string;
  dp: string;
  cv: string;
  mediana: string;
  inter_interq: string;
  min: string;
  max: string;
}
//id_main INTEGER PRIMARY KEY AUTOINCREMENT, id_p VARCHAR(2), sigla_p VARCHAR(2), solo_subordem VARCHAR(100)
export interface type_table_main {
  id_main: string;
  id_p: string;
  sigla_p: string;
  solo_subordem: string;
}
//id_data INTEGER PRIMARY KEY AUTOINCREMENT, id_um VARCHAR(10), ad_um VARCHAR(5), desc VARCHAR(200), lat VARCHAR(20), long VARCHAR(20), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
export interface type_table_data {
  [x?: string]: any;
  id_data: string;
  id_um: string;
  ad_um: string;
  desc: string;
  lat: string;
  long: string;
  date: string;
}

export interface GeoJSON {
  type?: "FeatureCollection" | "Feature" | string;
  name?: string;
  crs?: {
    type?: string;
    properties?: {
      name?: string;
    };
  };
  features?: {
    type?: "Feature" | string;
    properties?: {
      name: string;
    };
    geometry?: {
      type?: string;
      coordinates?: number[][][];
    };
  }[];
}

export interface van_genuchtenProps {
  alpha: number;
  n: number;
  theta_r: number;
  theta_s: number;
}

export interface describeCPRM {
  id: string;
  description: string;
}

export type curve_props =
  { potencial: number; theta: number }

export type list_props =
  { index: string; theta: number }


export type data_props = {
  ID: string; AD: string; DATA: string; DESC: string; "LATITUDE_EPSG:3857": string; "LONGITUDE_EPSG:3857": string
}

export type perfis = {
  key: string;
  value: string;
  mediana: string;
}

export type SelectInputProps = {
  array: perfis[] | string[] | perfisSubOrdem[] | textura[] | null,
  inputTitle: string,
  onSelect: React.Dispatch<React.SetStateAction<number | null | string>>,
  onValue: React.Dispatch<React.SetStateAction<number | null | string>>,
  onClick: () => void
}


export type perfisSubOrdem = {
  key: string;
  value: string;
  mediana: string;
  classe: string;
}

export interface WFSObject {
  ABR?: number;
  AGO?: number;
  AMJ?: number;
  ASO?: number;
  CD_GEOCODM?: string;
  DEZ?: number;
  DJF?: number;
  FEV?: number;
  FMA?: number;
  ID?: number;
  JAN?: number;
  JAS?: number;
  JFM?: number;
  JJA?: number;
  JUL?: number;
  JUN?: number;
  MAI?: number;
  MAM?: number;
  MAR?: number;
  MAX?: number;
  MIN?: number;
  MJJ?: number;
  N?: number;
  NDJ?: number;
  NM_MUNICIP?: string;
  NOV?: number;
  OND?: number;
  OUT?: number;
  SET?: number;
  SON?: number;
  TRIMESTRE2?: string;
  TRIMESTRE_?: string;
}


export type textura = {
  key: number;
  value: string;
  mediana: string;
}


export type adProps = {
  id_solo: string;
  solo_subordem: string;
  id_p: string;
  textura: string;
  mediana: string;
}

export interface CardProps {
  Title: string;
  Text: string | JSX.Element;
}

export type ValueMapProps = {
  textura: string,
  ad: string
}

interface PtfTypeProps {

  author: string;
  ptf: number[] | number;
}

interface MyContextProps {
  ID?: string | number;
  url?: string | null;
  color?: string | null;
  Ordem?: string | null;
  Subordem?: string | null;
  Textura?: string | null;
  AD?: string | null;
  Relevo?: string | null;
  Latitude?: number | null;
  Longitude?: number | null;
  geojson?: GeoJSON | null;
  resposta?: number | null;
}

interface GeoInfoData extends MyContextProps {
  objectid?: number | null;
  cod?: string | null;
  c1_simb?: string | null;
  c1_class?: string | null;
  c1_ord?: string | null;
  relevo_c1?: string | null;
  relevo_c2?: string | null;
  relevo_c3?: string | null;
  relevo_c4?: string | null;
  relevo_c5?: string | null;
  ad_um?: number | null;
  textura_c1?: string | null;
  textura_c2?: string | null;
  textura_c3?: string | null;
  textura_c4?: string | null;
  textura_c5?: string | null;
  ad_c1?: number | null;
  ad_c2?: number | null;
  ad_c3?: number | null;
  ad_c4?: number | null;
  ad_c5?: number | null;
  solo_c1?: string | null;
  solo_c2?: string | null;
  solo_c3?: string | null;
  solo_c4?: string | null;
  solo_c5?: string | null;
  pedrego_c1?: string | null;
  pedrego_c2?: string | null;
  pedrego_c3?: string | null;
  pedrego_c4?: string | null;
  pedrego_c5?: string | null;
  rocho_c1?: string | null;
  rocho_c2?: string | null;
  rocho_c3?: string | null;
  rocho_c4?: string | null;
  rocho_c5?: string | null;
  area?: string | null;
  classe_terra?: string | null;
  ct_c1?: string | null;
  ct_c2?: string | null;
  ct_c3?: string | null;
  ct_c4?: string | null;
  ct_c5?: string | null;
  filter?: string | null;
  municipio?: string | null;
  region?: string | null;
  centroides?: LatLng;
  escala?: string | null;
  setContext?: React.Dispatch<React.SetStateAction<GeoInfoData | null>>;
  filterWMS?: filterWMS;
}


interface GeoInfoDataAny extends GeoInfoData {
  [key: string]: string | number | null | undefined | GeoJSON;
}


export interface DadosUF {
  [key: string]: { centroides: LatLng; cod: string; nome: string };
}

export interface dados_um_props {
  [key: string]: {
    [key: string]: {
      centroides: LatLng;
      cod_mun: string;
    };
  }[];
}

interface MunicipioProps {
  nome: string;
  cod_mun: string;
  centroides: LatLng;
}


interface filterWMSProps {
  layer?: string;
  operator?: string;
  field?: string;
  value?: string;

}

export interface ComplexLayer {
  format: string;
  transparent: boolean;
  layers: string;
  version: string;
  crs: object; 
  styles: string;
  tileSize: number;
  keepBuffer: number;
  tms: boolean;
  updateInterval: number;
  pane: string;
  updateWhenIdle: boolean;
  opacity: number;
  zIndex: number;
}