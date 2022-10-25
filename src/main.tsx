import React from "react";
import { createRoot } from "react-dom/client";


import { useEffect } from "react";
import {Point,createFiniteField} from  "../lib";
const container = document.getElementById("root");
const root = createRoot(container);

const f107 = createFiniteField(107)
const a = f107[5]
console.log(a);

root.render(
  <React.StrictMode>
   
  </React.StrictMode>
);
