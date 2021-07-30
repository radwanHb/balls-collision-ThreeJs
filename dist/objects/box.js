//import * as THREE from '../node_modules/three/src/Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

class Box {

    constructor(dimintion, pos, scene) {
        this.box = new THREE.Mesh(
            new THREE.BoxGeometry(dimintion.x, dimintion.y, dimintion.z),
            new THREE.MeshStandardMaterial({
                color: 0xFFFFFF,
            }));
        this.box.position.set(pos.x, dimintion.y / 2, pos.z);
        this.box.castShadow    = true;
        this.box.receiveShadow = true;

        scene.add(this.box);

    }

    pos(){

        return this.box.position;
    }

}

export default Box;
function round(x,y){

    return parseFloat((x).toPrecision(y));
    }