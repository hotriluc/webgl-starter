import Layout from "./app/Layout";
import Scene from "./app/Scene";

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
