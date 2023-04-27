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
  constructor(x, y, w, h, imgElement) {
    super(x, y, w, h, imgElement);
    this.speedX = 0;
    this.speedY = 0;
  }

  //metodos

  update() {}

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  shoot() {
    //dispara balas
  }
  collectBocatas() {
    //
  }

  mypedritoDies() {
    //puede que vaya dentro de update
  }
}

class Clicker extends Component {
  update() {
    //behavior of clicker
  }
}

// -------My Functions----------------
function updateGameArea() {
  myGameArea.clear();
  mypedrito.draw(ctx);
  mypedrito.newPos();
  mypedrito.update();
  // console.log("mypedrito:", mypedrito);
  updateObstacles();
}

function startGame() {
  myGameArea.start();
}

function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1; //For each obstacle, it updates its position by subtracting 1 from the x coordinate
    myObstacles[i].draw();
  }

  myGameArea.frames += 1;

  if (myGameArea.frames % 200 === 0) {
    let x = myGameArea.canvas.width;
    // y is a random number between 0 and 420
    let y = Math.floor(Math.random() * 420);

    myObstacles.push(new Component(x, y, 90, 90, obstacleClickerImage));
  } //this x and y are the ones defined in this scope!! :)

  if (myGameArea.frames % 200 === 0) {
    let x = myGameArea.canvas.width;
    let y = Math.floor(Math.random() * 200);
    myObstacles.push(new Component(x, y, 40, 40, obstaclePambazo));
  }
}
//--------Event Listeners-------
document.addEventListener("keydown", (event) => {
  // console.log('command key',event.key);
  switch (true) {
    case event.key === "ArrowLeft" && mypedrito.x > 0:
      console.log("arrowleft");
      mypedrito.x -= 30; // moves mypedrito mypedrito.speed pixels left
      break;
    case event.key === "ArrowRight" && mypedrito.x < 550:
      console.log("arrowright");
      mypedrito.x += 30; // moves mypedrito mypedrito.speed pixels left
      break;
    case event.key === "ArrowUp" && mypedrito.y > 0:
      console.log("arrowup");
      mypedrito.y -= 30; // moves mypedrito mypedrito.speed pixels left
      break;
    case event.key === "ArrowDown" && mypedrito.y < 400:
      console.log("arrowdown");
      mypedrito.y += 30; // moves this this.speed pixels left
      break;
    case event.key === "z":
      myGameArea.stop(); //stops the game loop when "Z" is pressed - right now it's functioning as "stop", I would like it to "pause".
      break;
    // case " ": para shoot30
  }
});

document.addEventListener("keyup", (event) => {
  // console.log("keyup")
  mypedrito.speedX = 0;
  mypedrito.speedY = 0;
  // this.y = 0;
});

document.getElementById("start-button").onclick = () => {
  //this is what sets the start button and erases the banner once the start button is clicked
  startGame();
  let bannerelements = document.getElementsByClassName("banner");
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

const obstaclePambazo = new Image();
obstaclePambazo.src = "images/Pambazo.png";

const myObstacles = []; //array to store all obstacles

const myGameArea = {
  //this is the object myGameArea. It has properties related to it.
  canvas: document.getElementById("canvas"), // Canvas property
  frames: 0,
  start: function () {
    this.interval = setInterval(updateGameArea, 2);
  },
  clear: function () {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    //stops the game loop by clearing the interval that was set with setInterval
    clearInterval(this.interval);
  },
};
