import { useContext, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbZoomInAreaFilled } from "react-icons/tb";
import { ContextMap } from "../../../contexts";
import dados_uf from '../../../assets/dados_uf.json';
import dados_um from '../../../assets/dados_municipios.json';
import type { DadosUF, dados_um_props, MunicipioProps, filterWMSProps } from "../../../@types/data";
import type { modalSearchType } from "../../../@types/components";
import { AiOutlineClear } from "react-icons/ai";
// import SelectModalSearch from "../../input/SelectModalSearch";

const ModalSearch = ({ close, onClose, onValue, handleClear }: modalSearchType) => {

    const [state, setState] = useState("");
    const [openFilterMunicipio, setOpenFilterMunicipio] = useState<boolean>(false);
    const [objMunicipioSelect, setObjMunicipioSelect] = useState<null | MunicipioProps>(null);
    const [recorte, setRecorte] = useState<number | null>(null);
    const context = useContext(ContextMap);
    const dados_uf_types: DadosUF | any = dados_uf;
    const dados_um_types: dados_um_props | any = dados_um;
    const [closedFilterWMS, setClosedFilterWMS] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState('');
    const [FILTER_WMS_OBJ, SETFILTERWMS] = useState<filterWMSProps | null>()

    const clearDefault = () => {
        setOpenFilterMunicipio(false);
        setState("");
        onClose(false);
        setRecorte(null);
        handleClear(true);
    }

    // const valoresFiltroPersonalizado = {
    //     ad: {
    //         layer: { "Água Disponível (mm/cm)": "geonode:adbrasil_b0f18f25e5eac580ec58488ae35e3918" },
    //         values: "",
    //         field: ["ad_um", "nm_mun"],

    //     },
    //     operator_num: [{ desc: ["Igual (=)", "="] }, { desc: ["Maior (>)", ">"] }, { desc: ["Menor (<)", "<"] }, { desc: ["Entre", "BETWEEN"] }, { desc: ["Maior ou Igual (>=)", ">="] }, {
    //         desc: ["Menor ou Igual (<=)", "<="]
    //     }
    //     ],
    //     opertator_tex: [{ desc: ["Inicia com", "LIKE %"] }, { desc: ["Contém", "LIKE %"] }, { desc: ["Igual (=)", "="] }],
    //     pti: {
    //         layer: { "PTI - Pot. Terras para Irrigação": "geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45" },
    //         values: ["MUITO ALTO", "ALTO", "MÉDIO", "BAIXO", "MUITO BAIXO"],
    //         field: ["pti_um"],

    //     }
    // }

    const updateFilterWMS = (newValues: Partial<filterWMSProps>) => {
      
        SETFILTERWMS(prevState => ({
            ...prevState,
            ...newValues
        }));
    }

    const handleInputChange = (event: any) => {
        const inputValue = event.target.value;
        if (isValidInput(inputValue)) {
            setFilterValue(inputValue);
            updateFilterWMS({ value: inputValue });
        }
    };

    const isValidInput = (value: string) => {
        // Verificar se o valor é um número entre 0 e 2.3
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) && numericValue >= 0 && numericValue <= 2.3;
    };

    const handleWMSCHange = () => {


        if (context?.setContext && !openFilterMunicipio && state !== "") {

            onValue(state);
            context.setContext({ filter: state, centroides: dados_uf_types[state].centroides });


        } else if (context?.setContext && openFilterMunicipio) {
            if (objMunicipioSelect && objMunicipioSelect.cod_mun && objMunicipioSelect.cod_mun !== "") {
                onValue(objMunicipioSelect.cod_mun);
                context.setContext({ filter: objMunicipioSelect.cod_mun, centroides: objMunicipioSelect.centroides });
            }

        } else if (FILTER_WMS_OBJ && context?.setContext) {

            context.setContext({
                filterWMS: FILTER_WMS_OBJ
            });
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
                    className="bg-white border rounded p-2 text-sm">
                    <option value={""}>---</option>;
                    {dados_um_types[state].map((key: MunicipioProps, index: number) => {
                        return <option key={index + key.nome} value={JSON.stringify(key)}>{key.nome}</option>
                    })}
                </select>}
            </div>)
        } else if (recorte == 2) {
            return (<div className="flex flex-col space-y-10">
                <div className="flex flex-col text-start">
                    {/* <label className="font-bold text-sm" htmlFor="layer">Layer</label> */}

                    {/* <SelectModalSearch values={valoresFiltroPersonalizado.ad.layer} title="Selecione o Mapa" id={"layer"} /> */}
                    <select
                        id="layer"
                        onChange={(e) => { setClosedFilterWMS(true); updateFilterWMS({ layer: e.currentTarget.value }) }}
                        className="bg-white border rounded p-2 text-sm ">
                        <option value={""}>---</option>
                        <option value="geonode:adbrasil_b0f18f25e5eac580ec58488ae35e3918">Água Disponível</option>
                        <option value="geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45">Potencial de Terras para irrigação</option>
                    </select>
                </div>
                {closedFilterWMS && <div className="flex flex-col text-start">
                    <label className="font-bold text-sm" htmlFor="field">Campo</label>
                    <select
                        id="field"
                        onChange={(e) => { updateFilterWMS({ field: e.currentTarget.value }) }}
                        className="bg-white border rounded p-2 text-sm ">
                        <option value={""}>---</option>
                        <option value="ad_um">AD (mm/cm)</option>
                        {/* <option value="geonode:pti_28f79bcfe1f418a6219d5af23e8c1c45">Potencial de Terras para irrigação</option> */}
                    </select>
                </div>}

                {closedFilterWMS && <div className="flex flex-col text-start">
                    <label className="font-bold text-sm" htmlFor="opr">Operador</label>
                    <select
                        id="opr"
                        onChange={(e) => { updateFilterWMS({ operator: e.currentTarget.value }) }}
                        className="bg-white border rounded p-2 text-sm ">
                        <option value={""}>---</option>
                        <option value="=">IGUAL (=)</option>
                        <option value=">">MAIOR {('(>)')}</option>
                        <option value="<">MENOR {'(<)'}</option>
                        <option value="<=">MENOR OU IGUAL {'((<=)'}</option>
                        <option value=">=">MAIOR OU IGUAL {'(>=)'}</option>

                    </select>
                </div>}

                {closedFilterWMS && <div className="flex flex-col text-start">
                    <label className="font-bold text-sm" htmlFor="filter">Valor do filtro</label>
                    <input className="border rounded-sm"
                        id="filter"
                        type="number"
                        step="0.1"
                        min="0"
                        max="2.3"
                        pattern="\d+(\.\d{1})?"
                        title="Por favor, insira um número de 0 a 2.3"
                        required
                        value={filterValue}
                        onChange={handleInputChange}
                    />
                </div>}
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
                        <option value={2}>Filtro Personalizado</option>

                    </select>

                    {selectDinamically()}
                </div>

                <div className="flex flex-row justify-center space-x-10">
                    <button className=' flex flex-col items-center text-blue  h-10 w-10 ' onClick={clearDefault}>

                        <AiOutlineClear className={'text-2xl hover:opacity-70 hover:scale-125 max-md-text-sm'} />
                        <h5 className="text-[10px]">Limpar</h5>
                    </button>
                    <button className='flex flex-col items-center text-blue  h-10 w-10 ' onClick={() => onClose(false)}>

                        <IoMdCloseCircle className={'text-2xl hover:opacity-70 hover:scale-125 max-md-text-sm'} />
                        <h5 className="text-[10px]">Cancelar</h5>
                    </button>

                    <button className=' flex flex-col items-center text-blue  h-10 w-10 ' onClick={handleWMSCHange}>

                        <TbZoomInAreaFilled className={'text-2xl hover:opacity-70 hover:scale-125 max-md-text-sm'} />
                        <h5 className="text-[10px]">Buscar</h5>
                    </button>
                </div>
            </div>
        </div > : null;


}
export default ModalSearch;