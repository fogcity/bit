import { FiniteFieldElement ,createElement} from "./FiniteFieldElement";
import { FiniteFieldPoint } from "./Point";

export class FiniteField {
    constructor(public prime:bigint){

    }
    createElement(num:bigint){
        return createElement(num,this.prime)
    } 
    createCurve(a: bigint,  b: bigint){
      return (x: bigint,  y: bigint) => {
        return new FiniteFieldPoint(x,y,a,b,this.prime)
      }
    }
   
    toArray(){
    return [...new FiniteField(this.prime)] as FiniteFieldElement[]
    }
    [Symbol.iterator]() {
        return {
          current: 1n,
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

export function createFiniteField(prime:bigint){
    return new Proxy(new FiniteField(prime), {
        get: function(target, prop, receiver) {
          if(isNaN(Number(prop)))
            return (target as any)[prop]
          else return target.createElement(BigInt(prop as string));
        }
      })
}