const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const affichageScore = document.getElementById("score");
const newGame = document.querySelectorAll("newGame");
const fleche_g = document.getElementById("fleche_g");
const fleche_d = document.getElementById("fleche_d");
let score = 0;
let raf;
let chrono;
let perdu = false;
let droite = false;
let gauche = false;
let starttime = null;


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

        if (
        this.y + this.radius >= bar.y &&
        this.x + this.radius >= bar.x &&
        this.x - this.radius <= bar.x + bar.width
        ) {
            this.vy = -Math.abs(this.vy);
            this.y = bar.y - this.radius;
        }

        if (this.y + this.radius > canvas.height) {
            
            perdu = true;
        }
            
    }
    
}

class Bar {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.vy = 10;  
    }

    afficherBar(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y,this.width,this.height);
        //ctx.strokeRect(this.x,this.y,this.width,this.height);
        
    }

    deplacerBarGauche(){
        if(bar.x > 0){
            this.x -= this.vy;
        }
    }

    deplacerBarDroite(){
        if(bar.x + bar.width < canvas.width){
            this.x += this.vy;
        }
    }

    mouvementBar(){
        if(droite){
            this.deplacerBarDroite();
        }
        else if(gauche){
            this.deplacerBarGauche();
        }
    }
           
}

let balle = new Balle(50, 50, 0);
let bar = new Bar(canvas.width / 2 - canvas.width/10, canvas.height - 15, 10, canvas.width/5);

function update(timeStamp) {
    if (perdu) {
        document.getElementById("game_over").style.display = "block";
        window.clearInterval(chrono);
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balle.mouvementBalle();
        bar.mouvementBar();
        timer(timeStamp);
    }
    balle.afficherBalle();
    bar.afficherBar();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
        if (event.key === "ArrowLeft") {
            gauche = true;
        } 
        else if (event.key === "ArrowRight") {
            droite = true;
        }
});

//document.addEventListener('touchstart', function(event) {
//        if (event.bouton === "fleche_g") {
//            gauche = true;
//        } 
//        else if (event.bouton === "fleche_d") {
//            droite = true;
//        }
//});

document.addEventListener('keyup', function(event) {
        if (event.key === "ArrowLeft") {
            gauche = false;
        } 
        else if (event.key === "ArrowRight") {
            droite = false;
        }
});

//document.addEventListener('touchend', function(event) {
//        if (event.bouton === "fleche_g") {
//            gauche = false;
//        } 
//        else if (event.bouton === "fleche_d") {
//            droite = false;
//        }
//});

document.getElementById("fleche_g").addEventListener("touchstart", function() {
    gauche = true;
});
document.getElementById("fleche_g").addEventListener("touchend", function() {
    gauche = false;
});
document.getElementById("fleche_d").addEventListener("touchstart", function() {
    droite = true;
});
document.getElementById("fleche_d").addEventListener("touchend", function() {
    droite = false;
});

function timer(timeStamp){
    if(starttime === null){
        starttime = timeStamp;
    }
    const elapsed = (timeStamp - starttime) / 1000;
    affichageScore.textContent = elapsed.toFixed(0);
}

function NewGame() {
    balle = new Balle(canvas.width / 2, canvas.height / 2, 10);
    bar = new Bar(canvas.width / 2 - canvas.width/10, canvas.height - 15, 10, canvas.width/5);
    perdu = false;
    starttime = null;
    document.getElementById("game_over").style.display = "none";
    score = 0;  
    let angle = Math.random() * Math.PI * 2;
    balle.vx = Math.cos(angle) * 5;
    balle.vy = -Math.abs(Math.sin(angle) * 5);
    chrono = window.setInterval(timer, 1000);
}

update();


