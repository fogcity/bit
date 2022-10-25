import React from "react";
import { createRoot } from "react-dom/client";


import { useEffect } from "react";
import {Point} from  "../lib";
const container = document.getElementById("root");
const root = createRoot(container);
const a = new Point(-1,-1,5,7)


root.render(
  <React.StrictMode>
   
  </React.StrictMode>
);
