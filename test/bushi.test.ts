import { buildContext, liuYaoShiJianQiGua, meiHuaShiJianQiGua, liuYaoShouYaoQiGua, getBianGuaYaos, YAO_SHAO_YANG, YAO_LAO_YANG, guaExMap } from '../src';

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
});
