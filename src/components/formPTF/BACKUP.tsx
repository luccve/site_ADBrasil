import { useState } from 'react';
import '../../App.css'
import type { PTFttypes, ResultadoPTFProps } from '../../@types/components';
import PTF from '../../ptfFunctions';
import { MdCleaningServices } from 'react-icons/md'
import { MdCalculate } from 'react-icons/md'
import { TbTestPipe2 } from 'react-icons/tb'
import ModalAlert from '../modal/modalAlert';
import BtnRegular from '../btn/BtnRegular';
import InputText from '../input/inputText';

import ResultadoPTF from '../resultadoPTF';


const FormPTF = ({ type, tab, region }: PTFttypes) => {

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
    const [pH, setpH] = useState("");
    const [ctc, setCtc] = useState("");
    const [umidadeEquivalente, setUmidadeEquivalente] = useState("");
    const [resultadoPTF, setResultadoPTF] = useState<ResultadoPTFProps[]>([]);
    const [resultadoView, setResultadoView] = useState(false);
    const [_isFocused, setIsFocused] = useState(false);




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
        setUmidadeEquivalente("");
        setResultadoView(false)
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
                                type: 0,
                                region: 4,
                                cc: "33",
                                funcionamento: "ok",
                                unidade: "kg/kg",
                                autoria: "ARRUDA, F. B.; ZULLO JÚNIOR, J.; OLIVEIRA, J. B. de. Parâmetros de solo para o cálculo da água disponível com base na textura do solo. Revista Brasileira de Ciência do Solo, Viçosa, v. 11, n. 1, p. 11-15, 1987.",
                                titulo: "Parâmetros de solo para o cálculo da água disponível com base na textura do solo.",
                                parametros: "Silte e Argila",
                                inputProps:["GRA"] ,
                                url: "",
                                curva: "Pontual",
                            },
                            {
                                author: "Giarola A",
                                ptf: PTF.giarola(Number(silte), Number(argila)),
                                type: 0,
                                region: 0,
                                funcionamento: "ok",
                                cc: "10",
                                unidade: "m³/m³",
                                autoria: "GIAROLA, N. F. B.; SILVA, A. P.; IMHOFF, S. Relações entre propriedades físicas e características de solos da região sul do Brasil. Revista Brasileira de Ciência do Solo, Viçosa, v. 26, n. 4, p. 885-893, dez. 2002.",
                                titulo: "Relações entre propriedades físicas e características de solos da região sul do Brasil",
                                parametros: "Silte e Argila",
                                inputProps:["SIL", "ARG"],
                                url: "https://doi.org/10.1590/S0100-06832002000400005",
                                curva: "Pontual",

                            },
                            {
                                author: "Giarola B",
                                ptf: PTF.giarolab(Number(silte), Number(argila)),
                                type: 0,
                                region: 0,
                                funcionamento: "ok",
                                cc: "10",
                                unidade: "m³/m³",
                                autoria: "GIAROLA, N. F. B.; SILVA, A. P.; IMHOFF, S. Relações entre propriedades físicas e características de solos da região sul do Brasil. Revista Brasileira de Ciência do Solo, Viçosa, v. 26, n. 4, p. 885-893, dez. 2002.",
                                titulo: "Relações entre propriedades físicas e características de solos da região sul do Brasil",
                                parametros: "Silte e Argila",
                                inputProps:["SIL", "ARG"],
                                
                                url: "https://doi.org/10.1590/S0100-06832002000400005",
                                curva: "Pontual",

                            },
                            {
                                author: "Masutti",
                                ptf: PTF.masutti(Number(argila), Number(silte)),
                                type: 0,
                                region: 2,
                                cc: "33",
                                funcionamento: "ok",
                                unidade: "kg/kg",
                                autoria: "MASUTTI, M. M.; RODRIGUES, J. J. V. Estimating soil water parameters from texture and organic matter for soils of the coastal forest zone of Pernambuco - Brazil.  In: WORLD CONGRESS OF SOIL SCIENCE, 16., 1998. Montpellier. Proceedings... Montpellier, International Union of Soil Sciences, 1998.",
                                titulo: "Estimating soil water parameters from texture and organic matter for soils of the coastal forest zone of Pernambuco - Brazil",
                                parametros: "Silte e Argila",
                                inputProps:["SIL", "ARG"],
                                url: "",
                                curva: "Pontual",
                            },
                            {
                                author: "Wenceslau (ZARC)",
                                ptf: PTF.wenceslau(Number(areia), Number(silte), Number(argila)),
                                type: 0,
                                region: 0,
                                funcionamento: "ok",
                                cc: "",
                                unidade: "m³/m³",
                                autoria: "TEIXEIRA, W. G.; VICTORIA, D. de C.; BARROS, A. H. C.; LUMBRERAS, J. F.; ARAÚJO FILHO, J. C. de; SILVA, F. A. M. da; LIMA, E. de P.; BUENO FILHO, J. S. de S.; MONTEIRO, J. E. B. de A. Predição da Água Disponível no Solo em Função da Granulometria para Uso nas Análises de Risco no Zoneamento Agrícola de Risco Climático. Rio de Janeiro: Embrapa Solos, 2021. 97 p.",
                                titulo: "Predição da Água Disponível no Solo em Função da Granulometria para Uso nas Análises de Risco no Zoneamento Agrícola de Risco Climático",
                                parametros: "Areia, Silte e Argila",
                                url: "https://www.embrapa.br/busca-de-publicacoes/-/publicacao/1131095/predicao-da-agua-disponivel-no-solo-em-funcao-da-granulometria-para-uso-nas-analises-de-risco-no-zoneamento-agricola-de-risco-climatico",
                                curva: "Pontual",
                                inputProps:["ARE","SIL", "ARG"],

                            },
                            {
                                author: "Barros Simplificado",
                                ptf: PTF.barros_simplificada(Number(areia), Number(silte), Number(argila)),
                                type: 0,
                                region: 2,
                                cc: "33",
                                funcionamento: "ok",
                                unidade: "kg/kg",
                                autoria: "BARROS, A. H. C. Desenvolvimento de funções de pedotransferência e sua utilização em modelo agro hidrológico. 2010. 149 f. Tese (Doutorado em Física do Ambiente Agrícola) - Universidade de São Paulo - Escola Superior de Agricultura Luiz de Queiroz, Piracicaba.",
                                titulo: "Desenvolvimento de funções de pedotransferência e sua utilização em modelo agro hidrológico",
                                parametros: "Areia, Silte e Argila",
                                url: "https://teses.usp.br/teses/disponiveis/11/11131/tde-17092010-145335/pt-br.php",
                                curva: "Paramétrica",
                                inputProps:["ARE","SIL", "ARG"],
                            },

                            {
                                author: "Leonor Assad",
                                ptf: PTF.leonorAssad(Number(areia)),
                                type: 0,
                                region: 4,
                                cc: "",
                                funcionamento: "ok",
                                unidade: "mm/cm",
                                autoria: "ASSAD, M. L. L.; SANS, L. M. A.; ASSAD, E. D.; ZULLO JR, J. Relação entre água retida e conteúdo de areia em solos brasileiros. Revista Brasileira de Agrometeorologia, Passo Fundo, v. 9, n. 3, p. 588-596, 2001.",
                                titulo: "Relação entre água retida e conteúdo de areia em solos brasileiros",
                                parametros: "Areia",
                                url: "https://www.embrapa.br/busca-de-publicacoes/-/publicacao/473298/relacao-entre-agua-retida-e-conteudo-de-areia-em-solos-brasileiros",
                                curva: "Pontual",
                                inputProps:["ARE"],
                            },

                        ])
                        setResultadoView(true);
                        console.log(resultadoPTF);

                        break;
                    case tab = 1:

                        setResultadoPTF([

                            {
                                author: "Oliveira",
                                ptf: PTF.oliveira(Number(AT), Number(silte), Number(argila), Number(densidade)),
                                type: 1,
                                region: 2,
                                funcionamento: "ok",
                                cc: "33",
                                unidade: "m³/m³",
                                autoria: "OLIVEIRA, L. B.; RIBEIRO, M. R.; JACOMINE, P. K. T.; RODRIGUES, J. J. V.; MARQUES, F. A. Funções de pedotransferência para predição da umidade retida a potenciais específicos em solos do estado de Pernambuco. Revista Brasileira de Ciência do Solo, Viçosa, v. 26, n. 2, p. 315-323, jun. 2002.",
                                titulo: "Funções de pedotransferência para predição da umidade retida a potenciais específicos em solos do estado de Pernambuco",
                                parametros: "Areia, Silte, Argila e Densidade",
                                url: "https://doi.org/10.1590/S0100-06832002000200004",
                                curva: "Pontual",
                                inputProps:["ARE","SIL", "ARG", "DS"],
                            },
                            {
                                author: "Oliveira Parametros",
                                ptf: PTF.oliveira_p(Number(AT), Number(silte), Number(argila), Number(densidade)),
                                type: 1,
                                region: 2,
                                funcionamento: "ok",
                                cc: "33",
                                unidade: "m³/m³",
                                autoria: "OLIVEIRA, L. B.; RIBEIRO, M. R.; JACOMINE, P. K. T.; RODRIGUES, J. J. V.; MARQUES, F. A. Funções de pedotransferência para predição da umidade retida a potenciais específicos em solos do estado de Pernambuco. Revista Brasileira de Ciência do Solo, Viçosa, v. 26, n. 2, p. 315-323, jun. 2002.",
                                titulo: "Funções de pedotransferência para predição da umidade retida a potenciais específicos em solos do estado de Pernambuco",
                                parametros: "Areia, Silte, Argila e Densidade",
                                url: "https://doi.org/10.1590/S0100-06832002000200004",
                                curva: "Pontual",
                                inputProps:["ARE","SIL", "ARG", "DS"],
                            },])

                        setResultadoView(true);

                        break;
                    case tab = 2:

                        setResultadoPTF([

                            {
                                author: "Andrade && Stone",
                                ptf: PTF.andrade_stone(Number(silte), Number(argila), Number(areiaFina) + Number(areiaGrossa), Number(carbonoOrganico)),
                                type: 2,
                                region: 3,
                                cc: "6",
                                funcionamento: "ok",
                                unidade: "kg/kg",
                                autoria: "ANDRADE, R. da S.; STONE, L. F. Estimativa da umidade na capacidade de campo em solos sob Cerrado. Revista Brasileira de Engenharia Agrícola e Ambiental, Campina Grande, v. 15, n. 2, p. 111-116, fev. 2011.",
                                titulo: "Estimativa da umidade na capacidade de campo em solos sob Cerrado",
                                parametros: "Areia, Silte, Argila e Carbono Orgânico",
                                url: "https://doi.org/10.1590/S1415-43662011000200001",
                                curva: "Pontual",
                                inputProps:["ARE","SIL", "ARG", "DS", "CO"],
                            },
                            {
                                author: "Reichert",
                                ptf: PTF.reichert(Number(argila), Number(silte), Number(carbonoOrganico), Number(densidade)),
                                type: 2,
                                region: 5,
                                cc: "10",
                                funcionamento: "ok",
                                unidade: "kg/kg",
                                autoria: "REICHERT, J. M.; ALBUQUERQUE, J. A.; KAISER, D. R.; REINERT, D. J.; URACH, F. L.; CARLESSO, R. Estimation of water retention and availability in soils of Rio Grande do Sul. Revista Brasileira de Ciência do Solo, Viçosa, v. 33, n. 6, p. 1547-1560, dez. 2009.",
                                titulo: "Estimation of water retention and availability in soils of Rio Grande do Sul",
                                parametros: "Silte, Argila, Densidade e Carbono Orgânico",
                                url: "https://doi.org/10.1590/S0100-06832009000600004",
                                curva: "Pontual",
                                inputProps:["SIL", "ARG", "DS"],
                            },

                            {
                                author: "Peraza",
                                ptf: PTF.peraza(Number(argila), Number(silte), Number(carbonoOrganico)),
                                type: 2,
                                region: 5,
                                cc: "10",
                                unidade: "kg/kg",
                                funcionamento: "ok",
                                autoria: "PERAZA, J. E. S. Retenção de Água e Pedofunções para Solos do Rio Grande do Sul. 2003. 118 f. Dissertação (Mestrado em Engenharia Agrícola) - Universidade Federal de Santa Maria, Santa Maria.",
                                titulo: "Retenção de Água e Pedofunções para Solos do Rio Grande do Sul",
                                parametros: "Silte, Argila e Carbono Ôrganico",
                                url: "",
                                curva: "Pontual",
                                inputProps:["SIL", "ARG", "CO"],
                            },


                            {
                                author: "Tomasella N2",
                                ptf: PTF.tomasella_n2(Number(areiaGrossa), Number(areiaFina), Number(silte), Number(argila), Number(carbonoOrganico), Number(umidadeEquivalente)),
                                type: 2,
                                region: 0,
                                cc: "",
                                funcionamento: "ok",
                                unidade: "m³/m³",
                                autoria: "TOMASELLA, J.; HODNETT, M. G.; ROSSATO, L. Pedotransfer Functions for the Estimation of Soil Water Retention in Brazilian Soils. Soil Science Society of America Journal, v. 64, n. 1, p. 327-338, jan. 2000. ",
                                titulo: "Pedotransfer Functions for the Estimation of Soil Water Retention in Brazilian Soils",
                                parametros: "Areia Fina, Areia Grossa, Silte, Argila, Carbono Orgânico e Umidade Equivalente",
                                url: "https://doi.org/10.2136/sssaj2000.641327x",
                                curva: "Paramétrica",
                                inputProps:["AREF","AREG", "SIL", "ARG", "CO", "UE"],
                            },
                            {
                                author: "Tomasella N3",
                                ptf: PTF.tomasella_n3(Number(areiaGrossa), Number(areiaFina), Number(silte), Number(argila), Number(carbonoOrganico), Number(densidade)),
                                type: 2,
                                region: 0,
                                cc: "",
                                funcionamento: "ok",
                                unidade: "m³/m³",
                                autoria: "TOMASELLA, J.; HODNETT, M. G.; ROSSATO, L. Pedotransfer Functions for the Estimation of Soil Water Retention in Brazilian Soils. Soil Science Society of America Journal, v. 64, n. 1, p. 327-338, jan. 2000. ",
                                titulo: "Pedotransfer Functions for the Estimation of Soil Water Retention in Brazilian Soils",
                                parametros: "Areia Fina, Areia Grossa, Silte, Argila, Densidade e Carbono Orgânico",
                                url: "https://doi.org/10.2136/sssaj2000.641327x",
                                curva: "Paramétrica",
                                inputProps:["AREF","AREG", "SIL", "ARG", "DS", "CO"],
                            },


                            {
                                author: "Van den Berg",
                                ptf: PTF.vandenBerg(Number(silte), Number(argila), Number(carbonoOrganico)),
                                type: 2,
                                region: 0,
                                funcionamento: "ok",
                                unidade: "%",
                                cc: "33",
                                autoria: "VAN DEN BERG, M.; KLAMT, E.; VAN REEUWIJK, L. P.; SOMBROEK, W. G. Pedotransfer functions for the estimation of moisture retention characteristics of Ferralsols and related soils. Geoderma, Amsterdam, v. 78, n. 3-4, p. 161-180, ago. 1997.",
                                titulo: "Pedotransfer functions for the estimation of moisture retention characteristics of Ferralsols and related soils",
                                parametros: "Silte, Argila, Matéria Orgânica",
                                url: "https://doi.org/10.1016/S0016-7061(97)00045-1",
                                curva: "Pontual",
                                inputProps:["SIL","ARG", "MO"],
                            },
                            {
                                author: "DASAM",
                                ptf: PTF.DASAM(Number(areiaFina) + Number(areiaGrossa), Number(silte), Number(argila), Number(densidade)),
                                type: 2,
                                region: 2,
                                funcionamento: "ok",
                                unidade: "m³/m³",
                                cc: "33",
                                autoria: "BARROS, A. H. C. Desenvolvimento de funções de pedotransferência e sua utilização em modelo agro hidrológico. 2010. 149 f. Tese (Doutorado em Física do Ambiente Agrícola) - Universidade de São Paulo - Escola Superior de Agricultura Luiz de Queiroz, Piracicaba.",
                                titulo: "Desenvolvimento de funções de pedotransferência e sua utilização em modelo agro hidrológico",
                                parametros: "Areia, Silte, Argila e Densidade",
                                url: "https://teses.usp.br/teses/disponiveis/11/11131/tde-17092010-145335/pt-br.php",
                                curva: "Paramétrica",
                                inputProps:["ARE", "SIL","ARG", "DS"],
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
                {/* AREA FORMULARIO */}
                <div className='mt-3 mb-5'>
                    {type !== "AVC" &&
                        (<>
                            <InputText Title='Areia (%)'
                                handleFocus={handleFocus} handleBlur={handleBlur}
                                handleTextChange={handleTextChange}
                                state={setAreia}
                                value={areia}
                            />

                        </>)}



                    {type === 'AVC' && (<>


                        <InputText Title='Areia Fina (%)'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setAreiaFina}
                            value={areiaFina}
                        />

                        <InputText Title='Areia Grossa (%)'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setAreiaGrossa}
                            value={areiaGrossa}
                        />


                    </>)}

                    <InputText Title='Silte (%)'
                        handleFocus={handleFocus} handleBlur={handleBlur}
                        handleTextChange={handleTextChange}
                        state={setSilte}
                        value={silte}
                    />


                    <InputText Title='Argila (%)'
                        handleFocus={handleFocus} handleBlur={handleBlur}
                        handleTextChange={handleTextChange}
                        state={setArgila}
                        value={argila}
                    />


                    {type !== 'SIM' && (<>

                        <InputText Title='Densidade (g/cm³)'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setDensidade}
                            value={densidade}
                        />


                    </>)}
                    {type === 'AVC' && (<>



                        <InputText Title='Carbono Orgânico (%)'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setCarbonoOrganico}
                            value={carbonoOrganico}
                        />


                    </>)}

                    {type === 'AVC' && (<>

                        <InputText Title='pH'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setpH}
                            value={pH}
                        />

                    </>)}

                    {type === 'AVC' && (<>
                        <InputText Title='Umidade Equivalente (g/g)'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setUmidadeEquivalente}
                            value={umidadeEquivalente}
                        />

                    </>)}

                    {type === 'AVC' && (<>

                        <InputText Title='CTC (cmolc/kg)'
                            handleFocus={handleFocus} handleBlur={handleBlur}
                            handleTextChange={handleTextChange}
                            state={setCtc}
                            value={ctc}
                        />


                    </>)}

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
                    
                    if (item.region === region && item.type === tab) {
                        return <ResultadoPTF inputProps={item.inputProps} curva={item.curva} autoria={item.autoria} parametros={item.parametros} url={item.url} titulo={item.titulo} ptf={item.ptf} key={index} author={item.author} region={item.region} type={item.type} cc={item.cc} unidade={item.unidade} />

                    }

                })}
            </div>
            
            <ModalAlert message={messageAlert} title={titleAlert} onClose={setModalAlert} visible={modalAlert} />
        </div>
    </>
}

export default FormPTF;