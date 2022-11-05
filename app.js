const newGameBtn = document.querySelector('button');

function game(roundQty) {
    const getComputerChoice = () => {
        const options = ['rock', 'paper', 'scissors'];
        let randInt = Math.floor(Math.random() * 3);
        return options[randInt];
    }

    const getUserChoice = (str) => {
        const options = ['rock', 'paper', 'scissors'];
        let userChoice = prompt(str).toLowerCase();
        for (let i = 0; i < options.length; ++i) {
            if (options[i] === userChoice) {
                return userChoice;
            }
        }

        return getUserChoice('It seems you\'ve made a typo. Try again!');
    }

    const gameResult = {
        player: 0,
        computer: 0
    }

    for (let i = 0; i < roundQty; ++i) {
        const playerSelection = getUserChoice('Your turn!');;
        const computerSelection = getComputerChoice();

        console.log(`Round №${i+1}`)
        console.log(`Player: ${playerSelection}`);
        console.log(`Computer: ${computerSelection}`);

        const { text, winner } = playRound(playerSelection, computerSelection)

        if (winner) gameResult[winner] += 1;

        console.log(text);
        console.table(gameResult);
        console.log('***************');
    }

    console.log('Game results: ')
    if (gameResult.player === gameResult.computer) 
        console.log('A DRAW!');
    if (gameResult.player > gameResult.computer) 
        console.log('YOU WON!');
    if (gameResult.player < gameResult.computer) 
        console.log('YOU LOOSE!')
    console.table(gameResult);
}

function playRound(playerSelection, computerSelection) {
    const getCapitalized = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (playerSelection === computerSelection) {
        return {
            text: `A draw! Both chose ${getCapitalized(playerSelection)}!`,
            winner: null
        }
    }

    const isPlayerWon = (roundСombination) => {
        const winningСombinations = [
            ['rock', 'scissors'],
            ['scissors', 'paper'],
            ['paper', 'rock']
        ]

        const compareArrays = (winCombs, roundComb) => {
            for (let comb of winCombs) {
                let matchCounter = 0;
                for (let i = 0; i < comb.length; ++i) {
                    if (comb[i] === roundComb[i]) {
                        matchCounter += 1;
                    }
                }
                if (matchCounter === 2) {
                    return true;
                }
            }
            return false;
        }

        return compareArrays(winningСombinations, roundСombination);
    }

    if (isPlayerWon([playerSelection, computerSelection])) {
        return {
            text: `You won! ${getCapitalized(playerSelection)} beats ${getCapitalized(computerSelection)}!`,
            winner: 'player'
        }
    } else {
        return {
            text: `You Lose! ${getCapitalized(computerSelection)} beats ${getCapitalized(playerSelection)}!`,
            winner: 'computer'
        }
    }
}

newGameBtn.addEventListener('click', () => game(5));
