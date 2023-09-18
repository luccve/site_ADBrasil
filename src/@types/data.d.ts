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
    type?: string;
    name?: string;
    crs?: {
      type?: string;
      properties?: {
        name?: string;
      };
    };
    features?: {
      type?: string;
      properties?: {};
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