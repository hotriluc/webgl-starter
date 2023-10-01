import "@styles/styles.scss";

import Layout from "@app/classes/Layout";
import Scene from "@canvas/Scene";

interface IApp {
  Scene: Scene;
  Layout: Layout;
}

declare global {
  interface Window {
    APP: IApp;
  }
}
const APP = window.APP || {};

const initApp = () => {
  window.APP = APP;

  APP.Layout = new Layout();
  APP.Scene = new Scene();
};

initApp();
