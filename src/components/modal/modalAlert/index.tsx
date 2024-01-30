import React, { useState, useEffect } from 'react';
import type { ModalAlertProps } from '../../../@types/components';
import { MdDownloadDone } from 'react-icons/md';
import '../../../App.css';
import LoadingPage from '../../loading';
import BtnRegular from '../../btn/BtnRegular';

const ModalAlert: React.FC<ModalAlertProps> = ({ message, title, onClose, visible }: ModalAlertProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [newLoading, setNewloading] = useState(true);
    const [_storedValue, setStoredValue] = useState('');

    // Chave que será usada para armazenar e recuperar o valor no localStorage
    const localStorageKey = 'myStoredValue';

    useEffect(() => {
        setIsLoading(true)
        if (message) {
            // Simula uma carga de dados 
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }, [message]);
   
    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData == "on") {
            setNewloading(false);
        }
    }, [message]);

    const updateStoredValue = (newValue: string) => {
        setStoredValue(newValue);
        localStorage.setItem(localStorageKey, newValue);
    };

    const renderMessage = () => {
        if (typeof message === 'string') {
            return <p className='text-sm text-black'>{message}</p>;
        } else if (typeof message === 'object') {
            return (
                <div className='px-2 space-y-1'>
                    {Object.keys(message).map((key) => (
                        <p className='max-md:text-sm text-md' key={key}>{key}: {(message as Record<string, string>)[key]}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {visible && newLoading && (
                <div className='absolute h-auto w-[30%] max-md:w-[80%] border border-blue_l
                bg-white rounded-lg shadow-md flex items-center justify-center animate-fade-menu
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-5'>
                    <div className='py-5'>
                        {!isLoading && <h1 className='text-xl max-md:text-md py-4 leading-snug -tracking-tighter font-semibold text-blue'>{title ? title : "Erro!"}</h1>}
                        {isLoading && newLoading ? (
                            <LoadingPage /> // Mostra o spinner de carregamento
                        ) : (
                            renderMessage()


                        )}


                        <BtnRegular Title='Fechar' handleClick={() => onClose(false)} >
                            <MdDownloadDone className={"h-6 w-6"} />
                        </BtnRegular>

                        <div className='text-sm text-blue flex space-x-2 '>
                            <label htmlFor="local">Não vê novamente</label>
                            <input className='cursor-pointer'
                                onChange={(e) => updateStoredValue(e.target.value)}
                                type="checkbox" name="" id="local" />
                        </div>

                    </div>
                </div >
            )}
        </>
    );
}

export default ModalAlert;
