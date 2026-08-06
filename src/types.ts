// 爻值常量
export const YAO_SHAO_YANG = 1;
export const YAO_SHAO_YIN = 2;
export const YAO_LAO_YANG = 3;
export const YAO_LAO_YIN = 4;

export interface FuCang {
  pos: number;
  value: string;
}

export interface GuaExData {
  name: string;
  liuQin: string;
  ganZhi: string[];
  shi: number;
  ying: number;
  fuCang: FuCang[];
  guaShen: number;
  baGong: string;
  wuXing: string;
  kind: string;
}

export interface GuaInfo {
  name: string;
  yaos: number[];
}

export interface DivinationContext {
  ganZhi: string[];
  xunKong: string;
  lunarMonth: number;
  lunarDay: number;
}

export interface PaipanResult {
  method: string;
  ganZhi: string[];
  xunKong: string;
  benGua: GuaInfo;
  huGua: GuaInfo;
  bianGua: GuaInfo | null;
  bianYao: number;
  shangGua: string;
  xiaGua: string;
  shangGuaWuXing: string;
  xiaGuaWuXing: string;
  benGuaEx: GuaExData | null;
  bianGuaEx: GuaExData | null;
  liuShen: string[] | null;
}
