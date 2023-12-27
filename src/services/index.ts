import { MyContextProps } from '../@types/data';



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

    public static async fetchCoords(lat: number, lng: number): Promise<MyContextProps | null> {
        const url_sgb = this.url_sgb(lat, lng);


        try {
            const response_sgb = await fetch(url_sgb);
            const data_sgb = await response_sgb.json();
            const x = this.url_ibge_pedo(lat, lng);

            // const response_ibge = await fetch(x);
            // const data_ibge = await response_ibge.json();
            console.log(x);

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
            console.error("Erro na solicitação:", error);
            return { resposta: 500 };
        }
    }



    private static url_sgb(lat: number, lng: number) {
        return `https://geoportal.sgb.gov.br/server/rest/services/pronasolos/agua_disponivel/MapServer/0/query?f=json&geometryType=esriGeometryPoint&spatialRel=esriSpatialRelIntersects&geometry={"x": ${lng}, "y": ${lat}, "spatialReference": {"wkid": 4326}}&outFields=ordem,subordem,grande_gru,subgrupos,textura,horizonte,relevo,total_ad,legad,objectid_1&outSR=4326&tolerance=10`;
    }

    private static url_ibge_pedo(lat: number, lng: number) {

        return `https://bdiaweb.ibge.gov.br/proxy/prod/bdiaweb/api/featureinfo/?request=GetFeatureInfo&service=WMS&srs=EPSG:4326&styles=&transparent=true&version=1.1.1&format=image/png&bbox=-180.0,-90.0,180.0,90.0&height=837&width=1097&layers=BDIA:v_pd_area_geo_limite&query_layers=BDIA:v_pd_area_geo_limite&info_format=text/plain&latlng=LatLng(${lat}, ${lng})&x=572&y=274`;

    }
}

export default RequestCoordsService;