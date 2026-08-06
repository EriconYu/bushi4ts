# bushi4ts

卜筮 — TypeScript 六爻/梅花易数排盘引擎，基于 lunar-javascript。

## 功能

- 64卦排盘（本卦、互卦、变卦）
- 六爻装卦（纳甲、六亲、世应、伏藏、六神）
- 梅花易数起卦（时间 / 数字 / 随机 / 手摇）
- 六爻起卦（时间 / 数字 / 随机 / 手摇）
- 晚子时自动换日（23:00~00:00 归入次日子时）

## 快速上手

```typescript
import { buildContext, liuYaoShiJianQiGua } from 'bushi4ts';

const ctx = buildContext(new Date(2026, 3, 30, 10, 0, 0));
const result = liuYaoShiJianQiGua(ctx);
console.log(result.benGua.name);   // 地水师
console.log(result.bianGua!.name); // 山水蒙
```

---

## 关于不惑之心

**不惑之心** — 传统文化与命理工具品牌

- **官网**：[https://www.buhuo.xin](https://www.buhuo.xin)
- **作者**：净志
- **微信**：haitaojingzhi

## 开源说明

- 排盘算法（六爻、梅花易数、64卦）以 MIT 许可证开源。
- 各库内附的卦爻辞、解卦等静态文本版权归 **不惑之心** 所有，
  随库附带方便调用，但不以 MIT 开源，不得用于另行出版、售卖或二次分发。
- 诸葛神算、观音灵签、81 数理等更多解读服务，请访问 [不惑之心](https://www.buhuo.xin)。

## 许可证

MIT

Copyright (c) 2026 不惑之心