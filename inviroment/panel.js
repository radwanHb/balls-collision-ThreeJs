//import * as THREE from '../node_modules/three/src/Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import Box from '../objects/box.js';
import Dim from './dimintion.js';


class Panel {

    constructor(dimintion, grid, axis, scene) {
        // أبعاد الأرضية -- مربعة dimintion*dimintion

        this.dimintion = dimintion;
        this.mass = 99999999999;
        // plane --------------------------------------------------------
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.dimintion, this.dimintion, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 13168,
            }));
        this.plane.castShadow    = false;
        this.plane.receiveShadow = true;
        this.plane.rotation.x    = -Math.PI / 2;
        this.plane.position.set(0, 0, 0)
        scene.add(this.plane);

        // Grid and axis helper--------------------------------------------
        if (grid) {
            this.gridHelper = new THREE.GridHelper(this.dimintion, this.dimintion );  // الشبكة
            this.gridHelper.position.set(0, 0, 0);
            scene.add(this.gridHelper);
        }
        if (axis)
            scene.add(new THREE.AxesHelper()); // المحاور اللي بالمنتصف


        //walls ----------------------------------------------------------

        this.wall1 = new Box(new Dim(this.dimintion, 0.1, 0.4), new Dim(0, 0.1, this.dimintion / 2), scene);
        this.wall3 = new Box(new Dim(0.4, 0.1, this.dimintion), new Dim(this.dimintion / 2, 0.1, 0), scene);
        this.wall4 = new Box(new Dim(0.4, 0.1, this.dimintion), new Dim(-this.dimintion / 2, 0.1, 0), scene);
        this.wall5 = new Box(new Dim(this.dimintion, 0.1, 0.4), new Dim(0, 0.1, -this.dimintion / 2), scene);



    }



}

export default Panel;
