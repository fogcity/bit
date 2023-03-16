// 一个公钥密码学方案使用的椭圆曲线通过如下变量定义：
// ·确定 Secp256k1 曲线 y2=x3+ax+b中的a和b。
// ·确定有限域需要的质数p。
// ·确定起点G的坐标（gx，gy）。

import { createFFE, FiniteFieldElement } from './FiniteFieldElement';
import { FiniteFieldPoint } from './FiniteFieldPoint';

// ·确定通过G生成的群的阶数n。
export class Group {
  elements: FiniteFieldPoint[] = [];
  constructor(public g: FiniteFieldPoint, public n: bigint) {
    for (let i = 0n; i < n; i++) {
      const ng = g.mul(n);
      this.elements.push(ng);
    }
  }
}
export class EllipticCurve {
  constructor(public a: FiniteFieldElement, public b: FiniteFieldElement, public p: bigint) {}
  group(g: FiniteFieldPoint, n: bigint) {
    return new Group(g, n);
  }
  point(x: FiniteFieldElement, y: FiniteFieldElement) {
    return new FiniteFieldPoint(x, y, this.a, this.b, this.p);
  }
}

export class Secp256k1 extends EllipticCurve {
  constructor(a: bigint, b: bigint) {
    const p = BigInt(2 ** 256 - 2 ** 32 - 977);
    super(createFFE(a, p), createFFE(b, p), p);
  }
  group() {
    const gx = createFFE(BigInt(5.5066263022277344e76), this.p);
    const gy = createFFE(BigInt(3.2670510020758816e76), this.p);
    const g = this.point(gx, gy);
    return super.group(g, BigInt(1.157920892373162e77));
  }
}

export function secp256k1Group() {
  return new Secp256k1(0n, 7n).group();
}
