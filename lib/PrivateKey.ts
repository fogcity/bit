import { Secp256k1 } from './EllipticCurve';
import { Signature } from './Signature';

export class PrivateKey {
  point;
  constructor(public secret: bigint) {
    this.point = Secp256k1.G.mul(secret);
  }
  deterministic(z: bigint) {
    // 确定性算法生成k
    return this.secret + z;
  }
  sign(z: bigint) {
    const { N, G, mod } = Secp256k1;
    const k = this.deterministic(z);
    const r = G.mul(k).x.num;
    const k_inv = mod(k ** N - 2n);
    let s = mod((z + r * this.secret) * k_inv);
    if (s > N / 2n) s = N - s;

    return new Signature(r, s);
  }
}
