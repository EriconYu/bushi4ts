import { DivinationContext, PaipanResult, GuaInfo } from './types';
import { YAO_LAO_YANG, YAO_LAO_YIN } from './types';
import { yaosToBaGuaNum, yaoToYinYang, guaNumToName, guaNumToWuXing, getZhiIndex, GUAS64 } from './gua_data';
import { getHuGuaYaos, getBianGuaYaos, get64GuaNameByYaos } from './gua_calc';
import { buildLiuyaoResult } from './liuyao';

export function meiHuaShiJianQiGua(ctx: DivinationContext): PaipanResult {
  const yearZhi = ctx.ganZhi[0][1];
  const hourZhi = ctx.ganZhi[3][1];
  const yzNum = getZhiIndex(yearZhi);
  const hzNum = getZhiIndex(hourZhi);
  const sumYMD = yzNum + ctx.lunarMonth + ctx.lunarDay;
  const sumYMDH = sumYMD + hzNum;
  let shang = sumYMD % 8; if (shang === 0) shang = 8;
  let xia = sumYMDH % 8; if (xia === 0) xia = 8;
  let bianPos = 6 - (sumYMDH % 6); if (bianPos === 6) bianPos = 0;
  return buildLiuyaoResult(ctx, shang, xia, bianPos, '梅花时间起卦');
}

export function meiHuaShuZiQiGua(ctx: DivinationContext, numbers: [number, number, number]): PaipanResult {
  let shang = numbers[0] % 8; if (shang === 0) shang = 8;
  let xia = numbers[1] % 8; if (xia === 0) xia = 8;
  let bianPos = 6 - ((numbers[0]+numbers[1]+numbers[2]) % 6); if (bianPos === 6) bianPos = 0;
  return buildLiuyaoResult(ctx, shang, xia, bianPos, '梅花数字起卦');
}

export function meiHuaSuiJiQiGua(ctx: DivinationContext): PaipanResult {
  const now = Date.now();
  const n0 = Math.floor(now/1000) % 9 + 1;
  const n1 = Math.floor(now/10000) % 9 + 1;
  const n2 = Math.floor(now/100000) % 9 + 1;
  return meiHuaShuZiQiGua(ctx, [n0, n1, n2]);
}

export function meiHuaShouYaoQiGua(ctx: DivinationContext, yaos: number[]): PaipanResult {
  const shangYY = [yaoToYinYang(yaos[2]), yaoToYinYang(yaos[1]), yaoToYinYang(yaos[0])];
  const xiaYY = [yaoToYinYang(yaos[5]), yaoToYinYang(yaos[4]), yaoToYinYang(yaos[3])];
  const shangGua = yaosToBaGuaNum(shangYY);
  const xiaGua = yaosToBaGuaNum(xiaYY);
  const benGuaName = GUAS64[shangGua-1][xiaGua-1];
  const benGua: GuaInfo = { name: benGuaName, yaos: [...yaos] };
  const huYaos = getHuGuaYaos(yaos);
  const huGua: GuaInfo = { name: get64GuaNameByYaos(huYaos), yaos: huYaos };
  let bianPos = -1;
  for (let i = 0; i < 6; i++) {
    if (yaos[i] === YAO_LAO_YANG || yaos[i] === YAO_LAO_YIN) { bianPos = i; break; }
  }
  if (bianPos === -1) bianPos = 0;
  const bianYaos = getBianGuaYaos(yaos, bianPos);
  const bianGua: GuaInfo = { name: get64GuaNameByYaos(bianYaos), yaos: bianYaos };
  return {
    method: '梅花手摇起卦', ganZhi: ctx.ganZhi, xunKong: ctx.xunKong,
    benGua, huGua, bianGua, bianYao: bianPos,
    shangGua: guaNumToName(shangGua), xiaGua: guaNumToName(xiaGua),
    shangGuaWuXing: guaNumToWuXing(shangGua), xiaGuaWuXing: guaNumToWuXing(xiaGua),
    benGuaEx: null, bianGuaEx: null, liuShen: null,
  };
}
