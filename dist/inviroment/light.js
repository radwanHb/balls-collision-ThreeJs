//import * as THREE from '../node_modules/three/src/Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';


class Light {

    constructor(scene) {
        this.light                       = new THREE.DirectionalLight(0xffffff, 1.2);
        this.light.position.x            = 20;
        this.light.position.y            = 50;
        this.light.position.z            = -20;
        this.light.shadow.mapSize.width  = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.d                           = 5;
        this.light.castShadow            = true;
        this.light.shadow.camera.left    = -this.d;
        this.light.shadow.camera.right   =  this.d;
        this.light.shadow.camera.top     =  this.d;
        this.light.shadow.camera.bottom  = -this.d;
        this.light.shadow.camera.near    = 0.1;
        this.light.shadow.camera.far     = 100;
        scene.add(this.light);
    }

    target(object) {
        this.light.target = object.container;
    }


}

export default Light;