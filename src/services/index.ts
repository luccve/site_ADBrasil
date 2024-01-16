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
                ID: data_sgb.features[0].attributes.objectid_1,
                Ordem: data_sgb.features[0].attributes.ordem,
                Subordem: data_sgb.features[0].attributes.subordem,
                Textura: data_sgb.features[0].attributes.textura,
                AD: `${data_sgb.features[0].attributes.total_ad} mm/cm`,
                Relevo: data_sgb.features[0].attributes.relevo,
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

    public static async fetchCoords(lat: number, lng: number): Promise<GeoInfoData | null> {
        try {
            const url_geinfo_adbrasil_wfs = this.url_geinfo_adbrasil_wfs(lat, lng);
            const response_geinfo_adbrasil_wfs = await fetch(url_geinfo_adbrasil_wfs);


            if (!response_geinfo_adbrasil_wfs.ok) {
                console.error('Erro na solicitação WFS:', response_geinfo_adbrasil_wfs.statusText);
                console.error('Tentando com o SGB');
                return this.fetch_data_SGB(lat, lng);
            }

            const contentType = response_geinfo_adbrasil_wfs.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data_geinfo_adbrasil_wfs = await response_geinfo_adbrasil_wfs.json();
                console.log(data_geinfo_adbrasil_wfs.features[0].geometry.coordinates);
                return {
                    resposta: 200, Latitude: lat.toPrecision(5), Longitude: lng.toPrecision(5), ...data_geinfo_adbrasil_wfs.features[0].properties
                };
            } else {
                console.error('Resposta não contém dados JSON.', response_geinfo_adbrasil_wfs.url);
                return { resposta: 500 };;
            }
        } catch (error) {
            console.error('Erro na primeira solicitação', error);
            // Adicione aqui tratamentos adicionais conforme necessário
            return { resposta: 500 };
        }
    }

    // geojson:
    // {
    //     name: `Estimativa de AD: ${data_geinfo_adbrasil_wfs.features[0].properties.ogc_fid}`,

    //     features: [{

    //         type: 'Feature',
    //         properties: {
    //             name: data_geinfo_adbrasil_wfs.features[0].properties.geometry.type
    //         },
    //         geometry: {
    //             type: 'MultiPolygon',
    //             coordinates: [data_geinfo_adbrasil_wfs.features[0].geometry.coordinates],
    //         },
    //     }]
    // },


    private static url_sgb(lat: number, lng: number) {
        return `https://geoportal.sgb.gov.br/server/rest/services/pronasolos/agua_disponivel/MapServer/0/query?f=json&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&geometry={"x": ${lng}, "y": ${lat}, "spatialReference": {"wkid": 4326}}&outFields=ordem,subordem,grande_gru,subgrupos,textura,horizonte,relevo,total_ad,legad,objectid_1&outSR=4326&tolerance=10`;
    }


    private static url_geinfo_adbrasil_wfs(lat: number, lng: number) {
        const cqlFilter = `INTERSECTS(geometry,POINT(${lng} ${lat}))`;
        const baseUrl = 'https://geoinfo.dados.embrapa.br/geoserver/geonode/wfs?&version=1.0.0&request=GetFeature&typeNames=geonode:adbrasil&outputFormat=application%2Fjson';
        const srsName = 'EPSG:3857';


        const encodedCqlFilter = encodeURIComponent(cqlFilter);

        const encodedSrsName = encodeURIComponent(srsName);

        return `${baseUrl}&cql_filter=${encodedCqlFilter}&srsName=${encodedSrsName}`;
    }



}

export default RequestCoordsService;