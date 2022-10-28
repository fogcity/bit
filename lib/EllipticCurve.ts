// 一个公钥密码学方案使用的椭圆曲线通过如下变量定义：
// ·确定曲线y2=x3+ax+b中的a和b。
// ·确定有限域需要的质数p。
// ·确定起点G的坐标（x，y）。
// ·确定通过G生成的群的阶数n。

export class EllipticCurve {
    constructor(
        public a:bigint,
        public b:bigint,
        public p:bigint,
        public gx:bigint,
        public gy:bigint,
        public n:bigint){
            console.log("gy**2 % p",gy**2 % p);
            console.log("(gx**3 + 7) % p",(gx**3 + 7) % p);
            
            console.log('check',gy**2 % p == ((gx**3%p) + (7 % p)))

            
        }
}

export function secp256k1(){
    const p = 2**256 - 2**32 - 977
    const gx = 5.5066263022277344e+76
    const gy = 3.2670510020758816e+76
    const n = 1.157920892373162e+77
    return new EllipticCurve(0,7,p,gx,gy,n)
} 