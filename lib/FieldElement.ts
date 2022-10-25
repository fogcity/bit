export class FieldElement {
    constructor(public num: number, public prime: number) {
        if (num >= prime || num < 0) {
            throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`);
        }
    }
    isSameField(fe: FieldElement) {
        return this.prime == fe.prime
    }
    eq(fe: FieldElement) {
        return this.num == fe.num && this.isSameField(fe)
    }
    ne(fe: FieldElement) {
        return !this.eq(fe)
    }
    add(fe: FieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot add two numbers in different Fields');
        }
        const num = (this.num + fe.num) % this.prime
        return new FieldElement(num, this.prime)
    }
    sub(fe: FieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot sub two numbers in different Fields');
        }
        const num = (this.num - fe.num) % this.prime
        return new FieldElement(num, this.prime)
    }
    mul(fe: FieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot sub mul numbers in different Fields');
        }
        const num = (this.num * fe.num) % this.prime
        return new FieldElement(num, this.prime)
    }
    pow(exp: number) {
        // 利用费马小定理转换计算
        const n = exp % (this.prime - 1)
        const num = Math.pow(this.num, n) % this.prime
        return new FieldElement(num, this.prime)
    }
    div(fe: FieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot sub div numbers in different Fields');
        }
        const n = fe.pow(this.prime - 2)
        return this.mul(n)
    }
}