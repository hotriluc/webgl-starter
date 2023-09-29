import { ISizes } from "../interfaces/Sizes.interface";

export default class Layout {
  screen: ISizes = {
    width: 0,
    height: 0,
  };
  viewport: ISizes = {
    width: 0,
    height: 0,
  };

  constructor() {
    this.onResize();
    this.bindEvents();
  }

  setViewport(width: number, height: number) {
    this.viewport = {
      width: width,
      height: height,
    };
  }

  onResize() {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.onResize();
    });
  }
}
