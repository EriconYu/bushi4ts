// Copyright (c) 2026 不惑之心 (buhuo.xin)
// 作者：净志 | 微信：haitaojingzhi | 官网：https://www.buhuo.xin
// 仅开源排盘算法，不含卦爻辞、解卦等内容。

import { YAO_LAO_YANG, YAO_LAO_YIN } from './types';

export const GUAS64: string[][] = [
  ['乾为天','天泽履','天火同人','天雷无妄','天风姤','天水讼','天山遁','天地否'],
  ['泽天夬','兑为泽','泽火革','泽雷随','泽风大过','泽水困','泽山咸','泽地萃'],
  ['火天大有','火泽睽','离为火','火雷噬嗑','火风鼎','火水未济','火山旅','火地晋'],
  ['雷天大壮','雷泽归妹','雷火丰','震为雷','雷风恒','雷水解','雷山小过','雷地豫'],
  ['风天小畜','风泽中孚','风火家人','风雷益','巽为风','风水涣','风山渐','风地观'],
  ['水天需','水泽节','水火既济','水雷屯','水风井','坎为水','水山蹇','水地比'],
  ['山天大畜','山泽损','山火贲','山雷颐','山风蛊','山水蒙','艮为山','山地剥'],
  ['地天泰','地泽临','地火明夷','地雷复','地风升','地水师','地山谦','坤为地'],
];

export const BA_GUA_NAMES = ['乾','兑','离','震','巽','坎','艮','坤'];
export const BA_GUA_WU_XING = ['金','金','火','木','木','水','土','土'];
export const DI_ZHI_12 = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

export function baGuaNumToYaos(num: number): number[] {
  const map: Record<number, number[]> = {
    1:[1,1,1],2:[1,1,2],3:[1,2,1],4:[1,2,2],
    5:[2,1,1],6:[2,1,2],7:[2,2,1],8:[2,2,2],
  };
  return map[num] || [0,0,0];
}

export function yaosToBaGuaNum(yaos: number[]): number {
  const sum = yaos[0]*100 + yaos[1]*10 + yaos[2];
  const map: Record<number, number> = {111:1,112:2,121:3,122:4,211:5,212:6,221:7,222:8};
  return map[sum] || 0;
}

export function yaoToYinYang(yao: number): number {
  return yao > 2 ? yao - 2 : yao;
}

export function guaNumToName(num: number): string {
  return num >= 1 && num <= 8 ? BA_GUA_NAMES[num-1] : '';
}

export function guaNumToWuXing(num: number): string {
  return num >= 1 && num <= 8 ? BA_GUA_WU_XING[num-1] : '';
}

export function getZhiIndex(zhi: string): number {
  for (let i = 0; i < 12; i++) if (DI_ZHI_12[i] === zhi) return i + 1;
  return 0;
}
