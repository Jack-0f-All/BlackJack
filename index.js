
let player = {
    name: "Per",
    chips: 200
}
let hand = []
let playerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

//Buttons
let startEl = document.getElementById("startButton-el")
let dealEl = document.getElementById("dealButton-el")
let newHandEl = document.getElementById("newButton-el")

//Page elements
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let deckEl = document.getElementById("deck-el")


let dealerEl = document.getElementById("dealer-el")
let dealerSumEl = document.getElementById("dealerSum-el")
let dealerHand = []
let dealerSum = 0


playerEl.textContent = player.name + ": $" + player.chips


let standardDeck = []
let gameDeck = []

function startGame() {
    isAlive = true
    startEl.textContent= "NEW GAME"
    

//Added to learn hiding elements. May use later on.
    /*
    newHandEl.removeAttribute("hidden")
    dealEl.removeAttribute("hidden")

    */

    document.getElementById("game-el").style.visibility = "visible"

    shuffleCards()
    deal()
    
    renderGame()
}
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

function shuffleCards(numberOfDecks){
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

    
}

function deal(){
    
    isAlive = true
    hasBlackJack = false
    hand = []
    dealerHand = []

    if(gameDeck.length < 15){
        shuffleCards()
    }

  
    dealerHand[0] = gameDeck.pop()
    hand[0] = gameDeck.pop()

    dealerHand[1] = gameDeck.pop()
    hand[1] = gameDeck.pop()
    playerSum = hand[0] + hand[1]
    renderGame()
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {

        let card = gameDeck.pop()
        playerSum += card
        hand.push(card)
        renderGame()        
    }
}

function renderGame() {
    updateSum()

    deckEl.textContent = "Deck = " + gameDeck.length

    //dispaly cards in hand for player and dealer
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < hand.length; i++) {
        cardsEl.textContent += hand[i] + " "
    }

    dealerEl.textContent = "Cards: "
    for(let i = 0; i < dealerHand.length; i++){
        dealerEl.textContent += dealerHand[i] + " "
    }

    //display sum of hands for both
    sumEl.textContent = "Sum: " + playerSum
    dealerSumEl.textContent = "Sum: " + dealerSum

    //update gamestate and message
    if (playerSum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (playerSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function updateSum(){
    playerSum=0
    dealerSum=0
    for(let card of hand){
        playerSum+=card
    }

    for(let card of dealerHand){
        dealerSum+=card
    }
}


