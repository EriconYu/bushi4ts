# bushi4ts

卜筮 — TypeScript 六爻 / 梅花易数排盘引擎，基于 [lunar-javascript](https://github.com/6tail/lunar-javascript)。

## 功能

- 64卦排盘（本卦、互卦、变卦）
- 六爻装卦（纳甲、六亲、世应、伏藏、六神）
- 梅花易数起卦（时间 / 数字 / 随机 / 手摇）
- 六爻起卦（时间 / 数字 / 随机 / 手摇）
- 基于 [lunar-javascript](https://github.com/6tail/lunar-javascript) 提供干支、旬空、农历月日
- 晚子时自动换日（23:00~00:00 归入次日子时）
- 内置 64 卦卦爻辞与解卦静态文本（见下方开源说明）

## 安装

```bash
npm install bushi4ts
```

## 快速上手

```typescript
import { buildContext, liuYaoShiJianQiGua, meiHuaShiJianQiGua, getGuaTexts } from 'bushi4ts';

const ctx = buildContext(new Date(2026, 3, 30, 10, 0, 0)); // JS month is 0-indexed

// 六爻时间起卦
const r = liuYaoShiJianQiGua(ctx);
console.log(r.benGua.name);     // 地水师
console.log(r.bianGua!.name);   // 山水蒙
console.log(r.benGuaEx!.liuQin); // 父兄官财官子

// 梅花时间起卦
const mh = meiHuaShiJianQiGua(ctx);
console.log(mh.benGua.name);

// 卦爻辞与解卦
const texts = getGuaTexts('乾为天');
console.log(texts?.yaoCi); // 卦辞 + 爻辞
console.log(texts?.jieXi); // 解卦解析
```

## 起卦方式

| 方式 | 六爻 | 梅花 |
|------|------|------|
| 时间起卦 | `liuYaoShiJianQiGua` | `meiHuaShiJianQiGua` |
| 数字起卦 | `liuYaoShuZiQiGua` | `meiHuaShuZiQiGua` |
| 随机起卦 | `liuYaoSuiJiQiGua` | `meiHuaSuiJiQiGua` |
| 手摇起卦 | `liuYaoShouYaoQiGua` | `meiHuaShouYaoQiGua` |

## 排盘结果

`PaipanResult` 包含：

- `benGua` / `huGua` / `bianGua`：本卦、互卦、变卦（卦名 + 六爻阴阳）
- `benGuaEx` / `bianGuaEx`：纳甲装卦（地支干支、六亲、世应、伏藏、卦身、八宫、五行、类型）
- `liuShen`：六神（根据日干排列）
- `ganZhi`：四柱干支、`xunKong`：旬空
- `bianYao`：动爻位置

## 卦爻辞与解卦

```typescript
const texts = getGuaTexts('乾为天');
console.log(texts?.yaoCi); // 卦辞 + 爻辞
console.log(texts?.jieXi); // 解卦解析
```

## 多语言版本

bushi（卜筮）同时提供以下语言版本：

- **Dart**：[bushi4dart](https://github.com/EriconYu/bushi4dart)
- **Go**：[bushi4go](https://github.com/EriconYu/bushi4go)
- **Java**：[bushi4java](https://github.com/EriconYu/bushi4java)
- **Python**：[bushi4python](https://github.com/EriconYu/bushi4python)
- **TypeScript**：[bushi4ts](https://github.com/EriconYu/bushi4ts)
- **Swift**：[bushi4swift](https://github.com/EriconYu/bushi4swift)
- **Kotlin**：[bushi4kotlin](https://github.com/EriconYu/bushi4kotlin)

---

## 关于不惑之心

**不惑之心** — 传统文化与命理工具品牌

- **官网**：[https://www.buhuo.xin](https://www.buhuo.xin)
- **作者**：净志
- **微信**：haitaojingzhi

## 开源说明

- 排盘算法（六爻、梅花易数、64 卦）以 **MIT** 许可证开源。
- `data/gua_texts.json` 内附 64 卦卦爻辞、解卦等静态文本，
  其版权归 **不惑之心** 所有，随库附带方便调用，但 **不以 MIT 开源**，
  不得用于另行出版、售卖或二次分发。
- 诸葛神算、观音灵签、81 数理等解读服务，请访问 [不惑之心](https://www.buhuo.xin)。

## 许可证

MIT

Copyright (c) 2026 不惑之心
