import React from 'react';
import { InputTextProps } from '../../../@types/components';
import '../../../App.css';
import { AiOutlineClear } from "react-icons/ai";

const InputText: React.FC<InputTextProps> = ({ Title, handleFocus, handleBlur, handleTextChange, state, value }: InputTextProps) => {
    return (
        <div className='flex flex-col items-start'>
            <a className='text-sm -tracking-normal font-semibold py-2' href={`#${Title}`}>{Title}</a>
            <div className='flex flex-row space-x-2 items-center'>
                <input className='outline-double focus:text-black focus:text h-5 text-sm rounded-md w-[200px] max-md:w-[200px] max-md:h-8 max-md:text-xs border-2 border-white
                     focus:ring-blue_l focus:border-white '
                    id={Title}
                    type="text"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInput={(e) => handleTextChange(state, e.currentTarget)}
                    value={value}
                />
                <button className='text-sm' onClick={() => state("")}>
                    <AiOutlineClear />
                </button>
            </div>
        </div>
    );
}

export default InputText;
