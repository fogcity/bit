// 一个公钥密码学方案使用的椭圆曲线通过如下变量定义：
// ·确定 Secp256k1 曲线 y2=x3+ax+b中的a和b。
// ·确定有限域需要的质数p。
// ·确定起点G的坐标（gx，gy）。

import { createFFE, FiniteFieldElement, mod } from './FiniteFieldElement';
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
  constructor() {
    const p = Secp256k1.p;
    super(createFFE(0n, p), createFFE(0n, p), p);
  }
  static p = BigInt(2 ** 256 - 2 ** 32 - 977);
  static a = createFFE(0n, this.p);
  static b = createFFE(7n, this.p);
  static Gx = createFFE(BigInt(5.5066263022277344e76), this.p);
  static Gy = createFFE(BigInt(3.2670510020758816e76), this.p);
  static G = new FiniteFieldPoint(Secp256k1.Gx, Secp256k1.Gy, Secp256k1.a, Secp256k1.b, this.p);
  static N = BigInt(1.157920892373162e77);
  static mod = (n: bigint) => mod(n, Secp256k1.N);
  group() {
    return super.group(Secp256k1.G, Secp256k1.N);
  }
}

export function s256() {
  return new Secp256k1();
}
