const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button");

let frames = 0;
let soldiers = [];
let points = 0;
let requestId;

class Background {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image ()
        this.image.src = "/Game images/black_gate.jpeg"
    }

    gameOver(){
        ctx.font ="30px Arial" 
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Frodo destroyed the ring, Sauron is over!",200,200)
    }

    newGame(){
        ctx.font ="30px Arial" 
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Press enter for a new game",200,200)
    }

    draw (){
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
        this.image.src = "/Game images/black_gate ground.jpeg"
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
    "/Game images/nazgul1 png.png",
    "/Game images/nazgul2 png.png",
    "/Game images/drake1.png",
    "/Game images/drake2.png",
    "/Game images/drake3.png"
]



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
        this.image5 = new Image();
        this.image5.src = imgs[4];

        this.image6 = this.image3
        
    }

    draw(){
        if(this.y <= 400) 
        if(frames % 20 === 0){
            if(this.height <= 280){
            if(this.image === this.image1){
                this.image = this.image2
            }else {
                this.image = this.image1
            }
        }}if (this.height <= 281){
            if(this.image6 === this.image3){
                this.image6 = this.image4
            }if(this.image6 === this.image4 ){
                this.image6 = this.image5

            }else {
                this.image6 = this.image3
            }
        }
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
        this.image.src = "/Game images/soldat.png";
    }

    draw(){
        if(frames % 10 ) this.x -= 3;


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
        this.image.src = "/Game images/archer.png";
    }

    draw(){
        if(frames % 10 ) this.x -= 3;

        if(this.x <= 50){
            this.userPull= 50
            this.x = 65
            
        }

        if(this.y <= 50){
            this.userPull= 50
            this.y = 60
            
        }


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
        this.image.src = "/Game images/horseman.png";
    }

    draw(){
        if(frames % 10 ) this.x -= 3;

        if(this.x <= 50){
            this.userPull= 50
            this.x = 65
            
        }

        if(this.y <= 50){
            this.userPull= 50
            this.y = 60
            
        }


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
        this.image.src = "/Game images/eagle.png";
    }

    draw(){
        if(frames % 10 ) this.x -= 3;

        if(this.x <= 50){
            this.userPull= 50
            this.x = 65
            
        }

        if(this.y <= 50){
            this.userPull= 50
            this.y = 60
            
        }


        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

//we generate our enemies

function generateEnemies(){
    if(frames % 150 === 0 || frames % 180 === 0 || frames % 190 ===  0){
        //esto es  ejemplo para cosas random
        let widthRan = Math.floor(Math.random() * 800 )

        let x = Math.floor(Math.random() * canvas.width - 800 )
        
       //
        const enemy = new Eagle(widthRan, x)
        
    
        enemies = [...enemies,enemy]
    }
}

//draw the enemies

function drawEnemies(){
    enemies.forEach((enemy,index_enemy)=>{
        enemy.draw()
        
    if(kingWitch.collision(enemy)){
            console.log("Touched")
            gameOver()
        }

        theFire.forEach((fire,index_fire)=>{
        fire.draw()
        if(fire.collision(enemy)){
            enemies.splice(index_enemy,1)
            theFire.splice(index_fire,1)
            points += 25 //puntaje por muerte

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
        this.image.src = "/Game images/fire.png"
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
    const fire = new Fire(kingWitch.x+kingWitch.width,kingWitch.y)
  
   // if(bullets < 3){
        console.log("mando bien")
        theFire = [...theFire,fire]
   // }
}

//classes

const background = new Background();
const backgroundField = new Background2();
const kingWitch = new Nazgul(50,386,90,90,nazgulImgs)


function startGame(){
    button.disabled = true
    requestId = requestAnimationFrame(update)
    //audio.play()
}

function gameOver(){
    background.gameOver()
    requestId = undefined
}

function newGame(){//no inicia desde 0
    background.newGame()
    requestId = requestAnimationFrame(update)
}

function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    background.draw()
    backgroundField.draw()
    kingWitch.draw() 
    generateEnemies()
    drawEnemies()

    ctx.font = "30px Arial"
    ctx.fillText(points, 120,50)//score
    ctx.fillStyle = "FFFFFF";

    if(requestId){
        requestId = requestAnimationFrame(update)
    }
}

addEventListener("keydown", (event)=>{
    //izq
    if(event.keyCode === 65){
        kingWitch.x -= 40;
    }
    //de
    if(event.keyCode === 68){
        kingWitch.x += 40
    }
    //up
    if(event.keyCode === 87){
        kingWitch.y -= 50;
    }
    //down
    if(event.keyCode === 83){
        kingWitch.y += 50
    }

    if(event.keyCode === 13){
        startGame()     
    }

    if(event.keyCode === 32){
        generateFire()
    }
})

button.onclick = startGame