import { GeoInfoData } from '../@types/data';

interface GeoInfo250Props {
    ct_c1?: string;
    ct_c2?: string;
    ct_c3?: string;
    ct_c4?: string;
    ct_c5?: string;
    classe_terra?: string;
    lat?: number;
    lng?: number;
    region?: string
}

class RequestCoordsService {

    static geoInfo250: GeoInfo250Props | null = null;

    private static changeColor(ad: number | null) {
        const colorRanges = [
            { min: 1.84, max: Infinity, color: "#8500A8" },
            { min: 1.4, max: 1.84, color: "#005CE6" },
            { min: 1.06, max: 1.4, color: "#00C4FF" },
            { min: 0.8, max: 1.06, color: "#37A800" },
            { min: 0.61, max: 0.8, color: "#4DE600" },
            { min: 0.46, max: 0.61, color: "#FFAB00" },
            { min: 0.34, max: 0.46, color: "#FFFF73" },
            { min: -Infinity, max: 0.34, color: "#9C9C9C" },
        ];

        if (ad === null) {
            return "transparent";
        }

        const colorRange = colorRanges.find(
            (range) => range.min <= ad && ad <= range.max
        );
        return colorRange ? colorRange.color : "transparent";
    }

    private static async fetch_region(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return {
            data,
            response
        };
    }

    public static async fetchCoords(lat: number, lng: number): Promise<GeoInfoData | null> {
        try {


            const data_adbrasil_malha = await this.fetch_region(this.url_geinfo_adbrasil_malha_clip_wfs(lat, lng));
            const data_pti_geoinfo = await this.fetch_region(this.url_geinfo_pti_wfs(lat, lng));
            const contentType = data_adbrasil_malha.response.headers.get('content-type');

            const { ct_c1, ct_c2, ct_c3, ct_c4, ct_c5, pti_um } = data_pti_geoinfo.data.features[0].properties
            this.geoInfo250 = {
                ct_c1,
                ct_c2,
                ct_c3,
                ct_c4,
                ct_c5,
                classe_terra: pti_um,
                lat,
                lng,
                region: data_adbrasil_malha.data.features[0].properties.sigla_uf
            }


            if (!data_adbrasil_malha.response.ok) {
                console.error('Erro na solicitação WFS:', data_adbrasil_malha.response.statusText);
                throw new Error('Erro ao processar dados da região');
            } else if (contentType && contentType.includes("application/json")) {

                switch (data_adbrasil_malha.data.features[0].properties.sigla_uf) {
                    case 'AL':
                        try {
                            const data_alagoas = await this.fetch_region(this.url_geinfo_alagoas_ad_clip_wfs(lat, lng));

                            return {
                                resposta: 200,
                                region: data_adbrasil_malha.data.features[0].properties.sigla_uf,
                                geojson: {
                                    name: `Estimativa de AD: ${data_alagoas.data.features[0].geometry.type}`,

                                    features: [{

                                        type: 'Feature',
                                        properties: {
                                            name: data_alagoas.data.features[0].geometry.type
                                        },
                                        geometry: {
                                            type: 'MultiPolygon',
                                            coordinates: data_alagoas.data.features[0].geometry.coordinates,
                                        },
                                    }]
                                },
                                Latitude: Number(lat.toPrecision(5)), Longitude: Number(lng.toPrecision(5)),
                                ID: data_alagoas.data.features[0].properties.fid,
                                color: this.changeColor(data_alagoas.data.features[0].properties.ad_um),
                                relevo_c1: data_alagoas.data.features[0].properties.relevo_c1,
                                relevo_c2: data_alagoas.data.features[0].properties.relevo_c2,
                                relevo_c3: data_alagoas.data.features[0].properties.relevo_c3,
                                relevo_c4: data_alagoas.data.features[0].properties.relevo_c4,
                                relevo_c5: data_alagoas.data.features[0].properties.relevo_c5,
                                rocho_c1: data_alagoas.data.features[0].properties.rocho_c1,
                                rocho_c2: data_alagoas.data.features[0].properties.rocho_c2,
                                rocho_c3: data_alagoas.data.features[0].properties.rocho_c3,
                                rocho_c4: data_alagoas.data.features[0].properties.rocho_c4,
                                rocho_c5: data_alagoas.data.features[0].properties.rocho_c5,
                                textura_c1: data_alagoas.data.features[0].properties.textura_c1,
                                textura_c2: data_alagoas.data.features[0].properties.textura_c2,
                                textura_c3: data_alagoas.data.features[0].properties.textura_c3,
                                textura_c4: data_alagoas.data.features[0].properties.textura_c4,
                                textura_c5: data_alagoas.data.features[0].properties.textura_c5,
                                ad_c1: data_alagoas.data.features[0].properties.ad_c1,
                                ad_c2: data_alagoas.data.features[0].properties.ad_c2,
                                ad_c3: data_alagoas.data.features[0].properties.ad_c3,
                                ad_c4: data_alagoas.data.features[0].properties.ad_c4,
                                ad_c5: data_alagoas.data.features[0].properties.ad_c5,
                                c1_class: data_alagoas.data.features[0].properties.c1_class,
                                ad_um: data_alagoas.data.features[0].properties.ad_um,
                                solo_c1: data_alagoas.data.features[0].properties.solo_c1,
                                solo_c2: data_alagoas.data.features[0].properties.solo_c2,
                                solo_c3: data_alagoas.data.features[0].properties.solo_c3,
                                solo_c4: data_alagoas.data.features[0].properties.solo_c4,
                                solo_c5: data_alagoas.data.features[0].properties.solo_c5,
                                ct_c1: data_pti_geoinfo.data.features[0].properties.ct_c1,
                                ct_c2: data_pti_geoinfo.data.features[0].properties.ct_c2,
                                ct_c3: data_pti_geoinfo.data.features[0].properties.ct_c3,
                                ct_c4: data_pti_geoinfo.data.features[0].properties.ct_c4,
                                ct_c5: data_pti_geoinfo.data.features[0].properties.ct_c5,
                                classe_terra: data_pti_geoinfo.data.features[0].properties.pti_um,

                            }
                        } catch (err) {
                            if (this.geoInfo250) {

                                this.geoInfo250['region'] = 'Brasil';
                                return await this.fetchFeatureGeoinfo250(this.geoInfo250)
                            } return null;
                        }


                    case 'PB':
                        try {
                            const data_pb = await this.fetch_region(await this.url_geinfo_pb_ad_clip_wfs(lat, lng));
                            return {
                                resposta: 200,
                                geojson: {
                                    name: `Estimativa de AD: ${data_pb.data.features[0].geometry.type}`,

                                    features: [{

                                        type: 'Feature',
                                        properties: {
                                            name: data_pb.data.features[0].geometry.type
                                        },
                                        geometry: {
                                            type: 'MultiPolygon',
                                            coordinates: data_pb.data.features[0].geometry.coordinates,
                                        },
                                    }]
                                },
                                Latitude: Number(lat.toPrecision(5)), Longitude: Number(lng.toPrecision(5)),
                                ID: data_pb.data.features[0].properties.fid,
                                color: this.changeColor(data_pb.data.features[0].properties.ad_um),
                                relevo_c1: data_pb.data.features[0].properties.relevo_c1,
                                relevo_c2: data_pb.data.features[0].properties.relevo_c2,
                                relevo_c3: data_pb.data.features[0].properties.relevo_c3,
                                relevo_c4: data_pb.data.features[0].properties.relevo_c4,
                                relevo_c5: data_pb.data.features[0].properties.relevo_c5,
                                rocho_c1: data_pb.data.features[0].properties.rocho_c1,
                                rocho_c2: data_pb.data.features[0].properties.rocho_c2,
                                rocho_c3: data_pb.data.features[0].properties.rocho_c3,
                                rocho_c4: data_pb.data.features[0].properties.rocho_c4,
                                rocho_c5: data_pb.data.features[0].properties.rocho_c5,
                                textura_c1: data_pb.data.features[0].properties.textura_c1,
                                textura_c2: data_pb.data.features[0].properties.textura_c2,
                                textura_c3: data_pb.data.features[0].properties.textura_c3,
                                textura_c4: data_pb.data.features[0].properties.textura_c4,
                                textura_c5: data_pb.data.features[0].properties.textura_c5,
                                ad_c1: data_pb.data.features[0].properties.ad_c1,
                                ad_c2: data_pb.data.features[0].properties.ad_c2,
                                ad_c3: data_pb.data.features[0].properties.ad_c3,
                                ad_c4: data_pb.data.features[0].properties.ad_c4,
                                ad_c5: data_pb.data.features[0].properties.ad_c5,
                                c1_class: data_pb.data.features[0].properties.c1_class,
                                ad_um: data_pb.data.features[0].properties.ad_um,
                                solo_c1: data_pb.data.features[0].properties.solo_c1,
                                solo_c2: data_pb.data.features[0].properties.solo_c2,
                                solo_c3: data_pb.data.features[0].properties.solo_c3,
                                solo_c4: data_pb.data.features[0].properties.solo_c4,
                                solo_c5: data_pb.data.features[0].properties.solo_c5,
                                ct_c1: data_pti_geoinfo.data.features[0].properties.ct_c1,
                                ct_c2: data_pti_geoinfo.data.features[0].properties.ct_c2,
                                ct_c3: data_pti_geoinfo.data.features[0].properties.ct_c3,
                                ct_c4: data_pti_geoinfo.data.features[0].properties.ct_c4,
                                ct_c5: data_pti_geoinfo.data.features[0].properties.ct_c5,
                                region: data_adbrasil_malha.data.features[0].properties.sigla_uf,
                                classe_terra: data_pti_geoinfo.data.features[0].properties.pti_um,
                            }

                        } catch (err) {
                            if (this.geoInfo250) {

                                this.geoInfo250['region'] = 'Brasil';
                                return await this.fetchFeatureGeoinfo250(this.geoInfo250)
                            } return null;
                        }

                    case 'SP':
                        try {
                            const data_sp = await this.fetch_region(await this.url_geinfo_sp_ad_clip_wfs(lat, lng));

                            return {
                                resposta: 200,
                                geojson: {
                                    name: `Estimativa de AD: ${data_sp.data.features[0].geometry.type}`,

                                    features: [{

                                        type: 'Feature',
                                        properties: {
                                            name: data_sp.data.features[0].geometry.type
                                        },
                                        geometry: {
                                            type: 'MultiPolygon',
                                            coordinates: data_sp.data.features[0].geometry.coordinates,
                                        },
                                    }]
                                },
                                Latitude: Number(lat.toPrecision(5)), Longitude: Number(lng.toPrecision(5)),
                                ID: data_sp.data.features[0].properties.fid,
                                color: this.changeColor(data_sp.data.features[0].properties.ad_um),
                                relevo_c1: data_sp.data.features[0].properties.relevo_c1,
                                relevo_c2: data_sp.data.features[0].properties.relevo_c2,
                                relevo_c3: data_sp.data.features[0].properties.relevo_c3,
                                relevo_c4: data_sp.data.features[0].properties.relevo_c4,
                                relevo_c5: data_sp.data.features[0].properties.relevo_c5,
                                rocho_c1: data_sp.data.features[0].properties.rocho_c1,
                                rocho_c2: data_sp.data.features[0].properties.rocho_c2,
                                rocho_c3: data_sp.data.features[0].properties.rocho_c3,
                                rocho_c4: data_sp.data.features[0].properties.rocho_c4,
                                rocho_c5: data_sp.data.features[0].properties.rocho_c5,
                                textura_c1: data_sp.data.features[0].properties.textura_c1,
                                textura_c2: data_sp.data.features[0].properties.textura_c2,
                                textura_c3: data_sp.data.features[0].properties.textura_c3,
                                textura_c4: data_sp.data.features[0].properties.textura_c4,
                                textura_c5: data_sp.data.features[0].properties.textura_c5,
                                ad_c1: data_sp.data.features[0].properties.ad_c1,
                                ad_c2: data_sp.data.features[0].properties.ad_c2,
                                ad_c3: data_sp.data.features[0].properties.ad_c3,
                                ad_c4: data_sp.data.features[0].properties.ad_c4,
                                ad_c5: data_sp.data.features[0].properties.ad_c5,
                                c1_class: data_sp.data.features[0].properties.c1_class,
                                ad_um: data_sp.data.features[0].properties.ad_um,
                                solo_c1: data_sp.data.features[0].properties.solo_c1,
                                solo_c2: data_sp.data.features[0].properties.solo_c2,
                                solo_c3: data_sp.data.features[0].properties.solo_c3,
                                solo_c4: data_sp.data.features[0].properties.solo_c4,
                                solo_c5: data_sp.data.features[0].properties.solo_c5,
                                ct_c1: data_pti_geoinfo.data.features[0].properties.ct_c1,
                                ct_c2: data_pti_geoinfo.data.features[0].properties.ct_c2,
                                ct_c3: data_pti_geoinfo.data.features[0].properties.ct_c3,
                                ct_c4: data_pti_geoinfo.data.features[0].properties.ct_c4,
                                ct_c5: data_pti_geoinfo.data.features[0].properties.ct_c5,
                                region: data_adbrasil_malha.data.features[0].properties.sigla_uf,
                                classe_terra: data_pti_geoinfo.data.features[0].properties.pti_um,

                            }
                        } catch (err) {
                            if (this.geoInfo250) {

                                this.geoInfo250['region'] = 'Brasil';
                                return await this.fetchFeatureGeoinfo250(this.geoInfo250)
                            } return null
                        }

                    case 'RJ':
                        break;

                    default:
                        if (this.geoInfo250) {

                            this.geoInfo250['region'] = 'Brasil';
                            return await this.fetchFeatureGeoinfo250(this.geoInfo250)
                        } return null
                }

            }

            return {}

        } catch (error) {
            console.error('Erro na primeira solicitação', error);

            return { resposta: 404 };
        }
    }

    private static url_geinfo_adbrasil_wfs(lat?: number, lng?: number) {
        const cqlFilter = `INTERSECTS(geometry,POINT(${lng} ${lat}))`;
        const baseUrl = 'https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=geonode:adbrasil&outputFormat=application%2Fjson';



        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&cql_filter=${encodedCqlFilter}`;
    }

    private static url_geinfo_pti_wfs(lat: number, lng: number) {
        const cqlFilter = `INTERSECTS(geometry,POINT(${lng} ${lat}))`;
        const baseUrl = 'https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45&outputFormat=application%2Fjson';



        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&cql_filter=${encodedCqlFilter}`;
    }

    private static url_geinfo_adbrasil_malha_clip_wfs(lat: number, lng: number) {
        const cqlFilter = `INTERSECTS(geom,POINT(${lng} ${lat}))`;
        const name = encodeURIComponent("geonode:adbrasil_b0f18f25e5eac580ec58488ae35e3918")
        const baseUrl = `https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=${name}&outputFormat=application%2Fjson&access_token=1M2RzHPj2f6WCNqPmNv2xTvCM713ax`;



        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&cql_filter=${encodedCqlFilter}`;
    }

    private static url_geinfo_alagoas_ad_clip_wfs(lat: number, lng: number) {
        const cqlFilter = `INTERSECTS(geom,POINT(${lng} ${lat}))`;
        const name = encodeURIComponent("geonode:alagoas_ad")
        const baseUrl = `https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=${name}&outputFormat=application%2Fjson`;



        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&cql_filter=${encodedCqlFilter}`;
    }

    private static async url_geinfo_sp_ad_clip_wfs(lat: number, lng: number) {



        const name = encodeURIComponent("geonode:saopaulo_ad_4109459bd64ccdddc10e3dfa510cc90b")
        const cqlFilter = `INTERSECTS(geometry,POINT(${lng} ${lat}))`;

        const baseUrl = `https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=${name}&outputFormat=application%2Fjson`;

        const srs = "SRSNAME=EPSG:4326"

        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&${srs}&cql_filter=${encodedCqlFilter}`;
    }


    private static async url_geinfo_pb_ad_clip_wfs(old_lat: number, old_lng: number) {

        const request = await fetch(`https://epsg.io/srs/transform/${old_lng},${old_lat}.json?key=default&s_srs=4326&t_srs=31985`)
        const transformcoords = await request.json();
        const { x, y } = transformcoords.results[0]

        const cqlFilter = `INTERSECTS(geom,POINT(${x} ${y}))`;
        const name = encodeURIComponent("geonode:paraiba_ad")
        const baseUrl = `https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=2.0.0&request=GetFeature&typeNames=${name}&outputFormat=application%2Fjson`;

        const srs = "SRSNAME=EPSG:4326"

        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&${srs}&cql_filter=${encodedCqlFilter}`;
    }


    private static async fetchFeatureGeoinfo250(GeoInfo250: GeoInfo250Props) {


        const data_geoinfo_adbrasil_wfs = await this.fetch_region(this.url_geinfo_adbrasil_wfs(GeoInfo250.lat, GeoInfo250.lng));
        return {
            resposta: 200,
            region: GeoInfo250.region,
            geojson: {
                name: `Estimativa de AD: ${data_geoinfo_adbrasil_wfs.data.features[0].geometry.type}`,

                features: [{

                    type: 'Feature',
                    properties: {
                        name: data_geoinfo_adbrasil_wfs.data.features[0].geometry.type
                    },
                    geometry: {
                        type: 'MultiPolygon',
                        coordinates: data_geoinfo_adbrasil_wfs.data.features[0].geometry.coordinates,
                    },
                }]
            },
            Latitude: Number(GeoInfo250.lat?.toPrecision(5)), Longitude: Number(GeoInfo250.lng?.toPrecision(5)),
            ID: data_geoinfo_adbrasil_wfs.data.features[0].properties.fid,
            color: this.changeColor(data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_um),
            relevo_c1: data_geoinfo_adbrasil_wfs.data.features[0].properties.c1_relevo,
            relevo_c2: data_geoinfo_adbrasil_wfs.data.features[0].properties.c2_relevo,
            relevo_c3: data_geoinfo_adbrasil_wfs.data.features[0].properties.c3_relevo,
            relevo_c4: data_geoinfo_adbrasil_wfs.data.features[0].properties.c4_relevo,
            relevo_c5: data_geoinfo_adbrasil_wfs.data.features[0].properties.c5_relevo,
            rocho_c1: data_geoinfo_adbrasil_wfs.data.features[0].properties.rochosidad,
            rocho_c2: data_geoinfo_adbrasil_wfs.data.features[0].properties.rochosid_1,
            rocho_c3: data_geoinfo_adbrasil_wfs.data.features[0].properties.rochosid_2,
            rocho_c4: data_geoinfo_adbrasil_wfs.data.features[0].properties.rochosid_3,
            rocho_c5: data_geoinfo_adbrasil_wfs.data.features[0].properties.rochosid_4,
            textura_c1: data_geoinfo_adbrasil_wfs.data.features[0].properties.textura_c1,
            textura_c2: data_geoinfo_adbrasil_wfs.data.features[0].properties.textura_c2,
            textura_c3: data_geoinfo_adbrasil_wfs.data.features[0].properties.textura_c3,
            textura_c4: data_geoinfo_adbrasil_wfs.data.features[0].properties.textura_c4,
            textura_c5: data_geoinfo_adbrasil_wfs.data.features[0].properties.textura_c5,
            pedrego_c1: data_geoinfo_adbrasil_wfs.data.features[0].properties.pedregosid,
            pedrego_c2: data_geoinfo_adbrasil_wfs.data.features[0].properties.pedregos_1,
            pedrego_c3: data_geoinfo_adbrasil_wfs.data.features[0].properties.pedregos_2,
            pedrego_c4: data_geoinfo_adbrasil_wfs.data.features[0].properties.pedregos_3,
            pedrego_c5: data_geoinfo_adbrasil_wfs.data.features[0].properties.pedregos_4,
            ad_c1: data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_c1,
            ad_c2: data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_c2,
            ad_c3: data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_c3,
            ad_c4: data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_c4,
            ad_c5: data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_c5,
            c1_class: data_geoinfo_adbrasil_wfs.data.features[0].properties.c1_class,
            ad_um: data_geoinfo_adbrasil_wfs.data.features[0].properties.ad_um,
            solo_c1: data_geoinfo_adbrasil_wfs.data.features[0].properties.solo_c1,
            solo_c2: data_geoinfo_adbrasil_wfs.data.features[0].properties.solo_c2,
            solo_c3: data_geoinfo_adbrasil_wfs.data.features[0].properties.solo_c3,
            solo_c4: data_geoinfo_adbrasil_wfs.data.features[0].properties.solo_c4,
            solo_c5: data_geoinfo_adbrasil_wfs.data.features[0].properties.solo_c5,
            ct_c1: GeoInfo250.ct_c1,
            ct_c2: GeoInfo250.ct_c2,
            ct_c3: GeoInfo250.ct_c3,
            ct_c4: GeoInfo250.ct_c4,
            ct_c5: GeoInfo250.ct_c5,
            classe_terra: GeoInfo250.classe_terra,
        }
    }


}


export default RequestCoordsService;