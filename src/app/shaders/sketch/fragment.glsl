precision highp float;

varying vec2 vUv;

vec2 coverUV(vec2 u, vec2 s, vec2 i) {
  vec2 ratio = vec2(
    min((s.x / s.y) / (i.x / i.y), 1.0),
    min((s.y / s.x) / (i.y / i.x), 1.0)
  );

  // calculate new uv with new ratio
  vec2 st = vec2(
    u.x * ratio.x + (1.0 - ratio.x) * 0.5,
    u.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  return st;
}

void main() {
    gl_FragColor = vec4(1.0, 0.2, 0.5, 1.0);
}