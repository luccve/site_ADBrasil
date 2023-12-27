import React, { useState, useEffect } from 'react';
import type { ModalAlertProps } from '../../../@types/components';

import '../../../App.css';
import LoadingPage from '../../loading';

import { IoMdCloseCircle } from "react-icons/io";

const ModalMap: React.FC<ModalAlertProps> = ({ message, title, onClose, visible }: ModalAlertProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        if (message) {

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [message]);

    const renderMessage = () => {


        if (Object.values(message)[0] == undefined) {
            return <p>Não foi encontrado informações de Água Disponível</p>
        } else if (typeof message === 'string') {
            return <p>{message}</p>;
        } else if (typeof message === 'object') {
            return (
                <div className='py-2 space-y-[15px] text-start'>
                    {Object.keys(message).map((key) => (
                        <p className='text-sm max-md:text-[11px] font-semibold text-blue' key={key}>{key === "AD" ? "Água Disponível" : key}: {(message as Record<string, string>)[key]}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {visible && (
                <div className='absolute h-auto w-[400px] max-md:w-[200px] border border-blue_l
                bg-white rounded-lg shadow-md flex items-center justify-center animate-fade-menu
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-2 flex-col'>
                    {active ? <div className='p-2 relative w-full h-full'>
                        {!isLoading && <h1 className='text-lg max-md:text-sm leading-snug -tracking-tighter font-semibold text-blue border-b-2 py-2'>{title ? title : "Erro!"}</h1>}
                        {isLoading ? (
                            <LoadingPage /> // Mostra o spinner de carregamento
                        ) : (
                            renderMessage()


                        )}

                        {!isLoading && <button className='absolute p-1 m-3 top-[1px] left-[330px] max-md:left-[150px] ' onClick={() => onClose(false)}>

                            <IoMdCloseCircle className={'text-2xl hover:opacity-70'} />

                        </button>}

                    </div> :
                        <div className='p-2 relative w-full h-full'>
                            <h1 className='text-lg max-md:text-sm leading-snug -tracking-tighter font-semibold text-blue border-b-2 py-2'>Componentes da Unidade</h1>
                            <h1>TESTE</h1>

                            <button className='absolute p-1 m-3 top-[1px] left-[330px] max-md:left-[150px] ' onClick={() => onClose(false)}>

                                <IoMdCloseCircle className={'text-2xl hover:opacity-70'} />

                            </button>
                        </div>}

                    {!isLoading && <div className='text-md max-md:text-sm bg-white rounded border border-blue w-full flex flex-row text-center items-center'>
                        <h1 onClick={() => setActive(true)} className={`w-[50%] text-${!active ? "white" : "black"} border bg-${active ? "white" : "blue"} border-blue_l hover:font-bold cursor-pointer`}>AD</h1>
                        <h1 onClick={() => setActive(false)} className={`w-[50%] text-${!active ? "black" : "white"} bg-${!active ? "white" : "blue"} border border-blue_l hover:font-bold cursor-pointer`}>Componente</h1>
                    </div>}
                </div >
            )}
        </>
    );
}

export default ModalMap;
