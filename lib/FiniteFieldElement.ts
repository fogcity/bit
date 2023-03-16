export function mod(n: bigint, m: bigint) {
  return ((n % m) + m) % m;
}
export class FiniteFieldElement {
  constructor(public num: bigint, public prime: bigint) {
    if (num >= prime || num < 0) {
      throw new Error(`Num ${num} not in field range 0 to ${prime - 1n}`);
    }
  }

  isINF() {
    return this.num == 0n;
  }
  isSameField(fe: FiniteFieldElement) {
    return this.prime == fe.prime;
  }
  eq(fe: FiniteFieldElement) {
    return this.num == fe.num && this.isSameField(fe);
  }
  ne(fe: FiniteFieldElement) {
    return !this.eq(fe);
  }
  add(n: bigint | FiniteFieldElement) {
    const num = mod(this.num + (typeof n == 'bigint' ? n : n.num), this.prime);
    return createFFE(num, this.prime);
  }
  sub(n: bigint | FiniteFieldElement) {
    const num = mod(this.num - (typeof n == 'bigint' ? n : n.num), this.prime);
    return createFFE(num, this.prime);
  }
  mul(n: bigint | FiniteFieldElement) {
    const num = mod(this.num * (typeof n == 'bigint' ? n : n.num), this.prime);
    return createFFE(num, this.prime);
  }
  pow(exp: bigint) {
    // 利用费马小定理转换计算
    const n = mod(exp, this.prime - 1n);
    const num = mod(this.num ** n, this.prime);

    return createFFE(num, this.prime);
  }

  div(fe: FiniteFieldElement) {
    const n = fe.pow(this.prime - 2n);
    return this.mul(n.num);
  }

  fieldValid(fe: FiniteFieldElement, type: string) {
    if (!this.isSameField(fe)) {
      throw new Error(`Cannot ${type} two numbers in different Fields`);
    }
  }
}

export function createFFE(num: bigint, prime: bigint) {
  return new FiniteFieldElement(num, prime);
}
