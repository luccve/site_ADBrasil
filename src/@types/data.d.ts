//id_solo INTEGER PRIMARY KEY AUTOINCREMENT, sigla_p VARCHAR(2), solo_subordem VARCHAR(100), id_p VARCHAR(2), textura VARCHAR(140), n_camadas VARCHAR(10), media VARCHAR(5), dp VARCHAR(5), cv VARCHAR(5), mediana VARCHAR(5), inter_interq VARCHAR(5), min VARCHAR(5), max VARCHAR(5)

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
  c1_relevo?: string | null;
  c2_relevo?: string | null;
  c3_relevo?: string | null;
  c4_relevo?: string | null;
  c5_relevo?: string | null;
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
  pedregos_1?: string | null;
  pedregos_2?: string | null;
  pedregos_3?: string | null;
  pedregos_4?: string | null;
  pedregos_5?: string | null;
  rochosid_1?: string | null;
  rochosid_2?: string | null;
  rochosid_3?: string | null;
  rochosid_4?: string | null;
  rochosid_5?: string | null;
  area?: string | null;
  classe_terra?: string | null;
  ct_c1?: string | null;
  ct_c2?: string | null;
  ct_c3?: string | null;
  ct_c4?: string | null;
  ct_c5?: string | null;
  setContext?: React.Dispatch<React.SetStateAction<GeoInfoData | null>>;
  [key: string]: string | number | null | undefined | GeoJSON;
}
