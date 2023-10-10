import React from 'react';
import type { ModalAlertProps } from '../../../@types/components';
import { MdDownloadDone } from 'react-icons/md';
import '../../../App.css'

const ModalAlert: React.FC<ModalAlertProps> = ({ message, title, onClose, visible }: ModalAlertProps) => {

    const renderMessage = () => {
        
        if (typeof message === 'string') {
            return <p>{message}</p>;
        } else if (typeof message === 'object') {
            return (
                <div>
                    {Object.keys(message).map((key) => (
                        <p key={key}>{key}: {(message as Record<string, string>)[key]}</p> 
                        // AQui esta dando esse erro
                    ))}
                </div>
            );
        }
        return null;
    }

    return (
        <>
            {visible && (
                <div className='absolute h-auto w-[30%] max-md:w-[50%]  border border-blue_l bg-white rounded-lg shadow-md flex items-center justify-center animate-fade-menu top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
                    <div>
                        <h1 className='text-xl py-4 leading-snug -tracking-tighter font-semibold'>{title ? title : "Erro!"}</h1>
                        {renderMessage()}
                        <button onClick={() => onClose(false)}>
                            <button className='bg-blue_l rounded-sm shadow-md p-1 m-3'>
                                <MdDownloadDone />
                            </button>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalAlert;
