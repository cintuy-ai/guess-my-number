let secret = Math.floor(Math.random()*100)+1;
let tries = 0;

const input = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const newGameBtn = document.getElementById("newGameBtn");
const message = document.getElementById("message");
const confettiWrap=document.getElementById("confetti");
const container=document.querySelector(".container");
const levelSelect=document.getElementById("levelSelect");

function setMessage(text){
    message.textContent=text;
}
const LEVELS={
    easy: {min: 1, max: 10},
    medium:{min: 1, max: 50},
    hard:{min: 1, max: 100}
};
let min = 1;
let max = 100;

function newGame(){
    const chosen=levelSelect.value;
    min=LEVELS[chosen].min;
    max=LEVELS[chosen].max;
    secret=Math.floor(Math.random()*(max-min+1))+min;
    tries=0;
    input.value="";
    setMessage(`Game dimulai! Tebak angka ${min} sampai ${max}.`);
    input.focus();
    container.classList.remove("win");
    message.classList.remove("win");
    confettiWrap.innerHTML="";
}
function isPrime(n){
    if(n<2)return false;
    for(let i=2; i*i <=n; i++){
        if(n%i===0)return false;
    }
    return true;
}
function pickHints(secret){
    const hints=[];

    if (secret%2===0){
        hints.push("Angkanya Genap.");
    }else{
        hints.push("Angkanya Ganjil.");
    }

    if(isPrime(secret)){
        hints.push("Angkanya bilangan prima.");
    }else{
        hints.push("Angkanya bukan bilangan prima.");
    }
    return hints;
}
function burstConfetti(count=120){
    confettiWrap.innerHTML="";

    for (let i=0; i<count; i++){
        const piece=document.createElement("div");
        piece.className="confetti";

        const colors=["#c084fc", "#f9a8d4","#a78bfa", "#fbcfe8", "#e9d5ff"];
        piece.style.background=colors[Math.floor(Math.random()*colors.length)];
        piece.style.left=Math.random()*100+"vw";

        const w=6+Math.random()*8;
        const h=8+Math.random()*10;
        piece.style.width=w+"px";
        piece.style.height=h+"px";

        const dur=1.8+Math.random()*1.8;
        piece.style.animationDuration=dur+"s";

        confettiWrap.appendChild(piece);
    }
    setTimeout(()=>{
        confettiWrap.innerHTML="";
    }, 3500);
}
function winEffects(){
    container.classList.add("win");
    message.classList.add("win");
    burstConfetti(140);

    setTimeout(()=>{
        container.classList.remove("win");
    }, 2500);
}
function handleGuess(){
    const guess=Number(input.value);

    if(!Number.isInteger(guess)||guess<min||guess>max){
        setMessage(`⚠️Masukkan angka ${min} sampai ${max} ya.`);
        return;
    }

    if (guess===secret){
        setMessage("🎉 Benar! Kamu menang!");
        winEffects();
        return;
    } else if(guess<secret){
        const hints=pickHints(secret);
        setMessage(
      `Terlalu kecil!
💡 ${hints[0]}
💡 ${hints[1]}`
    );
      
    }else{
        const hints=pickHints(secret);
        setMessage(
        `Terlalu besar!
💡 ${hints[0]}
💡 ${hints[1]}`
    );
}
}
guessBtn.addEventListener("click", handleGuess);
newGameBtn.addEventListener("click", newGame);
levelSelect.addEventListener("change", newGame);

input.addEventListener("keydown", (e)=>{
    if (e.key==="Enter")handleGuess();
});
newGame();