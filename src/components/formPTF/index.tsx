import { useEffect, useState } from 'react';
import '../../App.css'
import type { PTFttypes } from '../../@types/components';
import PTF from '../../ptfFunctions';
import { MdCleaningServices } from 'react-icons/md'
import { MdCalculate } from 'react-icons/md'
import { TbTestPipe2 } from 'react-icons/tb'
import ModalAlert from '../modal/modalAlert';
import BtnRegular from '../btn/BtnRegular';
import InputText from '../input/inputText';
import ptfJson from '../../database/data/ptfJson';
import ResultadoPTF from '../resultadoPTF';

interface PtfTypeProps {

    author: string;
    ptf: number[] | number;
}



const FormPTF = ({ tab, region }: PTFttypes) => {

    const [modalAlert, setModalAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState("");
    const [areia, setAreia] = useState("");
    const [areiaFina, setAreiaFina] = useState("");
    const [areiaGrossa, setAreiaGrossa] = useState("");
    const [silte, setSilte] = useState("");
    const [argila, setArgila] = useState("");
    const [densidade, setDensidade] = useState("");
    const [carbonoOrganico, setCarbonoOrganico] = useState("");
    const [materiaOrganico, setMateriaOrganico] = useState("");
    const [pH, setpH] = useState("");
    const [ctc, setCtc] = useState("");
    const [umidadeEquivalente, setUmidadeEquivalente] = useState("");
    const [resultadoPTF, setResultadoPTF] = useState<PtfTypeProps[]>([]);
    const [resultadoView, setResultadoView] = useState(false);
    const [ptfSelectIndex, setPtfIndex] = useState<number>(-1);
    const [_isFocused, setIsFocused] = useState(false);


    useEffect(() => {
        setResultadoView(false);
    }, [ptfSelectIndex]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleTextChange = (state: React.Dispatch<React.SetStateAction<string>>, e: EventTarget & HTMLInputElement) => {
        const newValue = e.value.replace(/[^\d,.]/g, '').replace(',', '.');
        state(newValue);

    };

    const handleClear = () => {
        setAreia("");
        setAreiaFina("");
        setAreiaGrossa("");
        setSilte("");
        setArgila("");
        setDensidade("");
        setCarbonoOrganico("");
        setCtc("");
        setpH("");
        setMateriaOrganico("");
        setUmidadeEquivalente("");
        setResultadoView(false)
        setPtfIndex(-1);
    };

    const handleTeste = () => {

        if (tab === 1) {
            const novaAreiaFina = Math.floor(Math.random() * 25) + 10;
            const novaAreiaGrossa = Math.floor(Math.random() * 25) + 10;
            const novaAreia = novaAreiaFina + novaAreiaGrossa;
            const novaSilte = Math.floor(Math.random() * 15) + 1;
            const novaArgila = Math.abs(100 - novaAreia - novaSilte);
            const densidade = Math.random() * 2;
            const novaDensidade = densidade < 0.8 ? 0.8 : densidade.toPrecision(3);

            setSilte(novaSilte.toString());
            setArgila(novaArgila.toString());
            setDensidade(novaDensidade.toString());
            setAreia(novaAreia.toString()); ''

            return
        }

        if (tab === 2) {
            const novaAreiaFina = Math.floor(Math.random() * 25) + 10;
            const novaAreiaGrossa = Math.floor(Math.random() * 25) + 10;
            const novaSilte = Math.floor(Math.random() * 15) + 1;
            const novaArgila = Math.abs((novaAreiaFina + novaAreiaGrossa + novaSilte) - 100);
            const novoCarbonoOrganico = (Math.random() * 2).toFixed(3);
            const novoMateriaOrganico = (Math.random() * 2).toFixed(3);
            const densidade = Math.random() * 2;
            const novaDensidade = densidade < 1.6 ? 1.7 : densidade.toPrecision(3);
            const eq = Math.random();
            const novaEq = eq < 0.01 || eq > 0.54 ? 0.25 : eq;
            const eqPH = Math.random() * 8;
            const novoPh = eqPH < 3.5 ? 3.5 : eqPH;
            const novaCtc = Math.floor(Math.random() * 50) + 1;

            setAreiaFina(novaAreiaFina.toString());
            setAreiaGrossa(novaAreiaGrossa.toString());
            setSilte(novaSilte.toString());
            setArgila(novaArgila.toString());
            setCarbonoOrganico(novoCarbonoOrganico.toString());
            setDensidade(novaDensidade.toString());
            setCtc(novaCtc.toString());
            setpH(novoPh.toPrecision(3))
            setMateriaOrganico(novoMateriaOrganico.toString());
            setUmidadeEquivalente(novaEq.toPrecision(3))
            return
        } else {
            const novaAreiaFina = Math.floor(Math.random() * 25) + 10;
            const novaAreiaGrossa = Math.floor(Math.random() * 25) + 10;
            const novaAreia = novaAreiaFina + novaAreiaGrossa;
            const novaSilte = Math.floor(Math.random() * 15) + 1;
            const novaArgila = Math.abs(100 - novaAreia - novaSilte);

            setAreia(novaAreia.toString());
            setSilte(novaSilte.toString());
            setArgila(novaArgila.toString());
        }



    }

    const handleSave = () => {
        try {

            verificarCampos();


        } catch (error) {
            setTitleAlert("Erro de conexão");
            setMessageAlert("Para acessar as PTFs precisa de uma conexão estável com a internet");
            setModalAlert(!modalAlert);
        }
    };

    function verificarSomaIgual100(AT: number, AF: number, AG: number, SIL: number, ARG: number): boolean {
        if (tab == 2) {
            return AF + AG + ARG + SIL === 100;
        }

        return AT + ARG + SIL === 100;
    }


    function verificarCampos() {
        setTitleAlert("Erro de granulometria!");

        const arrayForm = [
            { name: 'areia', value: areia, state: setAreia },
            { name: 'areiaFina', value: areiaFina, state: setAreiaFina },
            { name: 'areiaGrossa', value: areiaGrossa, state: setAreiaGrossa },
            { name: 'silte', value: silte, state: setSilte },
            { name: 'argila', value: argila, state: setArgila },
            { name: 'densidade', value: densidade, state: setDensidade },
            { name: 'carbonoOrganico', value: carbonoOrganico, state: setCarbonoOrganico },
            { name: 'pH', value: pH, state: setpH },
            { name: 'umidadeEquivalente', value: umidadeEquivalente, state: setUmidadeEquivalente }
        ];

        const NaN = arrayForm.map(obj => {

            if (isNaN(Number(obj.value))) {
                return true
            }
            return false
        })
        // console.log(areia, areiaFina, areiaGrossa, silte, argila)

        // console.log(Number(areia), Number(areiaFina), Number(areiaGrossa), Number(silte), Number(argila))

        if (NaN.includes(true)) {
            setMessageAlert(`Existem valores não númericos`);
            setModalAlert(true);
            return
        }
        if (!verificarSomaIgual100(Number(areia), Number(areiaFina), Number(areiaGrossa), Number(silte), Number(argila))) {
            setMessageAlert("Sua granulometria não obteve o total de 100% complete para proseguir")
            setModalAlert(true);
            return

        }

        executePTF();

        return


    }

    function executePTF() {
        //region: 0 - norte, 1 - nordeste, 2 - CO, 3 - SE, 4 - SUL e 5 Nacional.
        // type: 0 - Simplificada, 1 - Intermediaria, 2 - Avançada
        let AT = Number(areiaFina) + Number(areiaGrossa);

        if (region != null) {
            try {
                switch (tab) {
                    case tab = 0:

                        setResultadoPTF([
                            {
                                author: "Arruda",
                                ptf: PTF.arruda(Number(silte), Number(argila)),

                            },
                            {
                                author: "Giarola A",
                                ptf: PTF.giarola(Number(silte), Number(argila)),


                            },
                            {
                                author: "Giarola B",
                                ptf: PTF.giarolab(Number(silte), Number(argila)),

                            },
                            {
                                author: "Masutti",
                                ptf: PTF.masutti(Number(argila), Number(silte)),

                            },
                            {
                                author: "Wenceslau (ZARC)",
                                ptf: PTF.wenceslau(Number(areia), Number(silte), Number(argila)),


                            },
                            {
                                author: "Barros Simplificado",
                                ptf: PTF.barros_simplificada(Number(areia), Number(silte), Number(argila)),

                            },

                            {
                                author: "Leonor Assad",
                                ptf: PTF.leonorAssad(Number(areia)),

                            },

                        ])
                        setResultadoView(true);


                        break;
                    case tab = 1:

                        setResultadoPTF([

                            {
                                author: "Oliveira",
                                ptf: PTF.oliveira(Number(AT), Number(silte), Number(argila), Number(densidade)),

                            },
                            {
                                author: "Oliveira Parametros",
                                ptf: PTF.oliveira_p(Number(AT), Number(silte), Number(argila), Number(densidade)),

                            },])

                        setResultadoView(true);

                        break;
                    case tab = 2:

                        setResultadoPTF([

                            {
                                author: "Andrade && Stone",
                                ptf: PTF.andrade_stone(Number(silte), Number(argila), Number(areiaFina) + Number(areiaGrossa), Number(carbonoOrganico)),

                            },
                            {
                                author: "Reichert",
                                ptf: PTF.reichert(Number(argila), Number(silte), Number(carbonoOrganico), Number(densidade)),

                            },

                            {
                                author: "Peraza",
                                ptf: PTF.peraza(Number(argila), Number(silte), Number(carbonoOrganico)),

                            },


                            {
                                author: "Tomasella N2",
                                ptf: PTF.tomasella_n2(Number(areiaGrossa), Number(areiaFina), Number(silte), Number(argila), Number(carbonoOrganico), Number(umidadeEquivalente)),

                            },
                            {
                                author: "Tomasella N3",
                                ptf: PTF.tomasella_n3(Number(areiaGrossa), Number(areiaFina), Number(silte), Number(argila), Number(carbonoOrganico), Number(densidade)),

                            },


                            {
                                author: "Van den Berg",
                                ptf: PTF.vandenBerg(Number(silte), Number(argila), Number(carbonoOrganico)),

                            },
                            {
                                author: "DASAM",
                                ptf: PTF.DASAM(Number(areiaFina) + Number(areiaGrossa), Number(silte), Number(argila), Number(densidade)),

                            },])
                        setResultadoView(true);

                        break;
                    default:

                        tab && setMessageAlert(tab.toString());
                        setModalAlert(true);
                        setResultadoView(false);

                        break;
                }
            } catch (error) {
                console.log(error)
            }



        }
        else {

            setTitleAlert("Erro!");
            setMessageAlert("Selecione uma região no canto superior.");
            setModalAlert(!modalAlert);
            return
        }
    }

    return <>

        <div className='relative min-h-screen w-full grid grid-cols-2 content-center max-md:grid-cols-1 place-items-center p-5'>

            <div className='flex flex-col items-center justify-center rounded-md shadow-md bg-white link2'>

                <select onChange={(e) => setPtfIndex(Number(e.target.value))} 
                className='rounded p-2 w-full my-4 max-md:text-sm text-lg text-center' >
                    <option value="-1">Selecione uma função de PTF</option>
                    {ptfJson.map((item, index) => {
                        if (item.region === region && item.type == tab)
                            return <>

                                <option key={index} value={index}>{item.author}

                                </option>

                            </>

                    })}
                </select>


                {/* AREA FORMULARIO */}
                <div className='mt-3 mb-5'>
                    {
                        ptfSelectIndex >= 0 ?
                            ptfJson[ptfSelectIndex].inputProps.map((item, index) => {
                                if (item === "ARE") {
                                    return <InputText key={index + item} Title={"Areia (%)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setAreia}
                                        value={areia}
                                    />
                                }
                                else if (item === "ARG") {
                                    return <InputText key={index + item} Title={"Argila (%)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setArgila}
                                        value={argila}
                                    />
                                }
                                else if (item === "AREF") {
                                    return <InputText key={index + item} Title={"Areia Fina (%)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setAreiaFina}
                                        value={areiaFina}
                                    />
                                }
                                else if (item === "AREG") {
                                    return <InputText key={index + item} Title={"Areia Grossa (%)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setAreiaGrossa}
                                        value={areiaGrossa}
                                    />
                                }
                                else if (item === "SIL") {
                                    return <InputText key={index + item} Title={"Silte (%)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setSilte}
                                        value={silte}
                                    />
                                }
                                else if (item === "DS") {
                                    return <InputText key={index + item} Title={"Densidade (g/cm³)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setDensidade}
                                        value={densidade}
                                    />
                                }
                                else if (item === "CO") {
                                    return <InputText key={index + item} Title={"Carbono Orgânico (g/cm³)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setCarbonoOrganico}
                                        value={carbonoOrganico}
                                    />
                                }
                                else if (item === "UE") {
                                    return <InputText key={index + item} Title={"Umidade Equivalente (g/g)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setUmidadeEquivalente}
                                        value={umidadeEquivalente}
                                    />
                                }
                                else if (item === "CTC") {
                                    return <InputText key={index + item} Title={"CTC (cmol/kg)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setCtc}
                                        value={ctc}
                                    />
                                }
                                else if (item === "PH") {
                                    return <InputText key={index + item} Title={"pH"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setpH}
                                        value={pH}
                                    />
                                }
                                else if (item === "MO") {
                                    return <InputText key={index + item} Title={"Materia Organica (%)"}
                                        handleFocus={handleFocus} handleBlur={handleBlur}
                                        handleTextChange={handleTextChange}
                                        state={setMateriaOrganico}
                                        value={materiaOrganico}
                                    />
                                }

                            }) : <h5 className='text-sm'>Obs.: Dependendo da região não há PTF disponível </h5>
                    }

                </div>
                {/* AREA BTN */}
                <div className='text-sm w-auto flex flex-row justify-center items-center space-x-5 p-2 max-md:w-full'>

                    <BtnRegular Title='Limpar' handleClick={handleClear} >
                        <MdCleaningServices />
                    </BtnRegular>
                    <BtnRegular Title='Calcular' handleClick={handleSave} >
                        <MdCalculate />
                    </BtnRegular>
                    <BtnRegular Title='Teste' handleClick={handleTeste} >
                        <TbTestPipe2 />
                    </BtnRegular>

                </div>
            </div>

            <div className='grid place-items-center'>

                {resultadoView && resultadoPTF.map((item, index) => {

                    if (ptfJson[ptfSelectIndex].region === region && ptfJson[ptfSelectIndex].type === tab && ptfJson[ptfSelectIndex].author === item.author) {
                        return <ResultadoPTF key={index} inputProps={ptfJson[ptfSelectIndex].inputProps} curva={ptfJson[ptfSelectIndex].curva}
                            autoria={ptfJson[ptfSelectIndex].autoria} parametros={ptfJson[ptfSelectIndex].parametros} url={ptfJson[ptfSelectIndex].url}
                            titulo={ptfJson[ptfSelectIndex].titulo} ptf={item.ptf} author={item.author} region={ptfJson[ptfSelectIndex].region}
                            type={ptfJson[ptfSelectIndex].type} cc={ptfJson[ptfSelectIndex].cc} unidade={ptfJson[ptfSelectIndex].unidade} />

                    }

                })}
            </div>

            <ModalAlert message={messageAlert} title={titleAlert} onClose={setModalAlert} visible={modalAlert} />
        </div >
    </>
}

export default FormPTF;