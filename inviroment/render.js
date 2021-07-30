//import * as THREE from '../node_modules/three/src/Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

class Render {

    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: false
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        return this.renderer;
    }
}

export default Render;