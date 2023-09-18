import React from 'react';
import type { ModalAlertProps } from '../../../@types/components';
import { MdDownloadDone } from 'react-icons/md';
import '../../../App.css'

const ModalAlert: React.FC<ModalAlertProps> = ({ message, title, onClose, visible }: ModalAlertProps) => {

    return <>{visible && <div
        className='absolute h-auto w-[30%] max-md:w-[50%]  border border-blue_l
    bg-white rounded-lg shadow-md flex items-center justify-center animate-wiggle'>
        <div>
            <h1 className='text-lg py-4 leading-snug -tracking-tighter'>{title ? title : "Erro!"}</h1>
            <p className='text-sm'>{message}</p>
            <button onClick={() => onClose(false)}>
                <button className='bg-blue_l rounded-sm shadow-md p-1 m-3'>
                    <MdDownloadDone />
                </button>
            </button>
        </div>
    </div>}</>;
}

export default ModalAlert;