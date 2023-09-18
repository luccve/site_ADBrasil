import React from 'react';
import { useState } from 'react';
import '../../../App.css';
import { AiFillCloseCircle } from 'react-icons/ai'
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai';
import { LatLngExpression, LatLng } from 'leaflet';



interface ModalAlertProps {
    title?: string;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    latLong: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
    coords: LatLngExpression | null;
}

const ModalComponente: React.FC<ModalAlertProps> = React.memo(({ title, onClose, latLong, coords }: ModalAlertProps) => {

    const { lat, lng } = coords ? coords as { lat: number, lng: number } : { lat: 0, lng: 0 };


    const [latInput, setLat] = useState(lat.toString());
    const [lngInput, setLng] = useState(lng.toString());

    const toggleChange = (e?: any) => {

        const inputValue = e.target.value;
        const filterValue = inputValue.replace(/[^0-9.-]/g, '') // Remove todos os caracteres exceto números e '.'
        
        e.target.id === 'lat' ? setLat(filterValue) : setLng(filterValue);


    };

    const handleClear = () => {
        setLat("");
        setLng("");
    }

    const verify = () => {
        if (latInput !== '' || lngInput !== '') {
            
            latLong(new LatLng(Number(latInput), Number(lngInput)));
            onClose(false);
            return;
        }
        alert('Preencha os campos corretamente');
    }

    return (

        <>
            <div className='flex flex-col space-y-4 h-auto w-auto max-md:w-[350px] p-5 rounded-xl items-center justify-center bg-white
                transition-all duration-300 ease-in-out 
                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
                <div className='flex flex-col justify-center items-center text-blue font-bold'>

                    <h1 className='font-bold  text-blue'>{title}</h1>
                    <br />
                    <label htmlFor="lat">Latitude</label>

                    <input value={latInput} id='lat' onChange={toggleChange} className='mt-2 block w-2/6 px-3 py-2 bg-white border border-gray rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500' type="text" />
                    <br />
                    <label htmlFor="lng">Longitude</label>

                    <input value={lngInput} id='lng' onChange={toggleChange} className='mt-2 block w-2/6  px-3 py-2 bg-white border border-gray rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500' type="text" />

                </div>
                <div className='flex flex-row space-x-10'>

                    <button className='text-gray text-3xl active:scale-125' onClick={() => onClose(false)}><AiFillCloseCircle /></button>
                    <button className='text-gray text-3xl active:scale-125 transition-transform duration-100 ease-in-out' onClick={verify}><AiOutlineSearch /></button>
                    <button className='text-gray text-3xl active:scale-125 transition-transform duration-100 ease-in-out' onClick={handleClear}><AiOutlineClear /></button>
                </div>
            </div>
        </>

    );

});

export default ModalComponente;
