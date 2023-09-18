import React from 'react';
import { InputTextProps } from '../../../@types/components'; // Certifique-se de importar a interface correta
import '../../../App.css';

const InputText: React.FC<InputTextProps> = ({ Title, handleFocus, handleBlur, handleTextChange, state, value }: InputTextProps) => {
    return (
        <div className='flex flex-col items-start'>
            <a className='text-sm -tracking-normal font-semibold py-2' href={`#${Title}`}>{Title}</a>
            <input className='outline-double focus:text-black focus:text h-5 text-sm rounded-md w-[200px] max-md:w-[200px] max-md:h-8 max-md:text-xs border-2 border-white
                     focus:ring-blue_l focus:border-white '
                id={Title}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => handleTextChange(state, e.currentTarget)}
                value={value}
            />
        </div>
    );
}

export default InputText;
