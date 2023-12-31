import {
  Renderer,
  Camera,
  Transform,
  OGLRenderingContext,
  Box,
  Program,
  Mesh,
} from "ogl";

import vertexShader from "@app/shaders/sketch/vertex.glsl";
import fragmentShader from "@app/shaders/sketch/fragment.glsl";

export default class Scene {
  renderer: Renderer;
  gl: OGLRenderingContext;
  camera: Camera;
  scene: Transform;

  constructor() {
    // Setup Renderer and GL Context
    this.renderer = new Renderer({
      canvas: document.querySelector<HTMLCanvasElement>(".canvas")!,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    this.gl = this.renderer.gl;

    // Setup the camera
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 5;

    // Setup the scene
    this.scene = new Transform();

    // Add objects to the scene
    this.addObjects();

    // Events
    this.onResize();
    this.update();
    this.bindEvents();
  }

  addObjects() {
    const geometry = new Box(this.gl);
    const program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
    });

    const mesh = new Mesh(this.gl, { geometry, program });
    mesh.setParent(this.scene);
  }

  // Main tick from where we invoke other components to update
  update() {
    window.requestAnimationFrame(this.update.bind(this));

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });
  }

  // Event Handlers
  onResize() {
    const { screen } = window.APP.Layout;

    // Recalculate viewport sizes
    this.renderer.setSize(screen.width, screen.height);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    window.APP.Layout.setViewport(width, height);
  }

  // Events binding
  bindEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
