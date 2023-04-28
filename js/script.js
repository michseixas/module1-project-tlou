const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //get context is a method of the canvas object that returns a ctx object

// -------My Classes----------------
class Component {
    constructor(x, y, w, h, imgElement, type) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.imgElement = imgElement;
      this.type = type;
    
    }

    draw() {
        //ctx is the canvas context used for drawing an image file (ex: .jpeg, .png)
        ctx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
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
    this.points = 0;
  }
  
   //metodos
  
   update(){}


  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  checkCollision(obstacle){
    return (    this.x < obstacle.x + obstacle.width &&
                this.x + this.width -40 > obstacle.x &&
                this.y < obstacle.y + obstacle.height &&
                this.height + this.y > obstacle.y)
}
collisionObstacles(obstacles){
  //do a for instead a for each so we an remove elements with splice
  for (let i = obstacles.length - 1; i >= 0 ; i--) {
    let element = obstacles[i];
    if (this.checkCollision(element)){
      console.log("collision ");
      if (element.type === "clicker"){
        console.log("collision with clicker");
        //myClickers.splice(i,1); // remove touched clicker from the screen using index
        this.gameOver(); 
      } else if (element.type === "pambazo"){
        console.log("collision with pambazo");
        myPambazos.splice(i,1); // remove touched pambazo from the screen using index
        this.points++;
        if (this.points >= 5){
          console.log("entro en win game points > 5")
          this.winGame();
        }
      }
    } 
  };
  
}
  
gameOver(){
  myGameArea.stop();
  ctx.font = "bold 40px impact";
  ctx.fillStyle = "white";
  ctx.fillText ("Oops!!", 350, 160);
  ctx.fillText ("Looks like you've been", 200, 210);
  ctx.fillText ("touched by a Clicker!", 220, 260);
  ctx.font = "bold 70px impact";
  ctx.fillText ("GAME OVER", 280, 350);
}

winGame(){
  myGameArea.stop();
  ctx.font = "bold 40px impact";
  ctx.fillStyle = "white";
  ctx.fillText ("Congrats, you ate all the Pambazos and are now invincible", 50, 250);
  
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

    mypedrito.newPos();
    mypedrito.update();
    mypedrito.collisionObstacles(myClickers);
    mypedrito.collisionObstacles(myPambazos);
    
    mypedrito.draw(ctx);
    updateClickers();
    updatePambazos();
    //myGameArea.score();
    myGameArea.frames += 1;

//Each 200 spawn a new clicker
  if (myGameArea.frames % 200 === 0) { //This count will be used to count the score as frames pass
    //when this loop reaches 420 frames, it creates a new object, who has a random y coordinate and pushes the object into the array myObstacles.
      // x is the total width of the canvas 
      let x = myGameArea.canvas.width;
      // y is a random number between 0 and 420
      let y = Math.floor(Math.random() * 720);
      // push a new components into the myObstacles array.
      // this new component has the x and y we just calculated above
      // and has the image of a clicker
      //myObstacles.push(new Component(x, y, 80, 80, obstacleClickerImage));
      myClickers.push(new Component(x, y, 80, 80, obstacleClickerImage, "clicker"));
      
  } //this x and y are the ones defined in this scope!! :)
  
  //Each 200 spawn a new pambazo
  if (myGameArea.frames % 200 === 0) { 
      let x = myGameArea.canvas.width;
      let y = Math.floor(Math.random() * 200);
      myPambazos.push(new Component(x, y, 50, 50, obstaclePambazo, "pambazo"));
  }

  //Win condition if pedrito has 5 bocatas, win the game (means stop update game area- mirar set interval y hacer clear interval de eso)
 //lose condition if pedrito touches clicker, game over (stop update game)
}


function startGame(){
    myGameArea.start();
}

function winGame(){
  myGameArea.stop();
 }

function gameOver(){
  myGameArea.stop();
}

// function updateObstacles() {
//   for (i = 0; i < myObstacles.length; i++) {
//     myObstacles[i].x += -1; //For each obstacle, it updates its position by subtracting 1 from the x coordinate
//     myObstacles[i].draw();
//   }
// }
  
function updateClickers() {
    for (i = 0; i < myClickers.length; i++) {
      myClickers[i].x += -1; //For each obstacle, it updates its position by subtracting 1 from the x coordinate
      myClickers[i].draw();
    }
  }

    function updatePambazos() {
      for (i = 0; i < myPambazos.length; i++) {
        myPambazos[i].x += -1; //For each obstacle, it updates its position by subtracting 1 from the x coordinate
        myPambazos[i].draw();
      }
    }



//--------Event Listeners-------
document.addEventListener("keydown", (event) => {
   switch(true){
    case (event.key === "ArrowLeft" && mypedrito.x > 0):
      console.log("arrowleft")
      mypedrito.x -= 30 // moves mypedrito mypedrito.speed pixels left
      break;
    case event.key === "ArrowRight" && mypedrito.x < 750:
      console.log("arrowright");
      mypedrito.x += 30; // moves mypedrito mypedrito.speed pixels left
      break;
    case event.key === "ArrowUp" && mypedrito.y > 0:
      console.log("arrowup");
      mypedrito.y -= 30; // moves mypedrito mypedrito.speed pixels left
      break;
    case event.key === "ArrowDown" && mypedrito.y < 600:
      console.log("arrowdown");
      mypedrito.y += 30; // moves this this.speed pixels left
      break;
    case event.key === "z":
      myGameArea.stop(); //stops the game loop when "Z" is pressed - right now it's functioning as "stop", I would like it to "pause".
      break;
      // case " ": para shoot30
   }})
  
   document.addEventListener('keyup', (event) => {
      mypedrito.speedX = 0;
    mypedrito.speedY = 0;
    // this.y = 0;
   });



//-----------General Scope-------------

const mypedritoImage = new Image();
mypedritoImage.src = "images/pedrito.png";

const mypedrito = new Pedrito(0, 250, 90, 70, mypedritoImage); //PLAYER
mypedrito.draw(ctx);

const obstacleClickerImage = new Image();
obstacleClickerImage.src = "images/clicker.png";

const obstaclePambazo = new Image();
obstaclePambazo.src = "images/Pambazo.png";

//const myObstacles = []; //array to store all obstacles
const myClickers = []; //array to store all obstacles
const myPambazos = []; //array to store all obstacles


const myGameArea = { //this is the object myGameArea. It has properties related to it. 
    canvas: document.getElementById("canvas"), // Canvas property
    frames: 0,
    start: function () {
        this.interval = setInterval(updateGameArea, 3);
    },
    clear: function () {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () { //stops the game loop by clearing the interval that was set with setInterval
      clearInterval(this.interval);
    },
    // score: function () {
    //   // we are using the myGameArea.frame variable to set a score. It's divided by 5, meaning for every 5 frames, score +1
    //   const points = Math.floor(this.frames / 5);
    //   this.context.font = '18px serif';
    //   this.context.fillStyle = 'white';
    //   this.context.fillText(`Score: ${points}`, 350, 50);
    // },
  }; 

  


  document.getElementById("start-button").onclick = () => { //this is what sets the start button and erases the banner once the start button is clicked
    startGame();
    let bannerelements = document.getElementsByClassName("banner");
    bannerelements[0].remove();
}


  
