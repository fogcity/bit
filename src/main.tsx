import React, { memo } from 'react';
import { createRoot } from 'react-dom/client';

import { useEffect } from 'react';
import { createFFE, creatFF, FiniteFieldPoint, mod } from '../lib';
const container = document.getElementById('root');
const root = createRoot(container);

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
const ff = creatFF(103n);
const e17 = ff.createElement(17n);
const e64 = ff.createElement(64n);
const e0 = ff.createElement(0n);
const e7 = ff.createElement(7n);
console.log(new FiniteFieldPoint(e17, e64, e0, e7, 103n));

root.render(<div></div>);
