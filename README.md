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

## 开源说明

本库仅开源排盘算法，不包含卦爻辞、解卦、诸葛神算等内容。

## 许可证

MIT
