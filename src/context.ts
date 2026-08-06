import { DivinationContext } from './types';

const JIA_ZI = [
  '甲子','乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉',
  '甲戌','乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛巳','壬午','癸未',
  '甲申','乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳',
  '甲午','乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸卯',
  '甲辰','乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑',
  '甲寅','乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥',
];
const XUN_KONG = ['戌亥','申酉','午未','辰巳','寅卯','子丑'];

function getXunKong(dayGanZhi: string): string {
  const idx = JIA_ZI.indexOf(dayGanZhi);
  if (idx < 0) return '';
  return XUN_KONG[Math.floor(idx / 10)];
}

/**
 * 晚子时换日：23:00~00:00 归入次日子时。
 */
export function ziHourCalculationTime(dt: Date): Date {
  if (dt.getHours() === 23) {
    return new Date(dt.getTime() + 3600000);
  }
  return dt;
}

/**
 * 从公历 Date 构建排盘上下文。
 * 23:00~00:00（晚子时）自动按次日子时排盘。
 * 需要 lunar-javascript 库。
 */
export function buildContext(dt: Date): DivinationContext {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Lunar } = require('lunar-javascript');
  const calcTime = ziHourCalculationTime(dt);
  const lunar = Lunar.fromDate(calcTime);
  const ganZhi = [
    lunar.getYearInGanZhi(),
    lunar.getMonthInGanZhi(),
    lunar.getDayInGanZhi(),
    lunar.getTimeInGanZhi(),
  ];
  const xunKong = getXunKong(ganZhi[2]);
  let lunarMonth = lunar.getMonth();
  if (lunarMonth < 0) lunarMonth = -lunarMonth;
  const lunarDay = lunar.getDay();
  return { ganZhi, xunKong, lunarMonth, lunarDay };
}
