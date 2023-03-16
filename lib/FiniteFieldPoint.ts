// export class Point {
//     constructor(public x: bigint, public y: bigint, public a: bigint, public b: bigint) {
//         if (x == FiniteFieldPoint.INF && y == FiniteFieldPoint.INF)
//             return
//         if (this.y ** 2 != this.x ** 3 + a * x + b)
//             throw new Error(`(${x}, ${y}) is not on the curve`);
//     }
//     eq(p: Point) {
//         return this.x == p.x && this.y == p.y
//             && this.a == p.a && this.b == p.b
//     }
//     ne(p: Point) {
//         return !this.eq(p)
//     }
//     add(p: Point) {
//         if (this.a != p.a || this.b != p.b)
//             throw new Error(`Points (${this.x},${this.y}), (${p.x},${p.y}) are not on the same curve`);
//         if (this.x == p.x && this.y != p.y)
//             return new Point(FiniteFieldPoint.INF, FiniteFieldPoint.INF, this.a, this.b)
//         if (this.x == FiniteFieldPoint.INF)
//             return p
//         if (p.x == FiniteFieldPoint.INF)
//             return this
//         let s: bigint;
//         // 求直线斜率，求交点
//         if (this.x == p.x && this.y == p.y) {
//             // 两点相同时切线的斜率等于该点的导数
//             s = 3 * this.x ** 2 + this.a / 2 * this.x
//         } else s = (p.y - this.y) / (p.x - this.x)
//         const x = Math.pow(s, 2) - this.x - p.x
//         const y = s * (this.x - x) - this.y
//         return new Point(x, y, this.a, this.b)
//     }
//     static INF = Infinity
// }

import { createFFE, FiniteFieldElement } from './FiniteFieldElement';

const createINFPoint = (a: FiniteFieldElement, b: FiniteFieldElement, p: bigint) => {
  const inf = createFFE(0n, p);
  return new FiniteFieldPoint(inf, inf, a, b, p);
};
export class FiniteFieldPoint {
  constructor(
    public x: FiniteFieldElement,
    public y: FiniteFieldElement,
    public a: FiniteFieldElement,
    public b: FiniteFieldElement,
    public p: bigint,
  ) {
    // 检验是否是无穷远点
    if (x.isINF() && y.isINF()) return;

    // if y2 != x3+ax+b
    if (y.pow(2n).ne(x.pow(3n).add(x.mul(a)).add(b))) throw new Error(`(${x}, ${y}) is not on the curve`);
  }
  eq(p: FiniteFieldPoint) {
    return this.x == p.x && this.y == p.y && this.a == p.a && this.b == p.b;
  }
  ne(p: FiniteFieldPoint) {
    return !this.eq(p);
  }
  add(p: FiniteFieldPoint) {
    if (this.a != p.a || this.b != p.b)
      throw new Error(`Points (${this.x},${this.y}), (${p.x},${p.y}) are not on the same curve`);
    if (this.x == p.x && this.y != p.y) return createINFPoint(this.a, this.b, this.p);

    // 检验是否是无穷远点

    if (this.x.isINF()) return p;
    if (p.x.isINF()) return this;

    let s: FiniteFieldElement;
    // 求直线斜率，求交点
    if (this.x == p.x && this.y == p.y) {
      // 两点相同时切线的斜率等于该点的导数
      s = this.x.pow(2n).mul(3n).div(this.y.mul(2n));
    } else {
      // 两点不同时
      s = p.y.sub(this.y).div(p.x.sub(this.x));
    }

    const x = s.pow(2n).sub(this.x).sub(p.x);
    const y = s.mul(this.x.sub(x)).sub(this.y);

    return new FiniteFieldPoint(x, y, this.a, this.b, this.p);
  }
  mul(c: bigint) {
    let coef = c;
    let current = new FiniteFieldPoint(this.x, this.y, this.a, this.b, this.p);
    let result = createINFPoint(this.a, this.b, this.p);
    while (coef) {
      if (coef & 1n) {
        result = result.add(current);
      }
      current = current.add(current);
      coef >>= 1n;
    }
    return result;
  }
}
