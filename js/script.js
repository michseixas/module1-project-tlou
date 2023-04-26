const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //get context is a method of the canvas object that returns a ctx object

// -------My Classes----------------
class Component {
    constructor(x, y, w, h, imgElement) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.imgElement = imgElement;
    }

    draw() {
        //ctx is the canvas context used for drawing an image file (ex: .jpeg, .png)
        ctx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
    }
}

// -------My Functions----------------
function updateGameArea() {
    myGameArea.clear();
    myPedrito.draw(ctx);
    updateObstacles();
}

function startGame(){
    myGameArea.start();
}

function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1; //For each obstacle, it updates its position by subtracting 1 from the x coordinate
    myObstacles[i].draw();
  }

  myGameArea.frames += 1;


  if (myGameArea.frames % 200 === 0) { 
    //when this loop reaches 120 frames, it creates a new object, who has a random y coordinate and pushes the object into the array myObstacles.
      // x is the total width of the canvas 
      let x = myGameArea.canvas.width;
      // y is a random number between 0 and 420
      let y = Math.floor(Math.random() * 420);
      // push a new components into the myObstacles array.
      // this new component has the x and y we just calculated above
      // and has the image of a clicker
      myObstacles.push(new Component(x, y, 80, 80, obstacleClickerImage));
      
  } //this x and y are the ones defined in this scope!! :)
  
  if (myGameArea.frames % 200 === 0) { 
      let x = myGameArea.canvas.width;
      let y = Math.floor(Math.random() * 200);
      myObstacles.push(new Component(x, y, 50, 70, obstaclePambazo));
  }
}
//--------Event Listeners-------
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key === "ArrowLeft") {
      myPedrito.x -= 10; // moves Pedrito 10 pixels left
    } else if (event.key === "ArrowRight") {
      myPedrito.x += 10; // moves Pedrito 10 pixels right
    } else if (event.key === "ArrowUp") {
        myPedrito.y -= 10; // moves Pedrito 10 pixels up
    } else if (event.key === "ArrowDown") {
        myPedrito.y += 10; // moves Pedrito 10 pixels down
    } else if (event.key === "z") {
      myGameArea.stop(); //stops the game loop when "Z" is pressed - right now it's functioning as "stop", I would like it to "pause".
    } else if (event.key === " ") {
      //else if (event barra de espacio....)
    }
})
  document.getElementById("start-button").onclick = () => { //this is what sets the start button and erases the banner once the start button is clicked
    console.log("startbuttonclickworks");
    startGame();
    let bannerelements = document.getElementsByClassName("banner");
    console.log(bannerelements);
    bannerelements[0].remove();
}



//-----------General Scope-------------

const pedritoImage = new Image();
pedritoImage.src = "images/pedrito.png";

const myPedrito = new Component(0, 250, 180, 100, pedritoImage); //PLAYER
myPedrito.draw(ctx);

const obstacleClickerImage = new Image();
obstacleClickerImage.src = "images/clicker.png";

const obstaclePambazo = new Image ();
obstaclePambazo.src = "../images/Pambazo.png";

const myObstacles = []; //array to store all obstacles


const myGameArea = { //this is the object myGameArea. It has properties related to it. 
    canvas: document.getElementById("canvas"), // Canvas property
    frames: 0,
    start: function () {
        this.interval = setInterval(updateGameArea, 15);
    },
    clear: function () {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { //stops the game loop by clearing the interval that was set with setInterval
      clearInterval(this.interval);
    },
  }; 