var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var affichageScore = document.getElementById("score");
const newGame = document.querySelectorAll("newGame");
var score = 0;

newGame.forEach((btn) => {
    btn.addEventListener("click", () => {
        score = 0;
        affichageScore.textContent = score;
        afficherBalle();
    });
});

class Balle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 5;
        this.vy = 5;
    }

    afficherBalle(){
        Balle = new Balle(100,20,5,blue);
        ctx.beginPath();
        ctx.lineWidth="2";
        ctx.arc(100,100,90,0,2);
        ctx.strocke();
    }
}

