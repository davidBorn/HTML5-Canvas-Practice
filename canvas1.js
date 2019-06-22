/*makes the canvas element cover the entire screen */
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/*creating a random color*/
// function getRandomColor() {
//     creating a random number between 0 and 255
//     var r = Math.floor(Math.random() * 256);
//     var g = Math.floor(Math.random() * 256);
//     var b = Math.floor(Math.random() * 256);

//     going from decimal to hex
//     var hexR = r.toString(16);
//     var hexG = g.toString(16);
//     var hexB = b.toString(16);

//     making sure single character values are prepended with a "0"
//     if (hexR.length == 1) {
//         hexR = "0" + hexR;
//     }

//     if (hexG.length == 1) {
//         hexG = "0" + hexG;
//     }

//     if (hexB.length == 1) {
//         hexB = "0" + hexB;
//     }

//     creating the hex value by concatenatening the string values
//     var hexColor = "#" + hexR + hexG + hexB;

//     return hexColor.toUpperCase();
// }

// /*Random color variable */

// /*dwawing a 2d element in our canvas*/
var c = canvas.getContext('2d');

// c.fillStyle = "black";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "grey";
// c.fillRect(200, 200, 100, 100);
// c.fillRect(400, 300, 100, 100);
// c.fillRect(500, 400, 100, 100);

// /*drawing a line*/
// c.beginPath();
// c.moveTo(100, 300);
// c.lineTo(300, 100);
// c.lineTo(500, 300);
// c.strokeStyle = "grey";
// c.stroke();

// /*arc or a circle*/
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "black";
// c.stroke();

// /*for loop runs multiple times to create multiple circles of different colors*/
// for (var i = 0; i < 1000; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     var randomColor = getRandomColor();
//     c.strokeStyle = randomColor;
//     c.stroke();

// }
// var randomColor = getRandomColor();

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
//var minRadius = 2;
var colorArray = ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'];

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;


    })

// window.addEventListener('resize',
//     function (event) {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//     });


//*circle object*//
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();

    }
    /*allowing particles to bounce off the sides of the screen*/
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;

        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }


}


//*circle array*// 

var circleArray = [];
function init() {


    circleArray = [];

    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));

    }
}
init ();



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    //*putting new draw function into our animate function*//
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}


animate();