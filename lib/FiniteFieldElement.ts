export class FiniteFieldElement {

    constructor(public num: number, public prime: number) {
        if (num >= prime || num < 0) {
            throw new Error(`Num ${num} not in field range 0 to ${prime - 1}`);
        }
    }

    isSameField(fe: FiniteFieldElement) {
        return this.prime == fe.prime
    }
    eq(fe: FiniteFieldElement) {
        return this.num == fe.num && this.isSameField(fe)
    }
    ne(fe: FiniteFieldElement) {
        return !this.eq(fe)
    }
    add(fe: FiniteFieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot add two numbers in different Fields');
        }
        const num = (this.num + fe.num) % this.prime
        return new FiniteFieldElement(num, this.prime)
    }
    sub(fe: FiniteFieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot sub two numbers in different Fields');
        }
        const num = (this.num - fe.num) % this.prime
        return new FiniteFieldElement(num, this.prime)
    }
    mul(fe: FiniteFieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot sub mul numbers in different Fields');
        }
        const num = (this.num * fe.num) % this.prime
        return new FiniteFieldElement(num, this.prime)
    }
    pow(exp: number) {
        // 利用费马小定理转换计算
        const n = exp % (this.prime - 1)
        const num = Math.pow(this.num, n) % this.prime
        return new FiniteFieldElement(num, this.prime)
    }
    div(fe: FiniteFieldElement) {
        if (!this.isSameField(fe)) {
            throw new Error('Cannot sub div numbers in different Fields');
        }
        const n = fe.pow(this.prime - 2)
        return this.mul(n)
    }
}

export function createFiniteFieldElement(num: number, prime: number){
    return new FiniteFieldElement(num,prime)

}