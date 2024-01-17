import React, { useState, useEffect, useContext } from 'react';
import type { ModalAlertProps } from '../../../@types/components';
import { ContextMap } from '../../../contexts';
import '../../../App.css';
import LoadingPage from '../../loading';
import { FaMinimize, FaMaximize } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { GeoInfoData } from '../../../@types/data';

const ModalMap: React.FC<ModalAlertProps> = ({ onClose, visible }: ModalAlertProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(true);
    const [closeOrOpenBox, setCloseOrOpenBox] = useState(true);
    const [title, setTitle] = useState('Unidades de mapeamento')
    const [messageUnidade, setMessageUnidade] = useState<string | object>({})
    const [messageComponente, setMessageComponente] = useState<string | object>({})

    const context = useContext<GeoInfoData | null>(ContextMap);

    useEffect(() => {
        try {
            setIsLoading(true);
            setTitle('Unidade de mapeamento não encontrada');
            setMessageUnidade('Não foi encontrado informações de Água Disponível para área selecionada');
            setMessageComponente('Não foi encontrado informações de Água Disponível para área selecionada');
            if (context?.resposta === 200) {


                let message: Record<string, any> = {};

                if (context.ad_c1) {

                    setMessageUnidade({
                        ID: context.ID,
                        "Água Disponível": `${context.ad_um} mm/cm`,
                        Ordem: context.c1_class,
                        Relevo: context.c1_relevo,
                        "Potencia para irrigação": context.classe_terra,
                        Textura: context.textura_c1,
                        Latitude: context.Latitude,
                        Longitude: context.Longitude,
                    });

                    message = {
                        "Componente 1": `${context.solo_c1 ? context.solo_c1 : 'Não informado'}`,
                        "Relevo": `${context.c1_relevo ? context.c1_relevo : 'Não informado'}`,
                        "Textura": `${context.textura_c1 ? context.textura_c1 : 'Não informado'}`,
                        "Rochosidade": `${context.rochosidad ? context.rochosid_1 : 'Não informado'}`,
                        "Pedregosidade": `${context.pedregosid ? context.pedregos_1 : 'Não informado'}`,
                        "Valor de AD (mm/cm)": `${context.ad_c1 ? context.ad_c1 : 'Não informado'}`,
                        "Classe de terra": `${context.ct_c1 ? context.ct_c1 : 'Não informado'}`,
                    };


                } else {
                    message = {
                        "Tipo de terreno": `${context.c1_class ? context.c1_class : 'Não informado'}`,
                    }

                    setMessageUnidade({
                        ID: context.ID,
                        "Tipo de terreno": context.c1_class,

                        Latitude: context.Latitude,
                        Longitude: context.Longitude,
                    });
                }

                const lista = [context.solo_c2, context.solo_c3, context.solo_c4, context.solo_c5]

                for (const value in lista) {
                    if (lista[value]) {
                        message = {
                            ...message,
                            [`Componente ${Number(value) + 2}`]: lista[value],
                            [`Relevo ${Number(value) + 2}`]: context[`c${Number(value) + 2}_relevo`] ? context[`c${Number(value) + 2}_relevo`] : "Não informado",
                            [`Textura ${Number(value) + 2}`]: context[`textura_c${Number(value) + 2}`] ? context[`textura_c${Number(value) + 2}`] : "Não informado",
                            [`Rochosidade ${Number(value) + 2}`]: context[`rochosid_${Number(value) + 2}`] ? context[`rochosid_${Number(value) + 2}`] : "Não informado",
                            [`Pedregosidade ${Number(value) + 2}`]: context[`pedregos_${Number(value) + 2}`] ? context[`pedregos_${Number(value) + 2}`] : "Não informado",
                            [`Valor de AD (mm/cm) ${Number(value) + 2}`]: context[`ad_c${Number(value) + 2}`] ? context[`ad_c${Number(value) + 2}`] : "Não informado",
                            [`Classe de terra ${Number(value) + 2}`]: context[`ct_c${Number(value) + 2}`] ? context[`ct_c${Number(value) + 2}`] : "Não informado",
                        }
                        continue
                    }
                    break;
                }

                setMessageComponente(message);

                setTitle('Unidades de mapeamento');


            }
        } finally {
            setTimeout(() => { setIsLoading(false); }, 1000)

        }


    }, [context?.ad_um, visible]);

    const renderMessageUnidade = () => {


        if (Object.values(messageUnidade)[0] == 'undefined mm/cm') {
            return <p>Não foi encontrado informações de Água Disponível</p>
        } else if (typeof messageUnidade === 'string') {
            return <p>{messageUnidade.toString()}</p>;
        } else if (typeof messageUnidade === 'object') {
            return (
                <div className='py-2 space-y-[15px] text-start'>
                    {Object.keys(messageUnidade).map((key) => (
                        <p className='text-sm max-md:text-[11px] font-semibold text-blue' key={key}>{key === "AD" ? "Água Disponível" : key}: {(messageUnidade as Record<string, string>)[key]}</p>
                    ))}
                </div>
            );
        }
        return null;
    };



    const renderMessageComponente = () => {


        if (Object.values(messageComponente)[0] == 'undefined mm/cm') {
            return <p>Não foi encontrado informações de Água Disponível</p>
        } else if (typeof messageComponente === 'string') {
            return <p>{messageComponente.toString()}</p>;
        } else if (typeof messageComponente === 'object') {
            return (
                <div className='py-2 space-y-[5px] text-start'>
                    {Object.keys(messageComponente).map((key) => (
                        <p className='text-[10px] max-md:text-[8px] font-semibold text-blue' key={key}>{key === "AD" ? "Água Disponível" :
                            key}: {(messageComponente as Record<string, string>)[key]}

                        </p>

                    ))}
                </div>
            );
        }
        return null;
    };


    return (
        <>
            {visible && (
                <div className='absolute min-h-[50px] w-[400px] max-md:w-[200px] border border-blue_l
                bg-white rounded-lg shadow-md flex items-center justify-center animate-fade-menu
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-2 flex-col'>
                    {active ? <div style={{display: !closeOrOpenBox? "none":"block"}} className='p-2 relative w-full h-full'>
                        {!isLoading && <h1 className='text-lg max-md:text-sm leading-snug -tracking-tighter font-semibold text-blue border-b-2 py-2'>{title ? title : "Erro!"}</h1>}
                        {isLoading ? (
                            <LoadingPage /> // Mostra o spinner de carregamento
                        ) : (
                            renderMessageUnidade()

                        )}

                    </div> :
                        <div className='p-2 relative w-full h-full'>
                            <h1 className='text-lg max-md:text-sm leading-snug -tracking-tighter font-semibold text-blue border-b-2 py-2'>Componentes da Unidade</h1>
                            <div className='py-2 space-y-[15px] text-start'>
                                {renderMessageComponente()}
                            </div>


                        </div>}
                    <button className='absolute p-1 m-3 top-[1px] left-[330px] max-md:left-[150px] ' onClick={() => onClose(false)}>

                        <IoMdCloseCircle className={'text-2xl hover:opacity-70'} />

                    </button>

                    <button className='absolute p-1 m-3 top-[1px] left-[3px] max-md:left-[120px] ' onClick={() => setCloseOrOpenBox(!closeOrOpenBox)}>

                        {closeOrOpenBox ? <FaMaximize className={'text-xl hover:opacity-70'} /> : <FaMinimize className={'text-xl hover:opacity-70'} />}
                    </button>

                    {!isLoading && <div style={{display: !closeOrOpenBox? "none":"flex"}} className='text-md max-md:text-sm bg-white rounded border border-blue w-full flex flex-row text-center items-center'>
                        <h1 onClick={() => setActive(true)} className={`w-[50%] text-${!active ? "white" : "black"} border bg-${active ? "white" : "blue"} border-blue_l hover:font-bold cursor-pointer`}>AD</h1>
                        <h1 onClick={() => setActive(false)} className={`w-[50%] text-${!active ? "black" : "white"} bg-${!active ? "white" : "blue"} border border-blue_l hover:font-bold cursor-pointer`}>Componente</h1>
                    </div>}
                </div >
            )}
        </>
    );
}

export default ModalMap;
