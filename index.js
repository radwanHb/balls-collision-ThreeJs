import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
//import * as THREE from './node_modules/three/src/Three.js';
import Ball       from './objects/ball.js';
import Box        from './objects/box.js';
import Panel      from './inviroment/panel.js';
import Light      from './inviroment/light.js';
import Render     from './inviroment/render.js';
import Camera     from './inviroment/camera.js';
import Keyboard   from './inviroment/keyboard.js';



var d =0;

var camera, scene, renderer, light ,keyboard , panel;

var ball ,ball2 ,ball3;

var balls = [];
var radius = 0.1;

init();
animate();


function init() {
    
    renderer         = new Render();
    scene            = new THREE.Scene();
    camera           = new Camera(scene);
    keyboard         = new Keyboard();
    light            = new Light(scene);
    scene.background = new THREE.Color( 0xDDF4FF );
    panel            = new Panel(20,1,1,scene);
    //------------------------------------------------------------------
    ball  = new Ball(radius , 2 , {x:0,y:20,z:0} , 'bill' , scene , balls,panel);
    ball2 = new Ball(radius , 2 , {x:0,y:20,z:1} , 'wood' , scene , balls,panel);
    ball3 = new Ball(radius , 2 , {x:0,y:20,z:2} , 'bill' , scene , balls,panel);
    new Ball(radius , 2 , {x:1,y:20,z:2} , 'bill' , scene , balls,panel);
    new Ball(radius , 2 , {x:0,y:20,z:3} , 'bill' , scene , balls,panel);
    new Ball(radius , 2 , {x:1,y:20,z:3} , 'bill' , scene , balls,panel);
    new Ball(radius , 2 , {x:-1,y:10,z:3} , 'bill' , scene , balls,panel);
    //------------------------------------------------------------------
   

}

function animate() {

    setTimeout( function() {

        requestAnimationFrame( animate );
    
    }, 1000/60);

    
    //choose any ball you want
    keyboard.control(balls[d]);
    // balls[d].move();


    for(var i=0 ; i<balls.length ; i++)
            {
                // if(i == d)
                // continue;
                balls[i].move();
               // console.log(balls[0].pos().x);

            }


    camera.target   (balls[d]);
    light.target    (balls[d]);
   
    renderer.render(scene, camera.get());

}



// responsive
window.addEventListener('resize', () => {
    camera.get().aspect = window.innerWidth / window.innerHeight;
    camera.get().updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


  