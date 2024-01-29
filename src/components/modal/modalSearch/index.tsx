import { useContext, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbZoomInAreaFilled } from "react-icons/tb";
import { ContextMap } from "../../../contexts";
import dados_uf from '../../../assets/dados_uf.json';
import dados_um from '../../../assets/dados_municipios.json';
import type { DadosUF, dados_um_props, MunicipioProps } from "../../../@types/data";


interface modalSearchType {
    close: boolean;
    onClose: React.Dispatch<boolean>;
    onValue: React.Dispatch<string | null>;
}

const ModalSearch = ({ close, onClose, onValue }: modalSearchType) => {

    const [state, setState] = useState("");
    const [openFilterMunicipio, setOpenFilterMunicipio] = useState<boolean>(false);
    const [objMunicipioSelect, setObjMunicipioSelect] = useState<null | MunicipioProps>(null);
    const [recorte, setRecorte] = useState<number | null>(null);
    const context = useContext(ContextMap);
    const dados_uf_types: DadosUF | any = dados_uf;
    const dados_um_types: dados_um_props | any = dados_um;



    const handleWMSCHange = () => {


        if (context?.setContext && !openFilterMunicipio && state !== "") {

            onValue(state);
            context.setContext({ filter: state, centroides: dados_uf_types[state].centroides });


        } else if (context?.setContext && openFilterMunicipio) {
            if (objMunicipioSelect && objMunicipioSelect.cod_mun && objMunicipioSelect.cod_mun !== "") {
                onValue(objMunicipioSelect.cod_mun);
                context.setContext({ filter: objMunicipioSelect.cod_mun, centroides: objMunicipioSelect.centroides });
            }

        }
        setOpenFilterMunicipio(false);
        setState("");
        onClose(false);
        setRecorte(null);
    }


    function selectDinamically() {

        if (recorte == 0) {
            return (<>
                <select
                    onChange={(e) => setState(e.currentTarget.value)}
                    className="bg-white border rounded p-2 text-sm focus:scale-125">
                    <option value={""}>---</option>;
                    {Object.keys(dados_uf_types).map((key, index) => {
                        const item = dados_uf_types[key];
                        return <option key={key + index} value={key}>{item.nome}</option>;
                    })}
                </select>
            </>)
        } else if (recorte == 1) {
            return (<div className={'flex flex-row justify-around'}>
                <select
                    onChange={(e) => { setState(e.currentTarget.value); setOpenFilterMunicipio(true); }}
                    className="bg-white border rounded p-2 text-sm ">
                    <option value={""}>---</option>;
                    {Object.keys(dados_uf_types).map((key, index) => {
                        return <option key={key + index} value={key}>{key}</option>;
                    })}
                </select>
                {openFilterMunicipio && <select
                    onChange={(e) => { setObjMunicipioSelect(JSON.parse(e.currentTarget.value)) }}
                    className="bg-white border rounded p-2 text-sm ">
                    <option value={""}>---</option>;
                    {dados_um_types[state].map((key: MunicipioProps, index: number) => {
                        return <option key={index + key.nome} value={JSON.stringify(key)}>{key.nome}</option>
                    })}
                </select>}
            </div>)
        }

    }




    return close ?

        <div className={`bg-white w-[350px] h-auto p-2 rounded-xl shadow border border-gray 
    absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100`}>
            <div className="space-y-5">
                <div className="space-y-5 text-blue">
                    <select
                        onChange={(e) => setRecorte(Number(e.currentTarget.value))}
                        className="bg-white border rounded p-2 text-sm focus:scale-125">
                        <option value={-1}>Selecione um recorte</option>
                        <option value={0}>Limite Federativo</option>
                        <option value={1}>Limite Municipal</option>

                    </select>

                    {selectDinamically()}
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
        </div > : null;


}
export default ModalSearch;