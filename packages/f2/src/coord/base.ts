import Layout from '../base/layout';
import { Range, Point, Option } from './types';
import { isArray } from '@antv/util';

function transposedRect({ xMin, xMax, yMin, yMax }) {
  return { xMin: yMin, xMax: yMax, yMin: xMin, yMax: xMax };
}

function convertRect({ x, y, size, y0 }: RectPoint) {
  let xMin: number;
  let xMax: number;
  if (isArray(x)) {
    xMin = x[0];
    xMax = x[1];
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  let yMin: number;
  let yMax: number;
  if (isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = Math.min(y0, y);
    yMax = Math.max(y0, y);
  }

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
}

// 绘制矩形的关键点
interface RectPoint {
  x: number | [number, number];
  y: number | [number, number];
  y0?: number;
  size?: number;
}

/**
 * 直角坐标系
 * convert相关的方法，涉及将标准坐标系映射到实际坐标系内
 * transform相关的方法，是仅将某一种关键点转换成另一种关键点 (比如将x/y/size/y0转换成yMin/yMax/..)
 */
class Base extends Layout {
  type: string;
  // 用来特殊标识是否是极坐标
  isPolar: boolean;
  // x y 调换
  transposed = false;

  // 中心点的坐标
  center: Point;

  // x，y 的值域，在极坐标中对应的就是弧度和半径
  x: Range = [0, 1];
  y: Range = [0, 1];

  constructor(option: Option) {
    super(option);
    this.update(option);
  }

  update(option: Option) {
    super.update(option);

    const { left, top, width, height } = this;
    this.center = {
      x: left + width / 2,
      y: top + height / 2,
    };
    return this;
  }

  // 是循环， 比如极坐标是以 2π 循环的
  isCyclic() {
    return false;
  }

  // 把归一后的值映射到对应的定义域
  convertPoint(point) {
    return point;
  }

  convertRect(rectPoint: RectPoint) {
    const { x: xRange, y: yRange } = this;
    const [xStart, xEnd] = xRange;
    const [yStart, yEnd] = yRange;

    const { xMin, xMax, yMin, yMax } = this.transformToRect(rectPoint);

    const x0 = xStart + (xEnd - xStart) * xMin;
    const x1 = xStart + (xEnd - xStart) * xMax;
    const y0 = yStart + (yEnd - yStart) * yMin;
    const y1 = yStart + (yEnd - yStart) * yMax;

    return {
      xMin: Math.min(x0, x1),
      xMax: Math.max(x0, x1),
      yMin: Math.min(y0, y1),
      yMax: Math.max(y0, y1),
    };
  }

  transformToRect(rectPoint: RectPoint) {
    const { transposed } = this;
    const rect = convertRect(rectPoint);
    const { xMin, xMax, yMin, yMax } = transposed ? transposedRect(rect) : rect;

    return { xMin, xMax, yMin, yMax };
  }

  // 把canvas坐标的点位映射回归一后的值
  invertPoint(point) {
    return point;
  }
}

export default Base;
