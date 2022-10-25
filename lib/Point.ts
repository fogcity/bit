// export class Point {
//     constructor(public x: number, public y: number, public a: number, public b: number) {
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
//         let s: number;
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

import { createFiniteFieldElement, FiniteFieldElement } from "./FiniteFieldElement";
export class FiniteFieldPoint {


    x: FiniteFieldElement;
    y: FiniteFieldElement;
    a: FiniteFieldElement;
    b: FiniteFieldElement;

    constructor( x: number,  y: number,  a: number,  b: number, public p:number) {
        this.x = createFiniteFieldElement(x,this.p) 
        this.y = createFiniteFieldElement(y,this.p) 
        this.a = createFiniteFieldElement(a,this.p) 
        this.b = createFiniteFieldElement(b,this.p) 

        if (x == Infinity && y== Infinity)
            return
        if (this.y.pow(2).ne(this.x.pow(3).add(this.a.mul(this.x)).add(this.b)))
            throw new Error(`(${x}, ${y}) is not on the curve`);
    }
    eq(p: FiniteFieldPoint) {
        return this.x.eq(p.x) && this.y.eq(p.y)
            && this.a.eq(p.a) && this.b.eq(p.b)
    }
    ne(p: FiniteFieldPoint) {
        return !this.eq(p)
    }
    add(p: FiniteFieldPoint) {
        if (this.a.ne(p.a) || this.b.ne(p.b))
            throw new Error(`Points (${this.x.toString()},${this.y.toString()}), (${p.x.toString()},${p.y.toString()}) are not on the same curve`);
        if (this.x == p.x && this.y != p.y)
            return new FiniteFieldPoint(Infinity, Infinity, this.a.num, this.b.num,this.p)
        if (this.x.num == Infinity)
            return p
        if (p.x.num == Infinity)
            return this

        let s: FiniteFieldElement;
        // 求直线斜率，求交点
        if (this.x == p.x && this.y == p.y) {
            // 两点相同时切线的斜率等于该点的导数
            s = this.x.mul(createFiniteFieldElement(3,this.p)).pow(2).add(this.a.div(createFiniteFieldElement(2,this.p)).mul(this.x))
        } else s = (p.y - this.y) / (p.x - this.x)
        const x = Math.pow(s, 2) - this.x - p.x
        const y = s * (this.x - x) - this.y
        return new FiniteFieldPoint(x, y, this.a, this.b,this.p)
    }
    rmul(t:number){

    }
    
}

