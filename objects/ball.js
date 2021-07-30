//import * as THREE from '../node_modules/three/src/Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import Dim from '../inviroment/dimintion.js';

class Ball {

    constructor(radius, mass, pos, type, scene, balls,panel) {
        
        //refrances
        this.panel     = panel;
        this.balls     = balls;
        // physiacal parameters
        this.a         = new Dim(0, 0, 0); 
        this.v         = new Dim(0, 0, 0);
        this.d         = new Dim(0, 0, 0);
        this.radius    = radius;
        this.mass      = mass;
        this.MF        = 1;
        //Forces
        this.Forces     = {
            wheigt  : new Dim(0, this.mass * (10), 0),
            friction: new Dim(0, 0, 0),
            traction: new Dim(0, 0, 0),
            res     : new Dim(0, 0, 0),
            result  : new Dim(0, 0, 0)
        }
        this.P         = new Dim(this.v.x * this.mass, this.v.y * this.mass, this.v.z * this.mass);
        this.dimintion = panel.dimintion;

        //sphere
        this.geometry     = new THREE.SphereGeometry(radius, 32, 32);
        this.material     = new THREE.MeshPhongMaterial();
        this.material.map = THREE.ImageUtils.loadTexture(types[type]);
        this.mesh         = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 0, 0);
        this.mesh.castShadow    = true;
        this.mesh.receiveShadow = true;
        this.container = new THREE.Object3D();
        this.container.position.set(pos.x, pos.y , pos.z);
        this.container.add(this.mesh);
        this.cx = new THREE.Object3D();
        scene.add(this.container);
        this.balls.push(this)
        
    }

    fixedPos() {
        this.cx.position.x = this.container.position.x;
        this.cx.position.y = this.container.position.y + this.radius + this.radius * 10;
        this.cx.position.z = this.container.position.z - 0.5 - this.radius * 10;
        return this.cx.position;
    }

    pos() {
        return this.container.position;
    }

    speed(V) {
        this.v.x = V.x;
        this.v.z = V.z;
        this.v.y = V.y;
        V.z = 0;
        V.x = 0;
        V.y = 0;
    }
    


    move() {

        //air resistance force
         this.Forces.res.x = 0.5 * 1.1455 * Math.PI * (this.radius ** 2) * (this.v.x ** 2);
         this.Forces.res.y = 0.5 * 1.1455 * Math.PI * (this.radius ** 2) * (this.v.y ** 2);
         this.Forces.res.z = 0.5 * 1.1455 * Math.PI * (this.radius ** 2) * (this.v.z ** 2);

        //friction force
        this.Forces.friction.x = this.Forces.wheigt.y * this.MF;
        this.Forces.friction.z = this.Forces.wheigt.y * this.MF;
        //acceleration
        this.a.x = this.Forces.result.x / this.mass;             
        this.a.y = this.Forces.wheigt.y / this.mass;
        this.a.z = this.Forces.result.z / this.mass;             
        //velocity
        this.v.x += this.a.x / 60;  //fps
        this.v.y += this.a.y / 60;
        this.v.z += this.a.z / 60;
        //distance to translate
        this.d.x = (this.v.x / 60) - (0.5 * this.a.x / 3600);
        this.d.y = (this.v.y / 60) - (0.5 * this.a.y / 3600);
        this.d.z = (this.v.z / 60) - (0.5 * this.a.z / 3600);
       
        //move
        this.Forces.res= new Dim(0,0,0);
        this.mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), this.d.z / this.radius)
        this.container.translateZ(this.d.z);
        this.mesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), -this.d.x / this.radius)
        this.container.translateX(this.d.x);
        this.container.translateY(-this.d.y);
        this.mesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -(this.d.y / 4) / this.radius);



    
        this.check();
        this.dormant();
    }

    dormant() {
        
        let vx, vy, vz;
        let ax, ay, az;


        ax = (this.Forces.res.x) / this.mass;
        ay = (this.Forces.res.y) / this.mass;
        az = (this.Forces.res.z) / this.mass;

        vz = az / 60;
        vy = ay / 60;
        vx = ax / 60;
       
       
        if (this.v.z > 0) {
            if (this.Forces.result.z >= 0)
                this.Forces.result.z -= (this.Forces.res.z + this.Forces.friction.z +(this.mass/2)) / 10;

           // this.v.z -= vz;
           
        }
        if (this.v.z < 0) {
            if (this.Forces.result.z <= 0)
                this.Forces.result.z += (this.Forces.res.z + this.Forces.friction.z +(this.mass/2)) / 10;

           // this.v.z += vz;
           
        }

        if (this.v.x > 0) {
            if (this.Forces.result.x >= 0)
                this.Forces.result.x -= (this.Forces.res.x + this.Forces.friction.x +(this.mass/2)) / 10;
               // this.v.x -= vx;
        }
        if (this.v.x < 0) {
            if (this.Forces.result.x <= 0)
                this.Forces.result.x += (this.Forces.res.x + this.Forces.friction.x +(this.mass/2)) / 10;
               // this.v.x += vx;
        }


        if (this.v.y > 0) {
                this.v.x -= vx;
        }
        if (this.v.y < 0) {
                this.v.x += vx;
        }

        console.log("vx =" + vx + "vz= " + vz + "F = " + this.Forces.friction.x + " r= " + this.Forces.res.x + "rz= " + this.Forces.res.z);
        
    }

    check() {
        let v1 = new Dim(0, 0, 0);
        let v2 = new Dim(0, 0, 0);

        for (var i = 1; i < this.balls.length; i++) {
            if (this.balls[i] == this)
                continue;
            var dis = Math.sqrt(((this.pos().x - this.balls[i].pos().x) ** 2) + ((this.pos().z - this.balls[i].pos().z) ** 2));
            var tar = this.radius + this.balls[i].radius;

            //balls coolision
            if (dis< tar)
            {
                if(this.container.position.x>=dis|| this.container.position.x<= -dis)
                {
                    v1.x =((this.v.x * (this.mass - this.balls[i].mass)) + (2 * this.balls[i].mass * this.balls[i].v.x)) / ((this.mass + this.balls[i].mass));
                    v1.y =((this.v.y * (this.mass - this.balls[i].mass)) + (2 * this.balls[i].mass * this.balls[i].v.y)) / ((this.mass + this.balls[i].mass));
                    v1.z =-((this.v.z * (this.mass - this.balls[i].mass)) + (2 * this.balls[i].mass * this.balls[i].v.z)) / ((this.mass + this.balls[i].mass));
                }
                if(this.container.position.z>=dis|| this.container.position.z<= -dis)
                {
                    v1.x =-((this.v.x * (this.mass - this.balls[i].mass)) + (2 * this.balls[i].mass * this.balls[i].v.x)) / ((this.mass + this.balls[i].mass));
                    v1.y =((this.v.y * (this.mass - this.balls[i].mass)) + (2 * this.balls[i].mass * this.balls[i].v.y)) / ((this.mass + this.balls[i].mass));
                    v1.z =((this.v.z * (this.mass - this.balls[i].mass)) + (2 * this.balls[i].mass * this.balls[i].v.z)) / ((this.mass + this.balls[i].mass));
                }
               
                v2.x =((this.balls[i].v.x * (this.balls[i].mass - this.mass)) + (2 * this.mass * this.v.x)) / ((this.mass + this.balls[i].mass));
                v2.y = ((this.balls[i].v.y * (this.balls[i].mass - this.mass)) + (2 * this.mass * this.v.y)) / ((this.mass + this.balls[i].mass));
                v2.z = ((this.balls[i].v.z * (this.balls[i].mass - this.mass)) + (2 * this.mass * this.v.z)) / ((this.mass + this.balls[i].mass));

                this.balls[i].speed(v2);
                this.speed(v1);

            }
        }

        // ball falling
        let pdis =this.pos().y; 
        let ptar = this.radius;
        if (pdis-0.04 < ptar && !(this.pos().x >= this.dimintion / 2 | this.pos().z >= this.dimintion / 2 |
                            this.pos().x <= -this.dimintion / 2 | this.pos().z <= -this.dimintion / 2))
            {
                if(this.pos().y <this.radius)
                   this.container.position.y =this.radius;

               let pv1 = new Dim(0,0,0);
               let pv2 = new Dim(0,0,0);

                pv1.x =this.v.x;
                pv1.y =((this.mass/2)/this.mass)* ((this.v.y * (this.mass - this.panel.mass)) + (2 * this.panel.mass * 0)) / ((this.mass + this.panel.mass));
                pv1.z =this.v.z;

                pv2.x = ((0 * (this.panel.mass - this.mass)) + (2 * this.mass * this.v.x)) / ((this.mass + this.panel.mass));
                pv2.y = ((0 * (this.panel.mass - this.mass)) + (2 * this.mass * this.v.y)) / ((this.mass + this.panel.mass));
                pv2.z = ((0 * (this.panel.mass - this.mass)) + (2 * this.mass * this.v.z)) / ((this.mass + this.panel.mass));

               
                this.speed(pv1);

            }

         //panel walls
            if(this.pos().x>(this.panel.dimintion/2)-0.2-this.radius || this.pos().x< -(this.panel.dimintion/2)+0.2 +this.radius||
               this.pos().z>(this.panel.dimintion/2)-0.2-this.radius || this.pos().z< -(this.panel.dimintion/2)+0.2+this.radius)
               {

                   let bv1 = new Dim(0,0,0);
                   if(this.pos().x>=(this.panel.dimintion/2)-0.2-this.radius || this.pos().x<= -(this.panel.dimintion/2)+0.2 +this.radius)
                   {
                    bv1.x =0.9* ((this.v.x * (this.mass - this.panel.mass)) + (2 * this.panel.mass * 0)) / ((this.mass + this.panel.mass));
                    bv1.y = this.v.y;
                    bv1.z =-0.9* ((this.v.z * (this.mass - this.panel.mass)) + (2 * this.panel.mass * 0)) / ((this.mass + this.panel.mass));
                    this.speed(bv1);
                   }
                   if(this.pos().z>=(this.panel.dimintion/2)-0.2-this.radius || this.pos().z<= -(this.panel.dimintion/2)+0.2+this.radius)
                   {
                    bv1.x =-0.9* ((this.v.x * (this.mass - this.panel.mass)) + (2 * this.panel.mass * 0)) / ((this.mass + this.panel.mass));
                    bv1.y = this.v.y;
                    bv1.z = 0.9* ((this.v.z * (this.mass - this.panel.mass)) + (2 * this.panel.mass * 0)) / ((this.mass + this.panel.mass));
                    this.speed(bv1);
                   }


               }


        return true;

    }

    mohasile(F) {
        
        if (F.x > 0) {
            this.Forces.result.x = F.x - this.Forces.friction.x;
        }
        if (F.x < 0) {
            this.Forces.result.x = F.x + this.Forces.friction.x;
        }
        if (F.z > 0) {
            this.Forces.result.z = F.z - this.Forces.friction.z;
        }
        if (F.z < 0) {
            this.Forces.result.z = F.z + this.Forces.friction.z;
        }
        if (this.Forces.result.x > 0 && F.x < 0)
            this.Forces.result.x = 0;
        if (this.Forces.result.x < 0 && F.x > 0)
            this.Forces.result.x = 0;
        if (this.Forces.result.z > 0 && F.z < 0)
            this.Forces.result.z = 0;
        if (this.Forces.result.z < 0 && F.z > 0)
            this.Forces.result.z = 0;
        
        F.x = F.z = 0;
    }

}



var types = {

    bill    : './resources/bill.png',
    wood    : './resources/wood.jpg',
    football: './resources/football.jpg'

}

function round(x, y) {

    return parseFloat((x).toPrecision(y));
}

export default Ball;
