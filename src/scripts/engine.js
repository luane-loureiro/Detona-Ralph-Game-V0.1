const state = {

    view:{
        square: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },

    values:{
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },

    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(coutDown, 1000),
    }
};

function coutDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0){
        clearInterval(state.action.curretTimerId);
        clearInterval(state.action.countDownTimerId);
        alert("Game Over!");
        alert(" O seu Resultado Foi: " + state.values.result);
    }

}

function playSoud(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.square.forEach((square) =>{
        square.classList.remove('enemy');
    })
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListernerHitBox(){
    state.view.square.forEach((square) => {
        square.addEventListener('mousedown', () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSoud('hit');



            }
            
        })
    });

}

function init() {
    addListernerHitBox();
};


init();