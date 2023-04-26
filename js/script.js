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

class Pedrito extends Component {
  constructor(x, y, w, h, imgElement){
    super(x, y, w, h, imgElement)
    this.speed = 10
  }
  
   //metodos
   update(){
    //behavior of mypedrito poner flechas y luego llamar funcion
    document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key === "ArrowLeft" && this.x > 0) {
      this.x -= this.speed; // moves this this.speed pixels left
    } else if (event.key === "ArrowRight" && this.x < 550) {
      this.x += this.speed; // moves this this.speed pixels right
    } else if (event.key === "ArrowUp" && this.y > 0 ) {
        this.y -= this.speed; // moves this this.speed pixels up
    } else if (event.key === "ArrowDown" && this.y < 400 ) {
        this.y += this.speed; // moves Pedrito Pedrito.speed pixels down
    } else if (event.key === "z") {
      myGameArea.stop(); //stops the game loop when "Z" is pressed - right now it's functioning as "stop", I would like it to "pause".
    } else if (event.key === " ") {
      //else if (event barra de espacio....)
      // if you press key = space then call the function shoot()
    }
});


   }
   shoot(){
    //dispara balas
   }
   collectBocatas(){
    //
   }

  mypedritoDies(){
    //puede que vaya dentro de update
  }
}

// const mypedrito = new Pedrito(0, 250, 180, 100, mypedritoImage); //PLAYER
// mypedrito.draw(ctx);

class Clicker extends Component{
   update(){
   //behavior of clicker
   }
  
}

// -------My Functions----------------
function updateGameArea() {
    myGameArea.clear();
    mypedrito.draw(ctx);
    mypedrito.update();
    console.log("mypedrito:", mypedrito);
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
  

}

//--------Event Listeners-------
// document.addEventListener("keydown", (event) => {
//     console.log(event.key);
//     if (event.key === "ArrowLeft" && myPedrito.x > 0) {
//       myPedrito.x -= 10; // moves Pedrito 10 pixels left
//     } else if (event.key === "ArrowRight" && myPedrito.x < 550) {
//       myPedrito.x += 10; // moves Pedrito 10 pixels right
//     } else if (event.key === "ArrowUp" && myPedrito.y > 0 ) {
//         myPedrito.y -= 10; // moves Pedrito 10 pixels up
//     } else if (event.key === "ArrowDown" && myPedrito.y < 400 ) {
//         myPedrito.y += 10; // moves Pedrito 10 pixels down
//     } else if (event.key === "z") {
//       myGameArea.stop(); //stops the game loop when "Z" is pressed - right now it's functioning as "stop", I would like it to "pause".
//     } else if (event.key === " ") {
//       //else if (event barra de espacio....)
//     }
// });

document.getElementById("start-button").onclick = () => { //this is what sets the start button and erases the banner once the start button is clicked
    startGame();
    let bannerelements = document.getElementsByClassName("banner")
    console.log(bannerelements);
    bannerelements[0].remove();
};


//-----------General Scope-------------

const mypedritoImage = new Image();
mypedritoImage.src = "images/pedrito.png";

const mypedrito = new Pedrito(0, 250, 180, 100, mypedritoImage); //PLAYER
mypedrito.draw(ctx);

const obstacleClickerImage = new Image();
obstacleClickerImage.src = "images/clicker.png";

const myObstacles = []; //array to store all obstacles


const myGameArea = { //this is the object myGameArea. It has properties related to it. 
    canvas: document.getElementById("canvas"), // Canvas property
    frames: 0,
    start: function () {
        this.interval = setInterval(updateGameArea, 2);
    },
    clear: function () {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { //stops the game loop by clearing the interval that was set with setInterval
      clearInterval(this.interval);
    },
  }; 


  