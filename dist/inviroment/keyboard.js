
import Dim from './dimintion.js';

document.body.addEventListener('keydown', function (e) {

    var key = e.code.replace('Key', '').toLowerCase();
    if (keys[key] !== undefined)
        keys[key] = true;

});
// key up
document.body.addEventListener('keyup', function (e) {

    var key = e.code.replace('Key', '').toLowerCase();
    if (keys[key] !== undefined)
        keys[key] = false;

});

class Keyboard {

    constructor() { this.F = new Dim(0,0,0); }

    control(ball) {            
            if (keys.w ) 
                this.F.z = ball.Forces.res.z  +ball.Forces.friction.x+ (ball.mass/2)+2;  
            if (keys.s ) 
                this.F.z = -(ball.Forces.res.z  +ball.Forces.friction.x+(ball.mass/2)+2);
            if (keys.a ) 
                this.F.x = ball.Forces.res.x  +ball.Forces.friction.x+ (ball.mass/2)+2;
            if (keys.d ) 
                this.F.x = -(ball.Forces.res.x  +ball.Forces.friction.x+(ball.mass/2)+2);
           
            ball.mohasile(this.F);
    }
}
var keys = {
    a: false,
    s: false,
    d: false,
    w: false,

};

export default Keyboard;