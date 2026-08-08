// Copyright (c) 2026 不惑之心 (buhuo.xin)
// 作者：净志 | 微信：haitaojingzhi | 官网：https://www.buhuo.xin
// 仅开源排盘算法，不含卦爻辞、解卦等内容。

import * as raw from '../data/gua_texts.json';

export interface GuaTexts {
  id: number;
  name: string;
  yaoCi: string;  // 卦爻辞（原文、译文、注释）
  jieXi: string;  // 解卦（白话文、邵雍、傅佩荣、张铭仁等解析）
}

const _cache: Record<string, GuaTexts> = raw as unknown as Record<string, GuaTexts>;

/** 按完整卦名同步读取内置文本；卦名不存在时返回 null，无需预加载。 */
export function getGuaTexts(guaName: string): GuaTexts | null {
  return _cache[guaName] || null;
}

/** 返回内置的全部 64 卦文本。 */
export function getAllGuaTexts(): Record<string, GuaTexts> {
  return _cache;
}
