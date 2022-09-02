import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import AFRAME from "aframe";
import { stereoscopic } from "@belivvr/aframe-react-stereoscopic";

stereoscopic(AFRAME);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
