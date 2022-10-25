import { FiniteFieldElement ,createFiniteFieldElement} from "./FiniteFieldElement";

export class FiniteField {
    constructor(public prime:number){

    }
    createFiniteFieldElement(num:number){
        return createFiniteFieldElement(num,this.prime)
    }
    toArray(){
    return [...new FiniteField(this.prime)] as FiniteFieldElement[]
    }
    [Symbol.iterator]() {
        return {
          current: 1,
          last: this.prime,
    
          next() {

            if (this.current < this.last) {
              return { done: false, value: new FiniteFieldElement(this.current++,this.last) };
            } else {
              return { done: true };
            }
          }
        };
      }
}

export function createFiniteField(prime:number){
    return new Proxy(new FiniteField(prime), {
        get: function(target, prop, receiver) {
          if(isNaN(Number(prop)))
            return (target as any)[prop]
          else return target.createFiniteFieldElement(Number(prop));
        }
      })
}