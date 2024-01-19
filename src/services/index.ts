import { GeoInfoData } from '../@types/data';



class RequestCoordsService {

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

    private static async fetch_data_SGB(lat: number, lng: number): Promise<GeoInfoData | null> {
        try {
            const url_sgb = this.url_sgb(lat, lng);
            const response_sgb = await fetch(url_sgb);
            const data_sgb = await response_sgb.json();

            return {
                ad_um: data_sgb.features[0].attributes.total_ad,
                c1_class: `${data_sgb.features[0].attributes.ordem} ${data_sgb.features[0].attributes.subordem}`,
                c1_relevo: data_sgb.features[0].attributes.relevo,
                textura_c1: data_sgb.features[0].attributes.textura,
                ID: data_sgb.features[0].attributes.objectid_1,
                Latitude: Number(lat.toPrecision(5)),
                Longitude: Number(lng.toPrecision(5)),
                color: this.changeColor(data_sgb.features[0]?.attributes?.total_ad),
                resposta: 200,
                geojson: {
                    name: `Estimativa de AD: ${data_sgb.features[0].attributes.objectid_1}`,

                    features: [{

                        type: 'Feature',
                        properties: {
                            name: data_sgb.features[0].attributes.ordem
                        },
                        geometry: {
                            type: 'MultiPolygon',
                            coordinates: [data_sgb.features[0].geometry.rings],
                        },
                    }]
                }
            }

        } catch (error) {
            console.error('Error na segunda solicitação', error);
            return { resposta: 500 };
        }

    }


    static async fetchClipADBrasil(lat: number, lng: number) {
        const url = this.url_geinfo_ad_clip_wfs(lat, lng);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }


    public static async fetchCoords(lat: number, lng: number): Promise<GeoInfoData | null> {
        try {
            const url_geinfo_adbrasil_wfs = this.url_geinfo_adbrasil_wfs(lat, lng);
            const response_geinfo_adbrasil_wfs = await fetch(url_geinfo_adbrasil_wfs);

            const url_geoinfo_pti_wfs = this.url_geinfo_pti_wfs(lat, lng);
            const response_geoinfo_pti_wfs = await fetch(url_geoinfo_pti_wfs);
            const dados = await response_geoinfo_pti_wfs.json();

            const state = await this.fetchClipADBrasil(lat, lng);
            console.log(state.features[0].properties.nm_mun+", "+ state.features[0].properties.sigla_uf+", "+ state.features[0].properties.cd_mun);

            if (!response_geinfo_adbrasil_wfs.ok) {
                console.error('Erro na solicitação WFS:', response_geinfo_adbrasil_wfs.statusText);
                console.error('Tentando com o SGB');
                return this.fetch_data_SGB(lat, lng);
            }

            const contentType = response_geinfo_adbrasil_wfs.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data_geinfo_adbrasil_wfs = await response_geinfo_adbrasil_wfs.json();

                return {
                    resposta: 200, Latitude: Number(lat.toPrecision(5)), Longitude: Number(lng.toPrecision(5)),
                    ID: data_geinfo_adbrasil_wfs.features[0].properties.fid,
                    color: this.changeColor(data_geinfo_adbrasil_wfs.features[0].properties.ad_um),
                    geojson:
                    {
                        name: `Estimativa de AD: ${data_geinfo_adbrasil_wfs.features[0].properties.ogc_fid}`,

                        features: [{

                            type: 'Feature',
                            properties: {
                                name: data_geinfo_adbrasil_wfs.features[0].geometry.type
                            },
                            geometry: {
                                type: 'MultiPolygon',
                                coordinates: data_geinfo_adbrasil_wfs.features[0].geometry.coordinates,
                            },
                        }]
                    },
                    rochosid_1: data_geinfo_adbrasil_wfs.features[0].properties.rochosidad,
                    rochosid_2: data_geinfo_adbrasil_wfs.features[0].properties.rochosid_1,
                    rochosid_3: data_geinfo_adbrasil_wfs.features[0].properties.rochosid_2,
                    rochosid_4: data_geinfo_adbrasil_wfs.features[0].properties.rochosid_3,
                    rochosid_5: data_geinfo_adbrasil_wfs.features[0].properties.rochosid_4,
                    solo_c1: data_geinfo_adbrasil_wfs.features[0].properties.solo_c1,
                    solo_c2: data_geinfo_adbrasil_wfs.features[0].properties.solo_c2,
                    solo_c3: data_geinfo_adbrasil_wfs.features[0].properties.solo_c3,
                    solo_c4: data_geinfo_adbrasil_wfs.features[0].properties.solo_c4,
                    solo_c5: data_geinfo_adbrasil_wfs.features[0].properties.solo_c5,
                    textura_c1: data_geinfo_adbrasil_wfs.features[0].properties.textura_c1,
                    textura_c2: data_geinfo_adbrasil_wfs.features[0].properties.textura_c2,
                    textura_c3: data_geinfo_adbrasil_wfs.features[0].properties.textura_c3,
                    textura_c4: data_geinfo_adbrasil_wfs.features[0].properties.textura_c4,
                    textura_c5: data_geinfo_adbrasil_wfs.features[0].properties.textura_c5,
                    pedregos_1: data_geinfo_adbrasil_wfs.features[0].properties.pedregosid,
                    pedregos_2: data_geinfo_adbrasil_wfs.features[0].properties.pedregos_1,
                    pedregos_3: data_geinfo_adbrasil_wfs.features[0].properties.pedregos_2,
                    pedregos_4: data_geinfo_adbrasil_wfs.features[0].properties.pedregos_3,
                    pedregos_5: data_geinfo_adbrasil_wfs.features[0].properties.pedregos_4,
                    c1_relevo: data_geinfo_adbrasil_wfs.features[0].properties.c1_relevo,
                    c2_relevo: data_geinfo_adbrasil_wfs.features[0].properties.c2_relevo,
                    c3_relevo: data_geinfo_adbrasil_wfs.features[0].properties.c3_relevo,
                    c4_relevo: data_geinfo_adbrasil_wfs.features[0].properties.c4_relevo,
                    c5_relevo: data_geinfo_adbrasil_wfs.features[0].properties.c5_relevo,
                    ad_c1: data_geinfo_adbrasil_wfs.features[0].properties.ad_c1,
                    ad_c2: data_geinfo_adbrasil_wfs.features[0].properties.ad_c2,
                    ad_c3: data_geinfo_adbrasil_wfs.features[0].properties.ad_c3,
                    ad_c4: data_geinfo_adbrasil_wfs.features[0].properties.ad_c4,
                    ad_c5: data_geinfo_adbrasil_wfs.features[0].properties.ad_c5,
                    c1_class: data_geinfo_adbrasil_wfs.features[0].properties.c1_class,
                    area: data_geinfo_adbrasil_wfs.features[0].properties.area_km2,
                    classe_terra: dados.features[0].properties.pti_um,
                    ct_c1: dados.features[0].properties.ct_c1,
                    ct_c2: dados.features[0].properties.ct_c2,
                    ct_c3: dados.features[0].properties.ct_c3,
                    ct_c4: dados.features[0].properties.ct_c4,
                    ct_c5: dados.features[0].properties.ct_c5,
                    ad_um: data_geinfo_adbrasil_wfs.features[0].properties.ad_um
                };
            } else {
                console.error('Resposta não contém dados JSON.', response_geinfo_adbrasil_wfs.url);
                return { resposta: 500 };;
            }
        } catch (error) {
            console.error('Erro na primeira solicitação', error);

            return { resposta: 404 };
        }
    }




    private static url_sgb(lat: number, lng: number) {
        return `https://geoportal.sgb.gov.br/server/rest/services/pronasolos/agua_disponivel/MapServer/0/query?f=json&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&geometry={"x": ${lng}, "y": ${lat}, "spatialReference": {"wkid": 4326}}&outFields=ordem,subordem,grande_gru,subgrupos,textura,horizonte,relevo,total_ad,legad,objectid_1&outSR=4326&tolerance=10`;
    }


    private static url_geinfo_adbrasil_wfs(lat: number, lng: number) {
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

    private static url_geinfo_ad_clip_wfs(lat: number, lng: number) {
        const cqlFilter = `INTERSECTS(geom,POINT(${lng} ${lat}))`;
        const name = encodeURIComponent("geonode:adbrasil_b0f18f25e5eac580ec58488ae35e3918")
        const baseUrl = `https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=${name}&outputFormat=application%2Fjson&access_token=1M2RzHPj2f6WCNqPmNv2xTvCM713ax`;



        const encodedCqlFilter = encodeURIComponent(cqlFilter);



        return `${baseUrl}&cql_filter=${encodedCqlFilter}`;
    }



}

export default RequestCoordsService;