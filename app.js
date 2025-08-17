let gameSeq = [];
let userSeq = [];
let highScore=[];
let hScore=document.querySelector("#highScore");

let btns=["yellow","red","purple","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

//step 1-> Game begins on pressing a key
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is started");
        started = true;

        levelUp();
    }
})

//step 2-> A random button flashes game updates its level
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //choosing a random button to flash
    let randIdx = Math.floor(Math.random()*btns.length);
    // console.log(randIdx);
    let randColor = btns[randIdx];
    // console.log(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);

    //flashing the random button
    btnFlash(randBtn);
}

//function to flash the button
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },200);
}


function btnWasPressed(){
    let btn=this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

function checkAns(idx){
    // console.log(`current level = ${level}`);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        highScore.push(level);
        h2.innerHTML = `GAME OVER!! Your score was <b>${level}</b> <br> Your highest score is ${Math.max(...highScore)} <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor="#FF0A01";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },1000)
        hScore.innerText = `Highest Score : ${Math.max(...highScore)}`;
        reset();
    }
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnWasPressed);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}