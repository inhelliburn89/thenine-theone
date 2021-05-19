const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded', (event)=>{
    setTimeout(()=>{
        splash.classList.add('display-none');
    }, 4000);
})

let typeGame = {}




function nazgul() {

     console.log("a ver si jala el malo", typeGame)
     var audio = document.getElementById("nazgul-audio");
     audio.play();

    typeGame.audio = "./music/theMorgul.mp3"
    typeGame.audio2 = "./music/thunder.mp3"
    typeGame.audio3 = "./music/ringSong.mp3"

    typeGame.background = "./gameImages/black_gate.jpeg"

    typeGame.gameOverText = "Frodo destroyed the ring, Sauron is over!"
    typeGame.winGame1 = "The witch king has the ring"
    typeGame.winGame2 = "Sauron is back,"
    typeGame.winGame3 = "mankind is over!!"
    typeGame.winGame4 = "Refresh to play again!"

    typeGame.background2 = "./gameImages/black_gate ground.jpeg"

    typeGame.mainChar = nazgulImgs

    typeGame.soldat = "./gameImages/soldat.png"
    typeGame.schutze = "./gameImages/archer.png"
    typeGame.reiter = "./gameImages/horseman.png"
    typeGame.adler = "./gameImages/eagle.png"

    typeGame.feuer = "./gameImages/fire.png"
  }

  const nazgulImgs = [
    "./gameImages/nazgul1 png.png",
    "./gameImages/nazgul2 png.png",
    "./gameImages/Flygul1.png",
    "./gameImages/Flygul2.png"
    
]
  
  function gandalf() {
    
    console.log("a ver si jala el bueno", typeGame)

    var audio = document.getElementById("gandalf-audio");
     audio.play();

    typeGame.audio = "./music/rhorirrim.mp3"
    typeGame.audio2 = "./music/ringSong.mp3"
    typeGame.audio3 = "./music/gondorWins.mp3"

    typeGame.background = "./gameImages/gondor1.jpg"

    typeGame.gameOverText = "The witch king has the ring, Sauron is back!"
    typeGame.winGame1 = "Frodo destroyed the ring,"
    typeGame.winGame2 = "Sauron is over,"
    typeGame.winGame3 = "mankind is saved!"
    typeGame.winGame4 = "Refresh to play again!"

    typeGame.background2 = "./gameImages/gondorbattlefield.jpg"

    typeGame.mainChar = gandalfImgs

    typeGame.soldat = "./gameImages/orc.png"
    typeGame.schutze = "./gameImages/orcArcher.png"
    typeGame.reiter = "./gameImages/thetroll.png"
    typeGame.adler = "./gameImages/flyingorc.png"

    typeGame.feuer = "./gameImages/bluefire.png"

  }

  const gandalfImgs = [
    "./gameImages/Gandalf-fade.png",
    "./gameImages/Gandalf-fade.png",
    "./gameImages/eagle1.png",
    "./gameImages/eagle2.png"
    
]

console.log(typeGame)