const mario = document.getElementById('mario');
const goomba = document.getElementById('goomba');
const over = document.getElementById('game-over');
const restart = document.getElementById('restart');
const start = document.getElementById('start');
const game = document.getElementById('total');
let score = 0;
let won = false;

const jump = new Audio('assets/audio/jump.mp3');
jump.type = 'audio/mp3';

const death = new Audio('assets/audio/death.mp3');
death.type = 'audio/mp3';

const song = new Audio('assets/audio/song.mp3');
song.type = 'audio/mp3';

const win = new Audio('assets/audio/done.wav');
win.type = 'audio/wav';

restart.addEventListener('click', function() {
    document.location.reload(true);
});

start.addEventListener('click', function() {
    clearInterval(checkDead);
    clearInterval(scoreCheck);
    restart.style.display = "none";
    alert("The goal of the game is to reach a score of 41! Marios age!");
    start.style.display = "none";
    mario.style.background = "url('assets/img/mario.gif')";
    mario.style.bottom = "35px"
    mario.style.backgroundSize = "contain";
    mario.style.backgroundRepeat = "no-repeat";
    song.play();
    game.style.background = "url('assets/img/background.gif') center center/ cover no-repeat";
    game.style.backgroundRepeat = "no-repeat";
    goomba.style.animation = "goomba 1.5s infinite linear";
    document.addEventListener('keyup', (event) => {
        if(event.code === 'Space'){
            if(mario.classList == "animate"){return}
            jump.volume = 0.2;
            jump.play();
            mario.classList.add("animate");
            mario.style.background = "url('assets/img/jump.jpg')";
            mario.style.backgroundSize = "contain";
            mario.style.backgroundRepeat = "no-repeat";
            setTimeout(function(){
                mario.classList.remove("animate");
                mario.style.background = "url('assets/img/mario.gif')";
                mario.style.backgroundSize = "contain";
                mario.style.bottom = "35px"
                mario.style.backgroundRepeat = "no-repeat";
            },300);            
        }
    });
    
    var scoreCheck = setInterval(function() {
        score++;
        if (score >= 41){
            song.pause();
            song.currentTime = 0;
            win.play();
            over.innerHTML = 'YOU WIN';
            restart.style.display = "block";
            goomba.style.animation = "";
            document.getElementById("score").style.display = 'none';
            mario.style.background = "url('assets/img/stand.png')  center center/ cover no-repeat";
            mario.style.backgroundSize = "contain";
            mario.style.bottom = "47px";
            mario.style.backgroundRepeat = "no-repeat";
            game.style.background = "url('assets/img/frozen.png') center center/ cover no-repeat";
            game.style.backgroundRepeat = "no-repeat";
        }
    }, 1000);

    var checkDead = setInterval(function() {
        document.getElementById("score").innerHTML = 'SCORE:' + Math.floor(score);
        let characterTop = parseInt(window.getComputedStyle(mario).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(goomba).getPropertyValue("left"));
        if(blockLeft<20 && blockLeft>-20 && characterTop>=130){
            restart.style.display = "block";
            game.style.background = "url('assets/img/frozen.png') center center/ cover no-repeat";
            game.style.backgroundRepeat = "no-repeat";
            mario.style.background = "url('assets/img/dead.png')";
            mario.style.bottom = "-100px";
            mario.style.height = "100px";
            mario.style.backgroundSize = "contain";
            mario.classList.add("die");
            mario.style.backgroundRepeat = "no-repeat";
            over.innerHTML = 'GAME OVER';
            song.pause();
            death.loop = false;
            death.play();
            score=0;
            goomba.remove();
            document.getElementById("score").style.display = 'none';
        }
    }, 10);
});
