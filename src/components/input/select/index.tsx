import { useState, useRef } from 'react';
import '../../../App.css'
import type { SelectInputProps } from '../../../@types/data';

const Select = ({ array, inputTitle, onSelect, onValue, onClick }: SelectInputProps) => {
    const index = (Math.random() * 1000).toString();

    const [_value, setValue] = useState<string>('');

    const selectInput = useRef(null);


    return (
        <div className='max-md:my-2 my-6 max-md:w-[90%] min-w-[70%] h-full'>
            <select
                id={index}
                ref={selectInput}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                    onValue(e.target.value);
                    onSelect(e.target.options[e.target.selectedIndex].text);

                    onClick()
                }}


                className='rounded w-full p-1.5 text-lg max-md:text-sm border border-gray border-opacity-40 bg-white  shadow-lg
                            text-center'
            >
                {array ? <option className='' value="" disabled>Selecione uma opção de {inputTitle}:</option> :
                    <option className='' value="" disabled>Selecione uma opção de filtro.</option>}
                {array && array.map((item: any, index) =>
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
