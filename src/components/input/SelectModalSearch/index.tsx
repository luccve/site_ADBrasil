import { filterWMSProps } from "../../../@types/data";

interface SelectModalSearch extends React.SelectHTMLAttributes<HTMLSelectElement> {
    title: string;
    id: string;
    setItem: string;
    handleChange: (newValues: Partial<filterWMSProps>) => void;
    values: string[] | layer | string | any;

}
interface layer {
    [key: string]: string[] | any;
}



const SelectModalSearch: React.FC<SelectModalSearch> = ({ title, id, values }: SelectModalSearch) => {



    return <>
        <div className="flex flex-col">
            <label className="font-semibold text-turquoise text-sm" htmlFor={id}>{title}</label>
            <select className="rounded-sm bg-white border " name={id} id={id}
            >
                <option className="text-sm" value={undefined}>{'---'}</option>
                {Object.keys(values).map((value, index) =>
                    <option key={index + Math.random() * 1000} className="text-sm" value={values[value]}>{value}</option>
                )}

            </select>
        </div>
    </>;
}

export default SelectModalSearch;