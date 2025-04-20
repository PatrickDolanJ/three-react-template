varying vec2 vUv;
void main() {
    //Diffuse Color will take into account lighting etc.
    csm_DiffuseColor = vec4(vUv, 1.0, 1.0);
}
