import React from "react";
import { createRoot } from "react-dom/client";


import { useEffect } from "react";
import {createFFE,creatFF,secp256k1,FiniteFieldPoint, mod} from  "../lib";
const container = document.getElementById("root");
const root = createRoot(container);
import {Decimal} from 'decimal.js';

// const curve = secp256k1()
// const f = creatFF(curve.p)
// const x = f[curve.gx]
// const y = f[curve.gy]
// const a = f[0]
// const b = f[7]
// const g = new FiniteFieldPoint(x,y,a,b,curve.p)
// console.log(g);
// 0.0784
// const p = 223n
// const f = creatFF(p)
// const c = f.createCurve(0n,7n)
// const p2 = c(192n,105n)
// const p1 = c(17n,56n)
// const p3 = c(170n,142n)
// console.log('p3',p3);

// console.log(p1.add(p2));
const ff57 = creatFF(57n)
const ffe95 = createFFE(95n,97n)
const ffe45 = createFFE(45n,97n)
const ffe31 = createFFE(31n,97n)
const ffe6 = createFFE(6n,19n)
const ffe13 = createFFE(13n,19n)
// Decimal.set({ mod: 3 })
// const y = new Decimal(-9)
// const z = new Decimal(19)
// console.log(y.mod(z).d[0]);
// console.log(mod(-9n,19n));
// console.log(mod(-27n,13n));

const ffe4 = createFFE(4n,31n)
const ffe3= createFFE(3n,31n)
const ffe24 = createFFE(24n,31n)
const ffe17 = createFFE(17n,31n)
// console.log('s2',ff57.add(17n,42n,49n));

console.log(ffe3.div(ffe24));


root.render(
  <>
   
  </>
);
