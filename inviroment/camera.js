//import * as THREE from '../node_modules/three/src/Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

class Camera {

    constructor(scene) {
        this.camera = new THREE.PerspectiveCamera(
            60, window.innerWidth / window.innerHeight, 0.01, 100);
        this.camera.position.set(2, 5, -2);

        scene.add(this.camera)
    }

    target(object) {
        this.camera.position.lerp(object.fixedPos(), 0.1);
        this.camera.lookAt(object.pos());
    }

    get() {
        return this.camera;
    }


}

export default Camera;