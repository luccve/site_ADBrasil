const perfis = [
    { key: '0', value: 'Argissolos - P', mediana: "1,07" },
    { key: '1', value: 'Cambissolos - C', mediana: "1,31" },
    { key: '2', value: 'Chernossolos - M', mediana: "1,44" },
    { key: '3', value: 'Espodossolos - E', mediana: "0,66" },
    { key: '4', value: 'Gleissolos - G', mediana: "1,56" },
    { key: '5', value: 'Latossolos - L', mediana: "1,20" },
    { key: '6', value: 'Luvissolos - T', mediana: "1,4" },
    { key: '7', value: 'Neossolos - RQ', mediana: "0,73" },
    { key: '8', value: 'Nitossolos - N', mediana: "1,2" },
    { key: '9', value: 'Organossolos - O', mediana: "1,69" },
    { key: '10', value: 'Planossolos - S', mediana: "0,76" },
    { key: '11', value: 'Plintossolos - F', mediana: "1,29" },
    { key: '12', value: 'Vertissolos - V', mediana: "1,42" },
];

const perfisSubOrdem = [
    {
        key: "0",
        value: "Argissolo Amarelo - PA",
        mediana: "1",
        classe: "0"
    },
    {
        key: "1",
        value: "Argissolo VA Ta Alumínico – PVAva ",
        mediana: "1,69",
        classe: "0"
    },
    {
        key: "2",
        value: "Argissolo Vermelho - PV",
        mediana: "1,12",
        classe: "0"
    },
    {
        key: "3",
        value: "Argissolo Vermelho-Amarelo - PVA",
        mediana: "1,01",
        classe: "0"
    },
    {
        key: "4",
        value: "Cambissolo Húmico - CH",
        mediana: "1,3",
        classe: "1"
    },
    {
        key: "5",
        value: "Cambissolo Háplico - CX",
        mediana: "1,21",
        classe: "1"
    },
    {
        key: "6",
        value: "Cambissolo Háplico Carbonático - CXk",
        mediana: "1,33",
        classe: "1"
    },
    {
        key: "7",
        value: "Cambissolo Háplico Ta Alumínico - CXva",
        mediana: "1,5",
        classe: "1"
    },
    {
        key: "8",
        value: "Chernossolo Rêndzico - MD",
        mediana: "1,5",
        classe: "2"
    },
    {
        key: "9",
        value: "Chernossolo Argilúvico - MT",
        mediana: "1,42",
        classe: "2"
    },
    {
        key: "10",
        value: "Chernossolo Háplico - MX",
        mediana: "1,26",
        classe: "2"
    },
    {
        key: "11",
        value: "Espodossolo (indiscriminado) - EK, ES ou ESK",
        mediana: "0,66",
        classe: "3"
    },
    {
        key: "12",
        value: "Gleissolo Tiomórfico - GJ",
        mediana: "1,78",
        classe: "4"
    },
    {
        key: "13",
        value: "Gleissolo Sálico - GZ",
        mediana: "1,99",
        classe: "4"
    },
    {
        key: "14",
        value: "Gleissolo Melânico - GM",
        mediana: "1,05",
        classe: "4"
    },
    {
        key: "15",
        value: "Gleissolo Háplico - GX",
        mediana: "1,55",
        classe: "4"
    },
    {
        key: "16",
        value: "Latossolo Bruno - LB",
        mediana: "1,04",
        classe: "5"
    },
    {
        key: "17",
        value: "Latossolo Amarelo - LA",
        mediana: "1,1",
        classe: "5"
    },
    {
        key: "18",
        value: "Latossolo Vermelho - LV",
        mediana: "1,3",
        classe: "5"
    },
    {
        key: "19",
        value: "Latossolo Vermelho Ácricos - LVw",
        mediana: "1,55",
        classe: "5"
    },
    {
        key: "20",
        value: "Latossolo Vermelho Perférrico - LVj",
        mediana: "1,5",
        classe: "5"
    },
    {
        key: "21",
        value: "Latossolo Vermelho-Amarelo - LVA",
        mediana: "0,9",
        classe: "5"
    },
    {
        key: "22",
        value: "Luvissolo Crômico (ou Háplico) - TC ou TX",
        mediana: "1,32",
        classe: "6"
    },
    {
        key: "23",
        value: "Luvissolo Crômico (ou Háplico) na região do Acre - TC ou TX ",
        mediana: "1,54",
        classe: "6"
    },
    {
        key: "24",
        value: "Neossolo Litólico - RL",
        mediana: "0,66",
        classe: "7"
    },
    {
        key: "25",
        value: "Neossolo Flúvico - RY",
        mediana: "1,25",
        classe: "7"
    },
    {
        key: "26",
        value: "Neossolo Regolítico - RR",
        mediana: "0,62",
        classe: "7"
    },
    {
        key: "27",
        value: "Neossolo Quartzarênico - RQ",
        mediana: "0,57",
        classe: "7"
    },
    {
        key: "28",
        value: "Nitossolo Bruno - NB",
        mediana: "1,17",
        classe: "8"
    },
    {
        key: "29",
        value: "Nitossolo Vermelho - NV",
        mediana: "1,31",
        classe: "8"
    },
    {
        key: "30",
        value: "Organossolo Tiomórfico - OJ",
        mediana: "1,78",
        classe: "8"
    },
    {
        key: "31",
        value: "Organossolo Háplico - OX",
        mediana: "1,45",
        classe: "8"
    },
    {
        key: "32",
        value: "Planossolo Háplico (ou Nátrico) - SX ou SN",
        mediana: "0,76",
        classe: "10"
    },
    {
        key: "33",
        value: "Plintossolo Argilúvico - FT",
        mediana: "1,17",
        classe: "11"
    },
    {
        key: "34",
        value: "Plintossolo Argilúvico Alumínico - FTa",
        mediana: "1,5",
        classe: "11"
    },
    {
        key: "35",
        value: "Plintossolo Háplico - FX",
        mediana: "1,42",
        classe: "11"
    },
    {
        key: "36",
        value: "Vertissolo Ebânico - VE",
        mediana: "1,42",
        classe: "12"
    },
    {
        key: "37",
        value: "Vertissolo Háplico - VX",
        mediana: "1,4",
        classe: "12"
    }
]

const textura = [
    { key: 0, value: "Arenosa", mediana: "0,51" },
    { key: 1, value: "Arenosa/média", mediana: "0,8" },
    { key: 2, value: "Arenosa/média/argilosa", mediana: "1,04" },
    { key: 3, value: "Média", mediana: "1,01" },
    { key: 4, value: "Média/argilosa", mediana: "1,46" },
    { key: 5, value: "Média/argilosa-muito argilosa", mediana: "1,37" },
    { key: 6, value: "Média a muito argilosa (em Organossolos)", mediana: "1,58" },
    { key: 7, value: "Argilosa", mediana: "1,39" },
    { key: 8, value: "Argilosa/muito argilosa", mediana: "1,41" },
    { key: 9, value: "Siltosa", mediana: "2,30" },
]



const dataCatalogo = {

    perfis,
    perfisSubOrdem,
    textura
}


export default dataCatalogo;