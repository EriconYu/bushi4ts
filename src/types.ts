// Copyright (c) 2026 不惑之心 (buhuo.xin)
// 作者：净志 | 微信：haitaojingzhi | 官网：https://www.buhuo.xin
// 仅开源排盘算法，不含卦爻辞、解卦等内容。

// 爻值常量。所有六爻数组均为 index 0=上爻（六爻），index 5=初爻。
export const YAO_SHAO_YANG = 1;
export const YAO_SHAO_YIN = 2;
export const YAO_LAO_YANG = 3;
export const YAO_LAO_YIN = 4;

export interface FuCang {
  /** 1-based 画卦位置：1=上爻（六爻），6=初爻。 */
  pos: number;
  value: string;
}

export interface GuaExData {
  name: string;
  /** 六亲 6 字，顺序为上爻到初爻。 */
  liuQin: string;
  /** 每爻干支 6 项，顺序为上爻到初爻。 */
  ganZhi: string[];
  /** 1-based：1=上爻（六爻），6=初爻。 */
  shi: number;
  /** 1-based：1=上爻（六爻），6=初爻。 */
  ying: number;
  fuCang: FuCang[];
  guaShen: number;
  baGong: string;
  wuXing: string;
  kind: string;
}

export interface GuaInfo {
  name: string;
  /** 爻值数组：index 0=上爻（六爻），index 5=初爻。 */
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
  /**
   * 首个动爻的数组索引（0=上爻，5=初爻，-1=无动爻）。
   * 手摇多动爻应同时检查 benGua.yaos 中所有值为 3/4 的元素。
   */
  bianYao: number;
  shangGua: string;
  xiaGua: string;
  shangGuaWuXing: string;
  xiaGuaWuXing: string;
  benGuaEx: GuaExData | null;
  bianGuaEx: GuaExData | null;
  /** 六神 6 项，顺序为上爻到初爻。 */
  liuShen: string[] | null;
}
