const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded', (event)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
    }, 4000);
})


function nazgul() {
    
    
    var audio = document.getElementById("nazgul-audio");
    audio.play();

    
    setTimeout(function(){
        window.location = "./game.html";
       },5000);
    
    
    
}

function gandalf() {
    
    var audio = document.getElementById("gandalf-audio");
    audio.play();

    
    setTimeout(function(){
        window.location = "./game2.html";
       },5000);

}

//canvas design
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("btn");

let frames = 0;
let soldiers = [];
let points = 0;
let requestId;



//

//audio
const audio = new Audio();
audio.src = "./music/theMorgul.mp3"
audio.loop = true

const audio2 = new Audio();
audio2.src = "./music/thunder.mp3"
audio2.loop = true

const audio3 = new Audio();
audio3.src = "./music/ringSong.mp3"
audio3.loop = true



//background classes mordor
class enterStart {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image ()
        this.image.src = "./gameImages/startGame.jpeg"
    }

    draw (){
        
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
        
    }
}

class Background {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image ()
        this.image.src = "./gameImages/black_gate.jpeg"
    }

    gameOver(){
        ctx.font ="50px Tangerine" 
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Frodo destroyed the ring, Sauron is over!",200,200)
        ctx.fillText("Refresh to play again!",300,250)
        
    }

    winGame(){
        ctx.font ="50px Tangerine" 
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("The witch king has the ring",260,200)
        ctx.fillText("Sauron is back,",335,250)
        ctx.fillText("mankind is over!!",325,300)
        ctx.fillText("Refresh to play again!",300,350)

    }

    draw (){
        ctx.font = "50px Tangerine"
        ctx.fillText(points, 120,50)//score
        ctx.fillStyle = "#FFFFFF"
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
        
    }
}

class Background2{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "./gameImages/black_gate ground.jpeg"
    }

    draw(){
        this.x --;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image,this.x,335,this.width,265)
        //esto es el loop
        ctx.drawImage(
            this.image,
            this.x + canvas.width,
            335,
            this.width,
            265
            )
    }
};
//nazgul images
const nazgulImgs = [
    "./gameImages/nazgul1 png.png",
    "./gameImages/nazgul2 png.png",
    "./gameImages/Flygul1.png",
    "./gameImages/Flygul2.png"
    
]

//timer
class Time {
    
        constructor(){
            this.x = 0;
            this.y = 0;
            this.width = canvas.width;
            this.height = canvas.height;
            this.image = new Image();
            this.image.src = "./gameImages/TimeBar.png"


        }

    draw(){
        this.x ++;
        if(this.x > -canvas.width) this.x = 600;
        ctx.drawImage(this.image,500,-50,400,200)

    }

}


class Frodo{
    constructor(){
        this.x = 515;
        this.y = 5;
        this.width = 70;
        this.height = 80;
        //imagen
        this.image = new Image();
        this.image.src = "./gameImages/Frody.png";
    }

    draw(){
        if(frames % 5 ) this.x += 0.1;
        if(this.x >= 805){
            gameOver()

    }

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

//nazgul and enemies

class Nazgul {
    constructor(x,y,w,h,imgs){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        //nazgul
        
        this.image1 = new Image();
        this.image1.src = imgs[0];

        this.image2 = new Image();
        this.image2.src = imgs[1];

        this.image = this.image1

        //drake
        this.image3 = new Image();
        this.image3.src = imgs[2];
        this.image4 = new Image();
        this.image4.src = imgs[3];
        

        this.image6 = this.image3
        
    }

    draw(){
        if(this.y >= 280){
        if(frames % 20 === 0){
  
            if(this.image === this.image1){
                this.image = this.image2
            }else {
                this.image = this.image1
            }
        }}
        
        if (this.y <= 281){
            if(frames % 20 === 0){
            if(this.image === this.image3){
                this.image = this.image4
            

            }else {
                this.image = this.image3
            }
        }}
        //setting map limits
        if(this.y <= 40){
            this.userPull= 40
            this.y = 50
        }if(this.y >= 485){
            this.userPull= 485
            this.y = 480
        }
        if(this.x <= 30){
            this.userPull= 30
            this.x = 35
        }if(this.x >= 830){
            this.userPull= 830
            this.x = 825
        }

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    collision(enemy){
        return(
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x  &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
        ) 
    }
}
//we create our field soldiers
let enemies = []

class Soldier{
    constructor(){
        this.x = canvas.width;
        this.y = 480;
        this.width = 65;
        this.height = 65;
        //imagen
        this.image = new Image();
        this.image.src = "./gameImages/soldat.png";
    }

    draw(){
        if(frames % 20 ) this.x -= 3;


        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Archer{
    constructor(){
        this.x = canvas.width;
        this.y = 380;
        this.width = 65;
        this.height = 65;
        //imagen
        this.image = new Image();
        this.image.src = "./gameImages/archer.png";
    }

    draw(){
        if(frames % 20 ) this.x -= 3;

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Horseman{
    constructor(){
        this.x = canvas.width;
        this.y = 280;
        this.width = 95;
        this.height = 95;
        //imagen
        this.image = new Image();
        this.image.src = "./gameImages/horseman.png";
    }

    draw(){
        if(frames % 15 ) this.x -= 3;


        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Eagle{
    constructor(){
        this.x = canvas.width;
        this.y = 180;
        this.width = 65;
        this.height = 65;
        //imagen
        this.image = new Image();
        this.image.src = "./gameImages/eagle.png";
    }

    draw(){
        if(frames % 20 ) this.x -= 3;

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

//we generate our enemies

function generateEnemies(){
    if(frames % 150 === 0 || frames % 180 === 0 || frames % 190 ===  0){
        //esto es  ejemplo para cosas random
        let widthRan = Math.floor(Math.random() * 800 )

        let x = Math.floor(Math.random() * canvas.width - 800 )
        
        const enemy = new Soldier(widthRan, x)
        const enemy2 = new Archer(widthRan, x)
        const enemy3 = new Horseman(widthRan, x)
        const enemy4 = new Eagle(widthRan, x)

        let army = [enemy,enemy2,enemy3,enemy4]//generamos arreglo para los 4 enemigos
    
        enemies = [...enemies,army[Math.floor(Math.random()*army.length)]] //generamos los enemigos aleatoriamente en posicion, sino , 
                                                                           //todos salen en la misma posicion al mismo tiempo
    }
}

//draw the enemies

function drawEnemies(){
    enemies.forEach((enemy,index_enemy)=>{
        enemy.draw()

        if(enemy.x+enemy.width <= 70){
            return enemies.splice(index_enemy,1)
        }
        
    if(whitemage.collision(enemy)){
            console.log("Touched")
            gameOver()
        }

        theFire.forEach((fire,index_fire)=>{
        fire.draw()
        if(fire.collision(enemy)){
            enemies.splice(index_enemy,1)
            theFire.splice(index_fire,1)
            points += 1 //puntaje por muerte
        }
        if (points >= 5){
            winGame()
        }
        if(fire.x+fire.width > canvas.width){
            theFire.splice(index_fire,1)
        }

    })    

       
    })
}


//to kill enemies
let theFire = []


//generate our fire
class Fire{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 30
        this.height = 30
        this.image = new Image()
        this.image.src = "./gameImages/fire.png"
    }

    draw(){
        this.x +=2
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

    }

    collision(enemy){
        return(
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x  &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
        ) 
    }
}
 //print our fire
 function  generateFire(){
    const fire = new Fire(whitemage.x+whitemage.width,whitemage.y)
  
   // if(bullets < 3){
        console.log("mando bien")
        theFire = [...theFire,fire]
   // }
}



//classes

const background = new Background();
const backgroundField = new Background2();
const whitemage = new Nazgul(50,386,90,90,nazgulImgs);
const time = new Time();
const hobbit = new Frodo();
const start = new enterStart();


function startGame(){
    button.disabled = true
    requestId = requestAnimationFrame(update)
    audio.play()
    
}

function gameOver(){
    audio.pause()
    
    audio2.play()
    
    button.disabled = false;
    button.onclick = resetGame
    background.gameOver()
    requestId = undefined
    
}

function resetGame (){
    audio.currentTime= 0
    audio2.pause()
    startGame()
}

function winGame(){
    audio.pause()
    audio3.play()
    button.onclick = resetGame
    background.winGame()
    requestId = undefined

}
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "FFFFFF";
   
    background.draw()
    backgroundField.draw()
    whitemage.draw() 
    
    time.draw()
    generateEnemies()
    drawEnemies()
    hobbit.draw()

    ctx.font = "50px Tangerine"
    ctx.fillStyle = "FFFFFF";
    ctx.fillText(points, 120,50)//score
    

    if(requestId){
        requestId = requestAnimationFrame(update)
    }
}

addEventListener("keydown", (event)=>{
    if(event.keyCode === 13){
        startGame()
    }
    
    //izq
    if(event.keyCode === 65){
        whitemage.x -= 40;
    }
    //de
    if(event.keyCode === 68){
        whitemage.x += 40
    }
    //up
    if(event.keyCode === 87){
        whitemage.y -= 50;
    }
    //down
    if(event.keyCode === 83){
        whitemage.y += 50
    }


    if(event.keyCode === 32){
        generateFire()
    }

    if(event.keyCode === 74){
        audio.pause()
    }
    if(event.keyCode === 75){
        audio.play()
    }

    if(event.keyCode === 49){
        gameOver()
    }

    if(event.keyCode === 50){
        winGame()
    }
})

button.onclick = startGame