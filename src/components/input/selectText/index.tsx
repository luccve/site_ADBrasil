import React, { SelectHTMLAttributes } from 'react'
import '../../../App.css'
import { perfis } from '../../../@types/data'

interface selectProps extends
    SelectHTMLAttributes<HTMLSelectElement> {
    Valores: perfis[];
    SelectName: React.Dispatch<React.SetStateAction<string | number | null>>;
    onClick: () => void;
}

const SelectText: React.FC<selectProps> = ({ Valores, SelectName, onClick }) => {


    return <div className='max-md:my-2 my-6 max-md:w-[90%] min-w-[70%] h-full'>
        <select
            className='my-5 rounded-md text-center text-lg p-1.5
        w-full max-md:text-sm shadow-md bg-white
        border border-gray border-opacity-40'
            onChange={(e) => {
                onClick();
                SelectName(e.target.options[e.target.selectedIndex].text)
            }}
        >
            {Valores.map((item) =>
                <option key={item.value + item.key} value={item.mediana}>{item.value}</option>
            )}
        </select>
    </div>
}

export default SelectText;