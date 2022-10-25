export class Point {
    constructor(public x: number, public y: number, public a: number, public b: number) {
        if (x == Point.INF && y == Point.INF)
            return
        if (this.y ** 2 != this.x ** 3 + a * x + b)
            throw new Error(`(${x}, ${y}) is not on the curve`);
    }
    eq(p: Point) {
        return this.x == p.x && this.y == p.y
            && this.a == p.a && this.b == p.b
    }
    ne(p: Point) {
        return !this.eq(p)
    }
    add(p: Point) {

        if (this.a != p.a || this.b != p.b)
            throw new Error(`Points (${this.x},${this.y}), (${p.x},${p.y}) are not on the same curve`);
        if (this.x == p.x && this.y != p.y)
            return new Point(Point.INF, Point.INF, this.a, this.b)
        if (this.x == Point.INF)
            return p
        if (p.x == Point.INF)
            return this

        let s: number;
        // 求直线斜率，求交点
        if (this.x == p.x && this.y == p.y) {
            // 两点相同时切线的斜率等于该点的导数
            s = 3 * this.x ** 2 + this.a / 2 * this.x
        } else s = (p.y - this.y) / (p.x - this.x)
        const x = Math.pow(s, 2) - this.x - p.x
        const y = s * (this.x - x) - this.y
        return new Point(x, y, this.a, this.b)
    }
    static INF = Infinity

}

