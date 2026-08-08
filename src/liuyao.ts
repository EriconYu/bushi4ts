// Copyright (c) 2026 不惑之心 (buhuo.xin)
// 作者：净志 | 微信：haitaojingzhi | 官网：https://www.buhuo.xin
// 仅开源排盘算法，不含卦爻辞、解卦等内容。

import { DivinationContext, PaipanResult, GuaInfo, GuaExData } from './types';
import { YAO_LAO_YANG, YAO_LAO_YIN } from './types';
import { baGuaNumToYaos, yaosToBaGuaNum, yaoToYinYang, guaNumToName, guaNumToWuXing, getZhiIndex, GUAS64 } from './gua_data';
import { getHuGuaYaos, getBianGuaYaos, get64GuaNameByYaos } from './gua_calc';
import { getGuaEx, reloadLiuQin, getLiuShen } from './gua_ex_data';

/** 构建完整六爻排盘；bianPos 使用 0=上爻、5=初爻、-1=无动爻。 */
export function buildLiuyaoResult(ctx: DivinationContext, shangGua: number, xiaGua: number, bianPos: number, method: string): PaipanResult {
  const shang = baGuaNumToYaos(shangGua);
  const xia = baGuaNumToYaos(xiaGua);
  const benYaos = [shang[2], shang[1], shang[0], xia[2], xia[1], xia[0]];
  if (bianPos >= 0 && bianPos < 6) benYaos[bianPos] += 2;

  const benGuaName = GUAS64[shangGua-1][xiaGua-1];
  const benGua: GuaInfo = { name: benGuaName, yaos: benYaos };

  const huYaos = getHuGuaYaos(benYaos);
  const huGua: GuaInfo = { name: get64GuaNameByYaos(huYaos), yaos: huYaos };

  const bianYaos = getBianGuaYaos(benYaos, bianPos);
  const bianGuaName = get64GuaNameByYaos(bianYaos);
  const bianGua: GuaInfo = { name: bianGuaName, yaos: bianYaos };

  const benGuaEx = getGuaEx(benGuaName);
  const bianGuaExRaw = getGuaEx(bianGuaName);

  let finalBianEx: GuaExData | null = null;
  if (benGuaEx && bianGuaExRaw) {
    const blq = reloadLiuQin(benGuaEx.wuXing, bianGuaExRaw.ganZhi);
    finalBianEx = { ...bianGuaExRaw, liuQin: blq.join('') };
  }

  let liuShen: string[] | null = null;
  if (ctx.ganZhi[2].length >= 1) {
    liuShen = getLiuShen(ctx.ganZhi[2][0]);
  }

  return {
    method, ganZhi: ctx.ganZhi, xunKong: ctx.xunKong,
    benGua, huGua, bianGua, bianYao: bianPos,
    shangGua: guaNumToName(shangGua), xiaGua: guaNumToName(xiaGua),
    shangGuaWuXing: guaNumToWuXing(shangGua), xiaGuaWuXing: guaNumToWuXing(xiaGua),
    benGuaEx, bianGuaEx: finalBianEx, liuShen,
  };
}

export function liuYaoShiJianQiGua(ctx: DivinationContext): PaipanResult {
  const yearZhi = ctx.ganZhi[0][1];
  const hourZhi = ctx.ganZhi[3][1];
  const yzNum = getZhiIndex(yearZhi);
  const hzNum = getZhiIndex(hourZhi);
  const sumYMD = yzNum + ctx.lunarMonth + ctx.lunarDay;
  const sumYMDH = sumYMD + hzNum;
  let shang = sumYMD % 8; if (shang === 0) shang = 8;
  let xia = sumYMDH % 8; if (xia === 0) xia = 8;
  let bianPos = 6 - (sumYMDH % 6); if (bianPos === 6) bianPos = 0;
  return buildLiuyaoResult(ctx, shang, xia, bianPos, '六爻时间起卦');
}

export function liuYaoShuZiQiGua(ctx: DivinationContext, numbers: [number, number, number]): PaipanResult {
  let shang = numbers[0] % 8; if (shang === 0) shang = 8;
  let xia = numbers[1] % 8; if (xia === 0) xia = 8;
  let bianPos = 6 - ((numbers[0]+numbers[1]+numbers[2]) % 6); if (bianPos === 6) bianPos = 0;
  return buildLiuyaoResult(ctx, shang, xia, bianPos, '六爻数字起卦');
}

export function liuYaoSuiJiQiGua(ctx: DivinationContext): PaipanResult {
  const now = Date.now();
  const n0 = Math.floor(now/1000) % 9 + 1;
  const n1 = Math.floor(now/10000) % 9 + 1;
  const n2 = Math.floor(now/100000) % 9 + 1;
  return liuYaoShuZiQiGua(ctx, [n0, n1, n2]);
}

/**
 * 手摇起卦。yaos 必须按上爻到初爻传入。
 * 铜钱记录若按初爻到上爻产生，调用前使用 `[...records].reverse()` 转换一次；
 * 返回数组可直接从索引 0 向下渲染，不要再次反转。
 */
export function liuYaoShouYaoQiGua(ctx: DivinationContext, yaos: number[]): PaipanResult {
  const shangYY = [yaoToYinYang(yaos[2]), yaoToYinYang(yaos[1]), yaoToYinYang(yaos[0])];
  const xiaYY = [yaoToYinYang(yaos[5]), yaoToYinYang(yaos[4]), yaoToYinYang(yaos[3])];
  const shangGua = yaosToBaGuaNum(shangYY);
  const xiaGua = yaosToBaGuaNum(xiaYY);

  const benGuaName = GUAS64[shangGua-1][xiaGua-1];
  const benGua: GuaInfo = { name: benGuaName, yaos: [...yaos] };

  const huYaos = getHuGuaYaos(yaos);
  const huGua: GuaInfo = { name: get64GuaNameByYaos(huYaos), yaos: huYaos };

  const bianYaos = getBianGuaYaos(yaos, -1);
  const bianGua: GuaInfo = { name: get64GuaNameByYaos(bianYaos), yaos: bianYaos };

  const benGuaEx = getGuaEx(benGuaName);
  const bianGuaExRaw = getGuaEx(bianGua.name);
  let finalBianEx: GuaExData | null = null;
  if (benGuaEx && bianGuaExRaw) {
    const blq = reloadLiuQin(benGuaEx.wuXing, bianGuaExRaw.ganZhi);
    finalBianEx = { ...bianGuaExRaw, liuQin: blq.join('') };
  }

  let liuShen: string[] | null = null;
  if (ctx.ganZhi[2].length >= 1) {
    liuShen = getLiuShen(ctx.ganZhi[2][0]);
  }

  let bianPos = -1;
  for (let i = 0; i < yaos.length; i++) {
    if (yaos[i] === YAO_LAO_YANG || yaos[i] === YAO_LAO_YIN) { bianPos = i; break; }
  }

  return {
    method: '六爻手动起卦', ganZhi: ctx.ganZhi, xunKong: ctx.xunKong,
    benGua, huGua, bianGua, bianYao: bianPos,
    shangGua: guaNumToName(shangGua), xiaGua: guaNumToName(xiaGua),
    shangGuaWuXing: guaNumToWuXing(shangGua), xiaGuaWuXing: guaNumToWuXing(xiaGua),
    benGuaEx, bianGuaEx: finalBianEx, liuShen,
  };
}
