// Copyright (c) 2026 不惑之心 (buhuo.xin)
// 作者：净志 | 微信：haitaojingzhi | 官网：https://www.buhuo.xin
// 仅开源排盘算法，不含卦爻辞、解卦等内容。

import { buildContext, liuYaoShiJianQiGua, meiHuaShiJianQiGua, liuYaoShuZiQiGua, meiHuaShuZiQiGua, liuYaoSuiJiQiGua, liuYaoShouYaoQiGua, meiHuaShouYaoQiGua, movingLineIndex, getBianGuaYaos, getGuaTexts, YAO_SHAO_YANG, YAO_SHAO_YIN, YAO_LAO_YANG, guaExMap, DivinationContext } from '../src';

describe('bushi4ts', () => {
  test('GUAS64', () => {
    const { GUAS64 } = require('../src');
    expect(GUAS64[0][0]).toBe('乾为天');
    expect(GUAS64[7][7]).toBe('坤为地');
    expect(GUAS64[7][5]).toBe('地水师');
  });

  test('guaExMap has 64 entries', () => {
    expect(Object.keys(guaExMap).length).toBe(64);
  });

  test('六爻时间起卦', () => {
    const ctx = buildContext(new Date(2026, 3, 30, 10, 0, 0));
    const result = liuYaoShiJianQiGua(ctx);
    expect(result.benGua.name).toBe('地水师');
    expect(result.bianGua!.name).toBe('山水蒙');
  });

  test('梅花时间起卦', () => {
    const ctx = buildContext(new Date(2026, 3, 29, 19, 0, 0));
    const result = meiHuaShiJianQiGua(ctx);
    expect(result.benGua.name).toBe('山泽损');
    expect(result.bianGua!.name).toBe('火泽睽');
  });

  test('晚子时换日', () => {
    const ctx23 = buildContext(new Date(2026, 3, 30, 23, 0, 0));
    const ctxNext = buildContext(new Date(2026, 4, 1, 0, 0, 0));
    expect(ctx23.ganZhi[2]).toBe(ctxNext.ganZhi[2]);
  });

  test('变卦', () => {
    const yaos = [YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG];
    yaos[0] = YAO_LAO_YANG;
    const bian = getBianGuaYaos(yaos, 0);
    expect(bian[0]).toBe(2);
  });

  test('手摇起卦', () => {
    const ctx = buildContext(new Date(2026, 3, 30, 10, 0, 0));
    const yaos = [YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG, YAO_SHAO_YANG];
    const result = liuYaoShouYaoQiGua(ctx, yaos);
    expect(result.benGua.name).toBe('乾为天');
  });

  test('标准装卦：山火贲三爻动变山雷颐', () => {
    const ctx: DivinationContext = {
      ganZhi: ['丙午', '丙申', '甲寅', '乙亥'], xunKong: '子丑',
      lunarMonth: 6, lunarDay: 26,
    };
    const result = liuYaoShiJianQiGua(ctx);

    expect(result.benGua).toEqual({ name: '山火贲', yaos: [1, 2, 2, 3, 2, 1] });
    expect(result.bianGua).toEqual({ name: '山雷颐', yaos: [1, 2, 2, 2, 2, 1] });
    expect(result.liuShen).toEqual(['玄武', '白虎', '螣蛇', '勾陈', '朱雀', '青龙']);
    expect(result.benGuaEx).toMatchObject({
      liuQin: '官财兄财兄官', shi: 6, ying: 3,
      ganZhi: ['寅木', '子水', '戌土', '亥水', '丑土', '卯木'],
      fuCang: [{ pos: 4, value: '子申金' }, { pos: 5, value: '父午火' }],
    });
    expect(result.bianGuaEx).toMatchObject({
      liuQin: '官财兄兄官财', shi: 3, ying: 6,
      fuCang: [{ pos: 2, value: '子巳火' }, { pos: 4, value: '官酉金' }],
    });
  });

  test('手摇输入方向和多动爻契约', () => {
    const ctx: DivinationContext = {
      ganZhi: ['丙午', '丙申', '甲寅', '乙亥'], xunKong: '子丑',
      lunarMonth: 6, lunarDay: 26,
    };
    const bottomUp = [YAO_SHAO_YANG, YAO_SHAO_YIN, YAO_LAO_YANG,
      YAO_SHAO_YIN, YAO_SHAO_YIN, YAO_SHAO_YANG];
    const standard = liuYaoShouYaoQiGua(ctx, [...bottomUp].reverse());
    expect(standard.benGua.name).toBe('山火贲');
    expect(standard.bianGua?.name).toBe('山雷颐');

    const multiple = liuYaoShouYaoQiGua(ctx,
      [YAO_LAO_YANG, 2, 2, YAO_LAO_YANG, 2, 1]);
    expect(multiple.bianYao).toBe(0);
    expect(multiple.bianGua?.yaos[0]).toBe(YAO_SHAO_YIN);
    expect(multiple.bianGua?.yaos[3]).toBe(YAO_SHAO_YIN);
  });

  test('数字起卦第三个数字按6取余决定动爻', () => {
    const ctx: DivinationContext = {
      ganZhi: ['丙午', '丙申', '甲寅', '乙亥'], xunKong: '子丑',
      lunarMonth: 6, lunarDay: 26,
    };
    const cases: Array<[number, number]> = [[0, 0], [1, 5], [6, 0], [7, 5], [12, 0], [13, 5]];
    for (const [yaoNumber, expectedIndex] of cases) {
      expect(movingLineIndex(yaoNumber)).toBe(expectedIndex);
      const liuYao = liuYaoShuZiQiGua(ctx, [1, 1, yaoNumber]);
      expect(liuYao.bianYao).toBe(expectedIndex);
      expect(liuYao.benGua.yaos.flatMap((yao, index) => yao >= 3 ? [index] : [])).toEqual([expectedIndex]);
      expect(meiHuaShuZiQiGua(ctx, [1, 1, yaoNumber]).bianYao).toBe(expectedIndex);
    }
    expect(liuYaoShuZiQiGua(ctx, [1, 1, 1]).bianGua?.name).toBe('天风姤');
  });

  test('随机与无动爻手摇的动爻契约', () => {
    const ctx: DivinationContext = {
      ganZhi: ['丙午', '丙申', '甲寅', '乙亥'], xunKong: '子丑',
      lunarMonth: 6, lunarDay: 26,
    };
    for (let i = 0; i < 20; i++) {
      const result = liuYaoSuiJiQiGua(ctx);
      expect(result.bianYao).toBeGreaterThanOrEqual(0);
      expect(result.bianYao).toBeLessThan(6);
      expect(result.benGua.yaos.filter(yao => yao === 3 || yao === 4)).toHaveLength(1);
    }
    const staticLiuYao = liuYaoShouYaoQiGua(ctx, Array(6).fill(YAO_SHAO_YANG));
    expect(staticLiuYao.bianYao).toBe(-1);
    expect(staticLiuYao.bianGua).toBeNull();
    expect(staticLiuYao.bianGuaEx).toBeNull();
    expect(meiHuaShouYaoQiGua(ctx, Array(6).fill(YAO_SHAO_YANG)).bianYao).toBe(-1);
  });

  test('内置卦爻辞可直接读取', () => {
    expect(getGuaTexts('乾为天')?.name).toBe('乾为天');
    expect(getGuaTexts('不存在')).toBeNull();
  });
});
