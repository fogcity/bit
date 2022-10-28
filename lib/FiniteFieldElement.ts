export class FiniteFieldElement {

    constructor(public num: bigint, public prime: bigint) {
        if (num >= prime || num < 0) {
            throw new Error(`Num ${num} not in field range 0 to ${prime - 1n}`);
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
        this.fieldValid(fe,'add')
        const num = (this.num + fe.num) % this.prime
        return new FiniteFieldElement(num, this.prime)
    }
    sub(fe: FiniteFieldElement) {
        this.fieldValid(fe,'sub')
        const num = (this.num - fe.num) % this.prime
        return new FiniteFieldElement(num, this.prime)
    }
    mul(fe: FiniteFieldElement) {
        this.fieldValid(fe,'mul')
        const num = (this.num * fe.num) %this.prime   
        return new FiniteFieldElement(num, this.prime)
    }
    pow(exp: bigint) {
        // 利用费马小定理转换计算
        const n = exp % (this.prime - 1n)
        const num =  this.num ** n % this.prime
        console.log('1',num);
        
        return new FiniteFieldElement(num, this.prime)
    }
    div(fe: FiniteFieldElement) {
        
        this.fieldValid(fe,'div')
        const n = fe.pow(this.prime - 2n)
        return this.mul(n)
    }
    fieldValid(fe: FiniteFieldElement,type:string){
        if (!this.isSameField(fe)) {
            throw new Error(`Cannot ${type} two numbers in different Fields`);
        }
    }
}

export function createElement(num: bigint, prime: bigint){
    return new FiniteFieldElement(num,prime)

}