const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// -------My Classes----------------
class Component {
    constructor(x, y, w, h, imgElement) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.imgElement = imgElement;
    }

    draw(ctx) {
        //ctx is the canvas context used for drawing
        ctx.drawImage(this.imgElement, this.x, this.y, this.width, this.height);
    }

}
// -------My Functions----------------
function updateGameArea() {
    myGameArea.clear();
    myPedrito.draw(ctx);
    myClicker.draw(ctx);
}

function startGame(){
    myGameArea.start();
}

//--------Event Listeners-------
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    //37 and 39 are key codes that correspond to the ASCII codes for left and right position
    if (event.key === "ArrowLeft") {
      // left arrow
      myPedrito.x -= 10; // move Pedrito 10 pixels left
    } else if (event.key === "ArrowRight") {
      // right arrow
      myPedrito.x += 10; // move Pedrito 10 pixels right
    } else if (event.key === "ArrowUp") {
        // right arrow
        myPedrito.y -= 10; // move Pedrito 10 pixels up
    } else if (event.key === "ArrowDown") {
        // right arrow
        myPedrito.y += 10; // move Pedrito 10 pixels down
    } //else if (event barra de espacio....)
});
document.getElementById("start-button").onclick = () => {
    startGame();
};

//-----------General Scope-------------

const pedritoImage = new Image();
pedritoImage.src = "images/pedrito.png";

const obstacleClickerImage = new Image();
obstacleClickerImage.src = "images/clicker.png";

const myPedrito = new Component(0, 250, 180, 100, pedritoImage); //PLAYER
myPedrito.draw(ctx);

const myClicker = new Component(550, 400, 80, 80, obstacleClickerImage); //OBSTACLE
myClicker.draw(ctx);


const myGameArea = {
    canvas: document.getElementById("canvas"),
    frames: 0,
    start: function () {
       // this.ctx = this.canvas.getContext("2d");//WHY is this required?
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
      clearInterval(this.interval);
    },
  }; 
  