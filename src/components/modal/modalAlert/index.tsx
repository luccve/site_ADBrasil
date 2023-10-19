import React, { useState, useEffect } from 'react';
import type { ModalAlertProps } from '../../../@types/components';
import {  MdDownloadDone } from 'react-icons/md';
import '../../../App.css';
import LoadingPage from '../../loading';
import BtnRegular from '../../btn/BtnRegular';

const ModalAlert: React.FC<ModalAlertProps> = ({ message, title, onClose, visible }: ModalAlertProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        if (message) {
            // Simula uma carga de dados 
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [message]);

    const renderMessage = () => {
        if (typeof message === 'string') {
            return <p>{message}</p>;
        } else if (typeof message === 'object') {
            return (
                <div className='px-2 space-y-1'>
                    {Object.keys(message).map((key) => (
                        <p className='text-sm' key={key}>{key}: {(message as Record<string, string>)[key]}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {visible && (
                <div className='absolute h-auto w-[30%] max-md:w-[50%] border border-blue_l
                bg-white rounded-lg shadow-md flex items-center justify-center animate-fade-menu
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
                    <div className='py-5'>
                        {!isLoading && <h1 className='text-xl py-4 leading-snug -tracking-tighter font-semibold text-blue'>{title ? title : "Erro!"}</h1>}
                        {isLoading ? (
                            <LoadingPage /> // Mostra o spinner de carregamento
                        ) : (
                            renderMessage()


                        )}
                        
                        <button className=' p-1 m-3'>
                            <BtnRegular Title='Fechar' handleClick={() => onClose(false)} >
                                <MdDownloadDone />
                            </BtnRegular>
                        </button>

                    </div>
                </div >
            )}
        </>
    );
}

export default ModalAlert;
