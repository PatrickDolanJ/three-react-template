uniform sampler2D tDiffuse;
uniform float uTime;
varying vec2 vUv;

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    gl_FragColor = color;
    gl_FragColor.r *= sin(uTime * 2.0) + 1.0;
}