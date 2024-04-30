#include <fog_pars_vertex>
varying vec2 vUv;

void main(){
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
    #include <fog_vertex>
    gl_Position = projectionMatrix * mvPosition;
}
