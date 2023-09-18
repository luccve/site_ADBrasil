import type { curve_props, list_props, van_genuchtenProps } from "../@types/data";

class PTF {

    static materiaOrganica(CO: number): number {
        return CO * 1.724;
    }


    static medrado(AT: number, SIL: number, ARG: number, CO: number, DS: number): Array<number> {

        const a1_2: number = 0.13461391;
        const b1_2: number = -1.58555722;
        const a2_2: number = 0.04883605;
        const b2_2: number = 0.19647777;
        const a3_2: number = -0.00949548;
        const b3_2: number = 0.56355803;
        const a4_2: number = -0.00005212;
        const b4_2: number = 1.43345189;
        const a5_2: number = 0.01057297;
        const b5_2: number = 1.14951659;
        const F2: number = 0.01153532;
        const a2_1: number = -0.01831805;
        const b2_1: number = 0.89935543;
        const a3_1: number = -0.01131157;
        const b3_1: number = 1.00134021;
        const a4_1: number = -0.00684340;
        const b4_1: number = 1.11564515;
        const a5_1: number = 0.01622120;
        const b5_1: number = 0.48555009;
        const F1: number = 2.01973831;
        const theta_p: number = 0.7022;
        const MO: number = this.materiaOrganica(CO);
        const a1_4: number = 1.82865464;
        const b1_4: number = -0.57582713;
        const a2_4: number = -0.04262312;
        const b2_4: number = 0.59924802;
        const a3_4: number = 1.51361637;
        const b3_4: number = 0.00985830;
        const a4_4: number = 0.67293635;
        const b4_4: number = 0.05966974;
        const a5_4: number = -0.00163216;
        const b5_4: number = 2.66119588;
        const F4: number = -0.64209861;
        const a1_3: number = -0.00351317;
        const b1_3: number = 2.42317427;
        const a2_3: number = -0.03460735;
        const b2_3: number = 0.58034639;
        const a3_3: number = -0.01845649;
        const b3_3: number = 0.85117517;
        const a4_3: number = -0.04897867;
        const b4_3: number = 0.59621217;
        const a5_3: number = 0.00001279;
        const b5_3: number = 5.38486557;
        const F3: number = 1.58532681;

        const theta_s: number = ((a2_1 * ARG ** b2_1) + (a3_1 * AT ** b3_1) +
            (a4_1 * SIL ** b4_1) + (a5_1 * MO ** b5_1) + F1) * theta_p;

        const theta_r: number = (a1_2 * DS ** b1_2) + (a2_2 * ARG ** b2_2) + (a3_2 * AT ** b3_2)
            + (a4_2 * SIL ** b4_2) + (a5_2 * MO ** b5_2) + F2;

        const n: number = (a1_4 * DS ** b1_4) + (a2_4 * ARG ** b2_4) + (a3_4 * AT ** b3_4) + (a4_4 * SIL ** b4_4) + (a5_4 * MO ** b5_4) + (F4);

        const log_alpha: number = (a1_3 * DS ** b1_3) + (a2_3 * ARG ** b2_3) + (a3_3 * AT ** b3_3) + (a4_3 * SIL ** b4_3) + (a5_3 * MO ** b5_3) + (F3);

        // console.log(log_alpha, n);
        return [log_alpha, n, theta_r, theta_s];
    }

    static wenceslau(AT: number, SIL: number, ARG: number): number {

        const eq = ((1 + 0.3591 * ((-0.02128887 * AT) + (-0.01005814 * SIL) + (-0.01901894 * ARG) + (0.0001171219 * AT * SIL) + (0.0002073924 * AT * ARG) + (0.00006118707 * SIL * ARG) + (-0.000006373789 * AT * SIL * ARG))))
        const AD = eq ** 2.784741;
        return AD * 10;
    }

    static masutti(ARG: number, SIL: number): Array<number> {

        const cc_33 = ((-1.5691 + 0.4289 * (ARG + SIL)) / 100);
        const pmp_1500 = ((0.530482 + 0.301235 * SIL + 0.092822 * ARG) / 100);
        return [cc_33, pmp_1500];
    }

    static peraza(ARG: number, SIL: number, CO: number): Array<number> {

        const MO = this.materiaOrganica(CO) * 10;

        const cc_10 = 0.04947 + (ARG * 10) * 0.000377 + (SIL * 10) * 0.000343 + 0.001890 * MO;
        const cc_33 = 0.00767 + 0.000304 * (ARG * 10) + 0.000050 * (SIL * 10) + 0.001750 * MO;
        const pmp_1500 = -0.02310 + (ARG * 10) * 0.000298 + (SIL * 10) * 0.000176 + 0.000867 * MO;
        return [cc_10, cc_33, pmp_1500];
    }


    static reichert(ARG: number, SIL: number, CO: number, DS: number): Array<number> {

        const MO = this.materiaOrganica(CO) / 100;
        const cc_10 = 0.268 + 0.05 * (ARG / 100) + 0.24 * (SIL / 100 + ARG / 100) + 0.85 * MO - 0.127 * DS;
        const cc_33 = 0.106 + 0.29 * (ARG / 100 + SIL / 100) + 0.93 * MO - 0.048 * DS;
        const pmp_1500 = -0.04 + 0.15 * (ARG / 100) + 0.17 * (ARG / 100 + SIL / 100) + 0.91 * MO + 0.026 * DS;
        return [cc_10, cc_33, pmp_1500];
    }


    static oliveira(
        AT: number,
        SIL: number,
        ARG: number,
        DS: number
    ): number {


        const AD =
            (-0.000021 * AT * 10 +
                0.000203 * SIL * 10 +
                0.000054 * ARG * 10 +
                0.021656 * DS) *
            DS;

        return AD * 10;
    }

    static oliveira_p(
        AT: number,
        SIL: number,
        ARG: number,
        DS: number
    ): Array<number> {


        const cc_33 = (0.000333 * SIL * 10 + 0.000387 * ARG * 10) * DS;
        const pmp_1500 = (0.000038 * AT * 10 + 0.000153 * SIL * 10 + 0.000341 * ARG * 10 - 0.030861 * DS) * DS;

        return [cc_33, pmp_1500];
    }

    static barros_simplificada(AT: number, SIL: number, ARG: number): Array<number> {

        const theta_s = 0.434714 + 0.114177 * (AT / 100) + 0.117845 * (SIL / 100);
        const theta_r = 0.128617 + 0.14836 * (AT / 100) + 0.35705 * (ARG / 100);
        const log_alpha = -1.07329 - 1.9578 * (ARG / 100);
        const alpha = 10 ** log_alpha;
        const n = 1.134153 + 0.722216 * (AT / 100) + 0.39574 * (SIL / 100);


        return [alpha, n, theta_r, theta_s];
    }

    static van_genuchten(
        alpha: van_genuchtenProps["alpha"],
        n: van_genuchtenProps["n"],
        theta_r: van_genuchtenProps["theta_r"],
        theta_s: van_genuchtenProps["theta_s"]
    ): number {
        const AD10 =
            theta_r +
            (theta_s - theta_r) / (1 + Math.abs(alpha * 10) ** n) ** (1 - 1 / n);
        // const AD33 =
        //     theta_r +
        //     (theta_s - theta_r) / (1 + Math.abs(alpha * 33) ** n) ** (1 - 1 / n);
        const AD1500 =
            theta_r +
            (theta_s - theta_r) /
            (1 + Math.abs(alpha * 1500) ** n) ** (1 - 1 / n);

        return (AD10 - AD1500);
    }

    private static theta(alpha: number, n: number, theta_r: number, theta_s: number, potencial: number): number {
        return theta_r +
            (theta_s - theta_r) / (1 + Math.abs(alpha * potencial) ** n) ** (1 - 1 / n)
    }

    static van_genuchtenList(
        alpha: van_genuchtenProps["alpha"],
        n: van_genuchtenProps["n"],
        theta_r: van_genuchtenProps["theta_r"],
        theta_s: van_genuchtenProps["theta_s"],
    ): { list: Array<list_props>, curva: Array<curve_props> } {

        let list = [];
        let curva = [];
        let potenciais = [1, 6, 10, 33, 100, 500, 1000, 1100, 1200, 1300, 1400, 1500];

        for (let i of potenciais) {

            list.push({ index: `${Math.log10(i)}`, theta: this.theta(alpha, n, theta_r, theta_s, i) });
        };



        for (let i = 1; i < 1501; i++) {
            curva.push({ potencial: i, theta: this.theta(alpha, n, theta_r, theta_s, i) });
        }


        return { list, curva };


    }


    // private static densidade(AT: number, ARG: number, CARB: number): number {
    //     const bd = 1.286 + 3.208 * 0.001 * AT - 2.013 * 0.001 * ARG;
    //     const bd_oc =
    //         1.358 + 2.79 * 0.001 * AT - 2.328 * 0.001 * ARG - 0.0052 * CARB;
    //     return CARB == null ? bd : bd_oc;
    // }


    static tomasella_n1(
        AG: number,
        AF: number,
        SIL: number,
        ARG: number,
        DS: number,
        EQ: number
    ): Array<number> {

        // console.log(AG, AF, SIL, ARG, DS, EQ);

        const log_alpha =
            264.4658 +
            1.2123 * ARG -
            378.6112 * EQ -
            328.3456 * DS +
            0.0052 * AG * AF +
            0.00775 * AG * SIL +
            0.0963 * AF * ARG +
            0.0616 * AG * AG;
        const n =
            2.1909 -
            1.5296 * EQ -
            0.000299 * AG * SIL -
            0.000345 * AF * ARG -
            0.000105 * AG * AG +
            0.000025 * AF * AF;

        const alpha = 10 ** log_alpha;

        const theta_s =
            0.8219 -
            0.000177 * SIL +
            2.2324 * EQ -
            0.2867 * DS +
            0.000049 * AG * SIL -
            0.000029 * AG * ARG +
            0.000027 * AF * ARG -
            0.000008 * AG * AG;

        const theta_r =
            -0.1336 +
            0.0025 * SIL +
            0.0034 * ARG +
            0.3991 * EQ +
            0.0768 * DS -
            0.000048 * SIL * SIL -
            0.000013 * ARG * ARG;

        return [alpha, n, theta_r, theta_s];
    }
    static tomasella_n2(
        AG: number,
        AF: number,
        SIL: number,
        ARG: number,
        CO: number,
        UEQ: number,
    ): Array<number> {

        // console.log(AG, AF, SIL, ARG, CO, UEQ)
        const carbonoOrganico = CO; //% to g/kg
        const theta_s = (42.1253 + (57.9073 * UEQ) + (1.5587 * carbonoOrganico) + (-0.0039 * AG * AF) + (0.0033 * AG * SIL) + (-0.0041 * AG * ARG) + (-0.0042 * SIL *
            ARG)) / 100

        const theta_r = (-1.0223 + (0.1754 * SIL) + (0.2770 * ARG) + (48.3545 * UEQ) + (-1.5731 * carbonoOrganico) + (0.0014 * AF * ARG) + (-0.0046 * SIL ** 2) + (-0.0013 * ARG ** 2)) / 100

        const log_alpha = (-200.8303 + (1.0190 * ARG) + (184.9474 * UEQ) + (-0.0284 * AG * AF) + (0.0378 * AG * SIL) + (0.0634 * AF * ARG) + (-0.0625
            * SIL * ARG) + (0.0657 * AG ** 2));

        const alpha = 10 ** (log_alpha / 100) * 0.75;
        const n = (217.4984 + (-147.4518 * UEQ) + (-0.0295 * AG * SIL) + (-0.0375 * AF * ARG) + (-0.0099 * AG ** 2) + (0.007 * AF ** 2)) / 100
        return [alpha, n, theta_r, theta_s];
    }

    static tomasella_n3(
        AG: number,
        AF: number,
        SIL: number,
        ARG: number,
        CO: number,
        DS: number,
    ): Array<number> {

        const carbonoOrganico = CO * 10; //% to g/kg
        const theta_s = (91.6203 + (-30.0046 * DS) + (1.5925 * carbonoOrganico) + (0.0022 * AG * SIL) + (-0.0036 * AG * ARG) + (-0.0018 * AG ** 2 + (-0.001 * AF ** 2))) / 100

        const theta_r = (23.3867 + (0.1103 * ARG) + (-4.7949 * DS) + (0.0047 * SIL * ARG) + (-0.0027 * AG ** 2) + (-0.0022 * AF ** 2) + (-0.0048 * SIL ** 2)) / 100

        const log_alpha = 205.6546 + (-2.556 * SIL) + (-0.1329 * ARG) + (-247.4904 * DS) + (-0.0189 * AG * AF) + (0.1177 * AG * SIL) + (0.0517 * AF * ARG) + (0.0617 * (AG ** 2))

        const alpha = 10 ** (log_alpha / 100) * 0.75;
        const n = ((168.8617 + (-0.0258 * AG * SIL) + (-0.0261 * AF * ARG) + (0.0093 * AF ** 2) + (-0.0077 * SIL * SIL))) / 100
        return [alpha, n, theta_r, theta_s];
    }

    static tomasella_n4(
        AG: number,
        AF: number,
        SIL: number,
        ARG: number,
        CO: number,
    ): Array<number> {

        const theta_s = (36.9 + (0.37 * SIL) + (3.26 * CO) + (-0.002 * AG * ARG) + (0.003 * AF * ARG) + (-0.003 * SIL * ARG) + (0.003 * ARG * ARG)) / 100

        const theta_r = ((15.76 + (0.14 * ARG) + (0.005 * SIL * ARG) + (-0.003 * (AG * AG)) + (-0.002 * AF * AF)) + (-0.005 * SIL * SIL)) / 100

        const log_alpha = (-237.01 + (3.62 * AG) + (0.004 * AG * SIL) + (0.09 * AF * ARG) + (0.018 * (ARG * ARG))) / 100
        const alpha = 10 ** log_alpha;
        const n = (170.63 + (-0.018 * AG * SIL) + (-0.031 * AF * ARG) + (0.009 * AF * AF + (-0.008 * SIL * SIL))) / 100
        return [alpha, n, theta_r, theta_s];

    }

    static leonorAssad(AT: number): number {
        const AD = (12.76278562 - 0.0000098726 * Math.pow(AT, 3)) / 100;
        return AD * 10;
    }

    static arruda(SIL: number, ARG: number): Array<number> {
        const cc_33 =
            (3.07439 + 0.629239 * (SIL + ARG) - 0.00343813 * Math.pow(SIL + ARG, 2)) /
            100;
        const pmp = (398.889 * (SIL + ARG)) / (1308.09 + (SIL + ARG)) / 100;
        return [cc_33, pmp];
    }

    static vandenBerg(SIL: number, ARG: number, MO: number): Array<number> {
        const carbonoOrganico = MO * 0.58;
        const CC_10 =
            (10.88 + 0.347 * ARG + 0.211 * SIL + 0.1756 * carbonoOrganico) / 100;
        const PMP = (3.83 + 0.272 * ARG + 0.212 * SIL) / 100;
        return [CC_10, PMP];
    }

    static vanderBerg_vanGenuchten(ARG: number, AT: number, SIL: number, CO: number, CTC: number): Array<number> {


        const n = 1 / (1 - 0.503 - 0.0027 * (SIL + ARG) - 0.066 * CO + 0.0094 + CTC);
        const theta_s = (84.1 - 0.206 * ARG - 0.322 * (AT + SIL)) / 100
        const theta_r = (0.308 * ARG) / 100;
        const log_alpha = -0.627;
        const alpha = 10 ** log_alpha;
        return [alpha, n, theta_r, theta_s];
    }

    static andrade_stone(SIL: number, ARG: number, _AT: number, _CO: number): Array<number> {

        // const MO = this.materiaOrganica(CO);
        const U_cc_6 = 0.0019 * ARG + 0.0024 * SIL + 0.2143;

        return [U_cc_6, 0];
    }

    static hodnett(ARG: number, AT: number, SIL: number, CTC: number, pH: number, CO: number, DS: number): Array<number> {


        const theta_s = (82.072 + (0.089 * ARG) - (31.357 * DS) + (0.027 * CTC) + (0.517 * pH) - (0.0006 * AT * ARG)) / 100;
        const theta_r = (23.133 + (-0.172 * AT) + (0.211 * CTC) + (-0.849 * pH) + (0.0012 * (ARG * ARG)) + (0.0029 * AT * ARG)) / 100;
        const log_alpha = (-4.237 - (3.423 * SIL) + (4.288 * CO) - (0.801 * CTC) - (11.07 * pH) + (0.027 * SIL * SIL)) / 100;
        const n = (67.093 + (-0.907 * ARG) + (-0.574 * CO) + (1.396 * pH) + (0.0056 * (ARG * ARG))) / 100;
        const alpha = 10 ** log_alpha;
        return [alpha, n, theta_r, theta_s];
    }

    static giarolab(SIL: number, ARG: number): Array<number> {

        const cc_10 = 0.081 + 0.005 * SIL + 0.004 * ARG;
        const pmp_1500 = 0.024 + 0.005 * SIL + 0.003 * ARG;
        return [cc_10, pmp_1500]
    }

    static giarola(SIL: number, ARG: number): Array<number> {

        const cc_10 = 0.081 + 0.005 * SIL + 0.004 * ARG;
        const pmp_1500 = -0.031 + 0.005 * SIL + 0.003 * ARG;
        return [cc_10, pmp_1500]
    }

    static DASAM(AT: number, SIL: number, ARG: number, DS: number): Array<number> {
        const MO = 16 / 1000;
        const log_alpha = 0.8118 + (0.8861 * AT / 100) + (-1.1907 * ARG / 100) + (-1.5140 * DS);

        const alpha = 10 ** log_alpha;
        const n = 1.1527 + (-5.5341 * MO) + (0.7427 * AT / 100) + (0.4135 * SIL / 100);
        const theta_r = 0.0858 + (1.1846 * MO) + (-0.1671 * AT / 100) + (0.3516 * ARG / 100) + (0.0290 * DS);
        const theta_s = 1 + (-0.370000 * DS)



        return [alpha, n, theta_r, theta_s];


    }

}

export default PTF;
