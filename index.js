
let player = {
    name: "Per",
    chips: 200
}
let hand = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let deckEl = document.getElementById("deck-el")
playerEl.textContent = player.name + ": $" + player.chips


let standardDeck = []
let gameDeck = []

function resetDeck(){
    standardDeck = [1,1,1,1,
        2,2,2,2,
        3,3,3,3,
        4,4,4,4,
        5,5,5,5,
        6,6,6,6,
        7,7,7,7,
        8,8,8,8,
        9,9,9,9,
        10,10,10,10, //10's
        10,10,10,10, //Jacks
        10,10,10,10, //Queen
        10,10,10,10] //King
}

function shuffleCards(){
    let randomCard = 0
    let firstFive = ""
    let randomIndex = 0

    gameDeck = []
    resetDeck()

    for(let i = 0; i<52; i++){
        randomIndex = Math.floor( Math.random()*standardDeck.length)
        gameDeck.push(standardDeck[randomIndex])
        standardDeck.splice(randomIndex, 1)
        

    }

    for(let i = 0; i<5; i++){
        firstFive += gameDeck[i] + " "
    }

    deckEl.textContent = "Deck = " + firstFive
    
        }

/* Rewrite both functions to utalize actual deck logic
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}
*/

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        
        if(gameDeck.length<1)
            shuffleCards()

        let card = gameDeck.pop()
        sum += card
        hand.push(card)
        renderGame()        
    }
}

function startGame() {
    isAlive = true
    shuffleCards()
    let firstCard = gameDeck.pop()
    let secondCard = gameDeck.pop()
    hand = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < hand.length; i++) {
        cardsEl.textContent += hand[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


