import { useState } from 'react';
import '../../../App.css'
import type { SelectInputProps } from '../../../@types/data';

const Select = ({ array, inputTitle, onSelect, onValue, onClick }: SelectInputProps) => {
    const index = (Math.random() * 1000).toString();


    const [value, setValue] = useState<string>('');

    return (
        <div className='max-md:my-2 my-6 max-md:w-[90%] min-w-[70%] h-full'>
            <select
                id={index}
                onChange={(e) => {
                    setValue(e.target.value);
                    onValue(e.target.value);
                    onSelect(e.target.options[e.target.selectedIndex].text);
                    onClick()
                }}
                
                value={value}
                className='rounded flex flex-wrap text-2xl w-full p-1.5 max-md:text-base border border-gray bg-white border-opacity-40 shadow-lg
                            text-center'
            >
                {array ? <option className='' value="" disabled>Selecione uma opção de {inputTitle}:</option> :
                    <option className='' value="" disabled>Selecione uma opção de filtro.</option>}
                {array && array.map((item: any) =>
                    <option
                        key={index + item.value}
                        value={item.mediana}
                        
                    >
                        {item.value}
                    </option>
                )}
            </select>
        </div>
    );
}

export default Select;
