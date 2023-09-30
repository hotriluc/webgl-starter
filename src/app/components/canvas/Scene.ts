import * as THREE from "three";

export default class {
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".canvas")!,
    alpha: true,
  });
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  scene: THREE.Scene = new THREE.Scene();

  geometry: THREE.BoxGeometry | null = null;
  mesh: THREE.Mesh | null = null;
  material: THREE.MeshBasicMaterial | null = null;
  time = 0;

  constructor() {
    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupCamera();
    this.onResize();

    this.addObjects();

    this.update();
    this.bindEvents();
  }

  addObjects() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setupRenderer() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setAnimationLoop(() => {
      this.update();
    });
  }

  setupCamera() {
    this.camera.fov = 45;
    this.camera.position.z = 5;
  }

  /**
   * Handlers
   */
  onWheel() {}

  onResize() {
    const { screen } = window.APP.Layout;

    this.renderer.setSize(screen.width, screen.height);
    this.camera.aspect = screen.width / screen.height;
    this.camera.updateProjectionMatrix();

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    window.APP.Layout.setViewport(width, height);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.time += 0.05;

    // if (this.mesh) {
    //   this.mesh.rotation.y = this.time;
    // }
  }

  /**
   * Add Event Listeners
   */
  bindEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
