export class EllipticCurve {
    constructor(
        public a:number,
        public b:number,
        public p:number,
        public gx:number,public gy:number,public n:number){

        }
}

export function secp256k1(){
    const p = 1.157920892373162e+77
    const gx = 5.5066263022277344e+76
    const gy = 3.2670510020758816e+76
    const n = 1.157920892373162e+77
    return new EllipticCurve(0,7,p,gx,gy,n)
} 