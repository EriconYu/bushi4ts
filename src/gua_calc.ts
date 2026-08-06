// Copyright (c) 2026 不惑之心 (buhuo.xin)
// 作者：净志 | 微信：haitaojingzhi | 官网：https://www.buhuo.xin
// 仅开源排盘算法，不含卦爻辞、解卦等内容。

import { yaoToYinYang, yaosToBaGuaNum, GUAS64 } from './gua_data';

export function getHuGuaYaos(benYaos: number[]): number[] {
  return [
    yaoToYinYang(benYaos[1]), yaoToYinYang(benYaos[2]), yaoToYinYang(benYaos[3]),
    yaoToYinYang(benYaos[2]), yaoToYinYang(benYaos[3]), yaoToYinYang(benYaos[4]),
  ];
}

export function getBianGuaYaos(benYaos: number[], pos: number): number[] {
  const bian: number[] = [0,0,0,0,0,0];
  for (let i = 0; i < 6; i++) {
    bian[i] = benYaos[i];
    const isMoving = bian[i] === 3 || bian[i] === 4;
    const isThisMoving = (pos === -1 && isMoving) || (pos >= 0 && i === pos && isMoving);
    if (isThisMoving) {
      bian[i] = bian[i] === 3 ? 2 : 1;
    } else {
      bian[i] = yaoToYinYang(bian[i]);
    }
  }
  return bian;
}

export function get64GuaNameByYaos(yaos: number[]): string {
  const yt = yaos.map(yaoToYinYang);
  const shang = [yt[2], yt[1], yt[0]];
  const xia = [yt[5], yt[4], yt[3]];
  const sg = yaosToBaGuaNum(shang);
  const xg = yaosToBaGuaNum(xia);
  if (sg < 1 || sg > 8 || xg < 1 || xg > 8) return '';
  return GUAS64[sg-1][xg-1];
}
