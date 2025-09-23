const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const affichageScore = document.getElementById("score");
const newGame = document.querySelectorAll("newGame");
let score = 0;
let raf;

class Balle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = 5;
        this.vy = 2;
    }


    afficherBalle(){
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.lineWidth="2";
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    mouvementBalle() {
        this.x += this.vx;
        this.y += this.vy;
    
        if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
            this.vx = -this.vx;
        }
    
        this.afficherBalle();
        raf = window.requestAnimationFrame(() => this.mouvementBalle());
    }
    
}

class Bar {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.vy = 20;  
    }

    afficherBar(){
        ctx.fillStyle = "black";
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.strokeRect(this.x,this.y,this.width,this.height);
        
    }

    mouvementBar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        this.afficherBar();
        raf = window.requestAnimationFrame(() => this.mouvementBar());
    }
}

function update(balle, bar) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balle.mouvementBalle();
    bar.mouvementBar();
    raf = window.requestAnimationFrame(update);

}


function timer(){
    affichageScore.innerText = score;
    score = score + 1;
}

function NewGame() {
    score = 0;
    affichageScore.innerHTML = score;
    let balle = new Balle(50, 50, 10);
    let bar = new Bar(canvas.width/2 - 50, canvas.height-30, 10, 100);
    console.log(bar.x);
    bar.afficherBar();
    balle.afficherBalle();
    let chrono = window.setInterval(timer, 1000);
    update(balle, bar);
}




