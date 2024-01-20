import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbZoomInAreaFilled } from "react-icons/tb";

interface modalSearchType {
    close: boolean;
    onClose: React.Dispatch<boolean>;
    onValue: React.Dispatch<string | null>;
}

const ModalSearch = ({ close, onClose, onValue }: modalSearchType) => {

    const [state, setState] = useState("")

    const states = [
        { sigla_uf: 'AC', nome: 'Acre' },
        { sigla_uf: 'AL', nome: 'Alagoas' },
        { sigla_uf: 'AP', nome: 'Amapá' },
        { sigla_uf: 'AM', nome: 'Amazonas' },
        { sigla_uf: 'BA', nome: 'Bahia' },
        { sigla_uf: 'CE', nome: 'Ceará' },
        { sigla_uf: 'DF', nome: 'Distrito Federal' },
        { sigla_uf: 'ES', nome: 'Espírito Santo' },
        { sigla_uf: 'GO', nome: 'Goiás' },
        { sigla_uf: 'MA', nome: 'Maranhão' },
        { sigla_uf: 'MT', nome: 'Mato Grosso' },
        { sigla_uf: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla_uf: 'MG', nome: 'Minas Gerais' },
        { sigla_uf: 'PA', nome: 'Pará' },
        { sigla_uf: 'PB', nome: 'Paraíba' },
        { sigla_uf: 'PR', nome: 'Paraná' },
        { sigla_uf: 'PE', nome: 'Pernambuco' },
        { sigla_uf: 'PI', nome: 'Piauí' },
        { sigla_uf: 'RJ', nome: 'Rio de Janeiro' },
        { sigla_uf: 'RN', nome: 'Rio Grande do Norte' },
        { sigla_uf: 'RS', nome: 'Rio Grande do Sul' },
        { sigla_uf: 'RO', nome: 'Rondônia' },
        { sigla_uf: 'RR', nome: 'Roraima' },
        { sigla_uf: 'SC', nome: 'Santa Catarina' },
        { sigla_uf: 'SP', nome: 'São Paulo' },
        { sigla_uf: 'SE', nome: 'Sergipe' },
        { sigla_uf: 'TO', nome: 'Tocantins' }
    ];

    const handleWMSCHange = () => {
        onValue(state);
    }

    return close ?

        <div className={`bg-white w-[350px] h-auto p-2 rounded-xl shadow border border-gray 
    absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100`}>
            <div className="space-y-5">
                <div className="space-y-5 text-blue">
                    <h1 className="font-bold">Selecione o estado:</h1>
                    <select
                        onChange={(e) => setState(e.currentTarget.value)}
                        className="bg-white border rounded p-2 text-sm focus:scale-125">
                        {states.map((state, index) => <option key={index + state.sigla_uf} value={state.sigla_uf}>{state.nome}</option>)}
                    </select>
                </div>

                <div>
                    <button className='text-blue  h-10 w-10 ' onClick={() => onClose(false)}>

                        <IoMdCloseCircle className={'text-2xl hover:opacity-70 hover:scale-125 max-md-text-sm'} />

                    </button>
                    <button className='text-blue  h-10 w-10 ' onClick={handleWMSCHange}>

                        <TbZoomInAreaFilled className={'text-2xl hover:opacity-70 hover:scale-125 max-md-text-sm'} />
                    </button>
                </div>
            </div>
        </div> : null;


}
export default ModalSearch;