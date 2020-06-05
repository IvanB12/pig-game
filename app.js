/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, lastDice2;


init()
//document.querySelector('#current-' + activePlayer).textContent= roundScore; - можно к переменной, а можно вручную установить стринг
//document.querySelector('#current-' + activePlayer).textContent= dice;

//^ select document by CSS  selector. changing text content, and not a CSS property like in third example
// setter^ because we set a value
//document.querySelector('#current-'+ activePlayer).innerHTML = '<em>' + dice +'</em>';
// ^ select document by html


//посколько документы выбираются по CSS  селектору как стринги
// используя коерцию можно добавлять к стрингам переменную
// и она тоже будет стрингом

// x=doc....

//getter^ because we get a value



//Event Listener


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {//boolean state variable
        //1.random number

        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice, dice2)
        // 2 . Display a result
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice2').style.display = 'block';
        document.getElementById('dice1').src = `dice-${dice}.png`;//my marveluos idea!
        document.getElementById('dice2').src = `dice-${dice2}.png`;

        //3. Update the round score IF dice !=1
        if ( dice === lastDice&& lastDice===6) {
            scores[activePlayer]=0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            nextPlayer()
            console.log('it happens!' + lastDice + dice)
        }
        else if ( dice2 === lastDice2&& lastDice2===6){
            scores[activePlayer]=0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            nextPlayer()
            console.log('it happens! for second dice' + lastDice2 + dice2)
        }
        else if (dice !== 1 && dice2 !== 1) {
            roundScore += dice + dice2;
            //scores[activePlayer] = roundScore; - remove it to hold func
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }

        /*
        else if (dice ===dice2 && dice===6 ){
            nextPlayer()
        }*/
        else {
            nextPlayer()

        }
    }
    lastDice = dice;
    lastDice2 = dice2;
    //console.log(roundScore + ' after dice were added to it')
    //return scores
})//  }) так случается когда одна функция находится внутри другой как аргумент, чаще всего анонимная

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {

        //add CURRENT SCORE to GLOBAL score
        //нельзя добавить очки из другой функции
        //когда ты заканчиваешь раунд нажимая на холд
        //ты сохраняешь раунд очки в счет.
        // при выпадении 1 они сгорают(в roll func) они сгорают
        // единственный способ добавить их исходя из логики игры(правил)
        scores[activePlayer] += roundScore// index could be variable(you can play with that)
        //Update the UI
        document.getElementById('dice1').style.display = 'none'
        document.getElementById('dice2').style.display = 'none'
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        var winningScore;
        var input = document.querySelector('.final-score').value;
        // undefined,0,null or "" are coerced to null
        //Anything else coerced to true

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        document.querySelector('.final-score').style.display = 'none';

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            gamePlaying = false;
        } else {
            //next player
            nextPlayer()
        }
    }


})

function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;// in this way we can switch players
    // document.getElementById('current-1').textContent = '0';
    //document.getElementById('current-0').textContent = '0';
    //below example how to add or remove class. useful when you wants to highlit somethig
    //just save css properties and add  *class as a string
    // and then they will be activeted on click as class added/remove or toggled
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}

// we added event listener to html document 
/*inside EventListener 2 args type of event and function that will be call without () because we don't call here from code, but call by click*/
// anonymous function it's a function declared as second argument
//inside of addEventListener function, no name function

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    //все очки по нулю должны быть при запуске игры
    //а также при нажатии кнопки новая игра
    //в начале эта функция вызывается, потом передается как аргумент
    //для ивент листенера
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    limit = 30;
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    //selection. style. property => value. здесь мы изменили  CSS свойство, а в первом контент
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.final-score').style.display = 'block';
}

// 
/*
document.getElementById('input-btn').addEventListener('click', function (){
    if(gamePlaying){
    limit = document.getElementById('input-score').value
    console.log(limit)
    document.querySelector('.input-field').style.display='none';

}})


console.log(limit)
*/