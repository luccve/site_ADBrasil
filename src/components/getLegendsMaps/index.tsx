import { useEffect, useState } from 'react';
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import type { GetLegendsMapsProps } from '../../@types/components';


const GetLegendsMaps = ({ layer }: GetLegendsMapsProps) => {

    useEffect(() => {

        handleChangeLegends();

    }, [layer])

    const nameSolos =
        [{ "grade_id": 1, "nome": "Argissolo", "hex": "#FFA77F", "area": 2390288.009 }, { "grade_id": 2, "nome": "Cambissolo", "hex": "#D7C5A5", "area": 437051.5481 }, { "grade_id": 3, "nome": "Chernossolo", "hex": "#AA8686", "area": 27468.272 }, { "grade_id": 4, "nome": "Espodossolo", "hex": "#CEBEC6", "area": 144591.6306 }, { "grade_id": 5, "nome": "Gleissolo", "hex": "#B6D8EE", "area": 369063.3737 }, { "grade_id": 6, "nome": "Latossolo", "hex": "#FECC5C", "area": 2797173.5439 }, { "grade_id": 7, "nome": "Luvissolo", "hex": "#D49616", "area": 238409.8734 }, { "grade_id": 8, "nome": "Neossolo", "hex": "#FFFE73", "area": 1138118.8688 }, { "grade_id": 9, "nome": "Nitossolo", "hex": "#A83800", "area": 110997.6553 }, { "grade_id": 10, "nome": "Organossolo", "hex": "#654E9C", "area": 6749.6153 }, { "grade_id": 11, "nome": "Planossolo", "hex": "#89CAC7", "area": 196311.4828 }, { "grade_id": 12, "nome": "Plintossolo", "hex": "#D6BAC9", "area": 426462.1481 }, { "grade_id": 13, "nome": "Vertissolo", "hex": "#9EAA85", "area": 19258.8004 }, { "grade_id": 14, "nome": "Dunas", "hex": "#FFFF00", "area": 4531.8109 }, { "grade_id": 15, "nome": "Outros", "hex": "#646464", "area": 43903.5263 }, { "grade_id": 16, "nome": "Corpo d'água continental", "hex": "#0070FF", "area": 164009.4393 }]

    const handleChangeLegends = () => {
        if (layer.includes("Estimativa de água disponível")) {
            setLegendChange(true);
            setShowSolos(false);
        } else if (layer.includes("Mapa de solos")) {
            setShowSolos(true);
            setLegendChange(false);
        } else {
            setLegendChange(false);
            const url = legendsURL.find(item => item.name === layer)?.link;
            legendWMS(url ? url : "https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png");
        }
    }


    const legendsURL = [
        { name: 'Potencial de terras para irrigação', link: 'https://geoinfo.dados.embrapa.br/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&height=14&width=14&layer=geonode%3Apti_28f79bcfe1f418a6219d5af23e8c1c45&style=geonode%3Apti_28f79bcfe1f418a6219d5af23e8c1c45&version=1.3.0&SLD_VERSION=1.1.0&LEGEND_OPTIONS=forceLabels;labelMargin:10;fontAntiAliasing:true;fontName:sans-serif;fontSize:16;fontBold%3Aon&_v_=1705322428760&access_token=9rp9Z9zMsPFZCDalo3AQcGt7SqlcKF' },
        { name: 'Biomas do Brasil', link: 'https://geoservicos.ibge.gov.br/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=14&HEIGHT=14&LAYER=CREN:lm_bioma_250&legend_options=forceLabels;labelMargin:10;fontAntiAliasing:true;fontName:sans-serif;fontSize:16;fontBold:true' },
        { name: 'Mapa de solos do Brasil', link: '' },
        { name: 'Vegetação Brasil', link: 'https://geoservicos.ibge.gov.br/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=14&HEIGHT=14&LAYER=CREN:vegetacao_radambrasil&legend_options=labelMargin:10;fontAntiAliasing:true;fontName:sans-serif;fontSize:16' },
        { name: 'Potencialidade Agricolas', link: 'https://geoservicos.ibge.gov.br/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=14&HEIGHT=14&LAYER=CREN:potencialidade_agricola&legend_options=forceLabels;labelMargin:10;fontAntiAliasing:true;fontName:sans-serif;fontSize:16' },
    ]

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [icon, setIcon] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [img, setImg] = useState<string>("https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png");
    const [legendChange, setLegendChange] = useState(true);
    const [showSolos, setShowSolos] = useState(false);



    const colorRanges = [
        { min: 1.84, max: null, color: "#8500A8", text: "faixa do valor máximo" },
        { min: 1.4, max: 1.84, color: "#005CE6", text: "a menor que" },
        { min: 1.06, max: 1.4, color: "#00C4FF", text: "a menor que" },
        { min: 0.8, max: 1.06, color: "#37A800", text: "a menor que" },
        { min: 0.61, max: 0.8, color: "#4DE600", text: "a menor que" },
        { min: 0.46, max: 0.61, color: "#FFAB00", text: "a menor que" },
        { min: 0.34, max: 0.46, color: "#FFFF73", text: "a menor que" },
        { min: 0, max: 0.34, color: "#9C9C9C", text: "a menor que" },
    ];


    const handleMouseDown = (e: any) => {
        // e.stopPropagation();
        // e.preventDefault();
        setDragging(true);
        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: any) => {
        // e.stopPropagation();
        // e.preventDefault();

        if (dragging) {
            const deltaX = e.clientX - startPosition.x;
            const deltaY = e.clientY - startPosition.y;
            setPosition(() => ({ x: deltaX, y: deltaY }));

            setStartPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleChangeIcon = () => {
        setIcon(!icon)
    }


    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);



        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);





    const legendWMS = async (link: string) => {

        const response = await fetch(link);

        if (!response.ok) {
            setImg('https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png')
            throw new Error(`Failed to fetch legend: ${response.statusText}`);
        } else {
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            setImg(imgUrl)
        }


    };


    const legendaSolos = (): JSX.Element => {
        return (
            <div className='flex justify-around p-5 flex-col absolute top-1/5 right-4 bg-white max-w-[300px] h-auto rounded-md shadow border border-gray'
                style={{ transform: `translate(${position.x}px, ${position.y}px)`, cursor: dragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleMouseDown}>
                <button onClick={handleChangeIcon} className='absolute hover:scale-110 top-0 right-0 p-2'>
                    {icon ? <MdMenuBook className={'text-blue text-[22px]'} /> : <BiSolidFoodMenu className={'text-blue text-[22px]'} />}
                </button>


                <div className='leading-tight text-blue pb-[20px]' style={{ display: icon ? 'none' : 'initial' }}>
                    <h1 className='font-bold text-lg max-md:text-md'>Legenda</h1>
                    <h3 className='text-md max-md:text-sm'>Solos do Brasil</h3>
                </div>

                <div className='self-center flex flex-col justify-between h-auto text-sm space-y-2' style={{ display: icon ? 'none' : 'initial' }}>
                    {nameSolos.map((item, index) => {
                        return <div key={`${index}-${item.area + item.grade_id}`} className='flex flex-row justify-between items-center space-x-2'>
                            <span style={{ background: item.hex, width: "25px", height: "25px" }} />
                            <h5> {item.nome}</h5 >
                        </div >

                    })}
                </div>
            </div>

        )
    };

    const legendaADBrasil = (): JSX.Element => {
        return (
            <div className='flex justify-around p-5 flex-col absolute top-1/5 right-4 bg-white max-w-[300px] max-h-[370px] rounded-md shadow border border-gray'
                style={{ transform: `translate(${position.x}px, ${position.y}px)`, cursor: dragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleMouseDown}>
                <button onClick={handleChangeIcon} className='absolute hover:scale-110 top-0 right-0 p-2'>
                    {icon ? <MdMenuBook className={'text-blue text-[22px]'} /> : <BiSolidFoodMenu className={'text-blue text-[22px]'} />}
                </button>

                {legendChange ? <div>

                    <div className='leading-tight text-blue pb-[20px]' style={{ display: icon ? 'none' : 'initial' }}>
                        <h1 className='font-bold text-lg max-md:text-md'>Legenda</h1>
                        <h3 className='text-md max-md:text-sm'>Água disponível no solo</h3>
                        <h5 className='text-md max-md:text-sm'>(mm/cm)</h5>

                    </div>

                    <div className='self-center flex flex-col justify-between h-auto text-sm space-y-2' style={{ display: icon ? 'none' : 'initial' }}>
                        {colorRanges.map((item, index) => {
                            return <div key={`${index}-${item.min + item.color}`} className='flex flex-row justify-between items-center space-x-2 '>
                                <span style={{ background: item.color, width: "25px", height: "25px" }} />
                                <span>{item.min}</span>
                                <h5> {item.text}</h5 >
                                <span>{item.max}</span>

                            </div >

                        })}
                    </div>
                </div> :
                    <div style={{ display: icon ? 'none' : 'initial' }}>
                        <img src={img && img} alt="Legend" />
                    </div>}

            </div >)
    }


    return showSolos ? legendaSolos() : legendaADBrasil();
}

export default GetLegendsMaps;