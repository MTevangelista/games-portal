function start() {
    responsive()
    createBoard()
}

function responsive() {
    const width = screen.width
    const navigation = document.getElementById('navigation')

    if (width <= 625) {
        createMobileNavigationBar(navigation)
    } else {
        createWebNavigationBar(navigation)
    }
}

const createMobileNavigationBar = (navigation) => {
    navigation.classList.add('menuMobile')
    navigation.innerHTML =
        `
        <ul>
            <li>
                <div class="dropdown">
                   <a href="#"><i class="fas fa-bars"></i></a>
                    <div class="dropdown-content">
                        <a href="index.html">Home</a>
                        <a href="memory-game.html">Jogos</a>
                        <a href="#">Notícias</a>
                        <a href="about.html">Sobre</a>
                        <a href="contact.html">Contato</a>
                        <a href="#">Login</a>
                        <a href="#">Cadastre-se</a>
                    </div>
                </div>
            </li>
        </ul>
    `
}

const createWebNavigationBar = (navigation) => {
    navigation.classList.add('menuWeb')
    navigation.innerHTML =
        `
        <ul>
           <li><a href="index.html">Home</a></li>
           <li><a href="memory-game.html">Jogos</a></li>
           <li><a href="#">Notícias</a></li>
           <li><a href="about.html">Sobre</a></li>
           <li><a href="contact.html">Contato</a></li>
           <li>
                <div class="dropdown">
                   <a href="#">Entrar
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/236520/arrow_down.svg"
                       alt="Submenu open">
                    </a>
                   <div class="dropdown-content">
                       <a href="#">Login</a>
                       <a href="#">Cadastre-se</a>
                   </div>
                </div>
            </li>
        </ul>
    `
}

// Memory-game

let cardBoard = document.getElementById('cardBoard')
const btnStart = document.getElementById('btnStart')
const cardBack = './images/dev.svg'
let cards = [
    { id: 'aws0', value: 'aws', path: './images/aws.svg' },
    { id: 'aws1', value: 'aws', path: './images/aws.svg' },
    { id: 'html50', value: 'html', path: './images/html5.svg' },
    { id: 'html51', value: 'html', path: './images/html5.svg' },
    { id: 'js0', value: 'js', path: './images/js.svg' },
    { id: 'js1', value: 'js', path: './images/js.svg' },
    { id: 'nodejs0', value: 'nodejs', path: './images/nodejs.svg' },
    { id: 'nodejs1', value: 'nodejs', path: './images/nodejs.svg' },
    { id: 'vuejs0', value: 'vuejs', path: './images/vuejs.svg', },
    { id: 'vuejs1', value: 'vuejs', path: './images/vuejs.svg', },
    { id: 'code0', value: 'code', path: './images/code.svg', },
    { id: 'code1', value: 'code', path: './images/code.svg', },
    { id: 'npm0', value: 'npm', path: './images/npm.svg' },
    { id: 'npm1', value: 'npm', path: './images/npm.svg' },
    { id: 'react0', value: 'react', path: './images/react.svg' },
    { id: 'react1', value: 'react', path: './images/react.svg' },
]
let choosedCards = []
let cardValues = []
let pairs = []
let firstCard, secondCard

function createBoard() {
    for (card of cards) {
        cardBoard.innerHTML +=
            `              
                    <div class="flip-card">
                        <div class="flip-card-inner" id="${card.id}" onclick="checkCard(${card.id}, '${card.value}')">
                            <div class="card-front">
                                <img id="card_${card.id}" src="${card.path}"> 
                            </div>
                            <div class="card-back">
                                <img id="cardBack" src="${cardBack}">
                            </div>
                        </div>
                    </div>                   
                `
    }
    disableAllCards()
}

function startGame() {
    cardBoard.innerHTML = ''
    btnStart.disabled = true

    cards = shuffle(cards)

    createBoard()

    setTimeout(function () {
        for (card of cards) {
            flip(card)
        }
        enableAllCards()
    }, 1500)
}

const shuffle = (lista) => {
    lista.sort(function () {
        return .5 - Math.random()
    })
    return lista
}

const flip = (card) => {
    let cardHTML = document.getElementById(`${card.id}`)
    cardHTML.classList.add("flip");
}

const unFlip = (card) => {
    let cardHTML = document.getElementById(`${card.id}`)
    cardHTML.classList.remove("flip");
}

const checkCard = (card, value) => {
    choosedCards.push(card)
    cardValues.push(value)

    switch (choosedCards.length) {
        case 1:
            firstCard = choosedCards[0]
            unFlip(firstCard)
            break
        case 2:
            secondCard = choosedCards[1]
            unFlip(secondCard)
            disableCard(firstCard, secondCard)
            if (cardValues[0] == cardValues[1]) {
                pairs.push(firstCard, secondCard)
                setTimeout(function () {
                    enableAllCards()
                    disableCorrectPairs()
                }, 1500)
            } else {
                setTimeout(function () {
                    flip(firstCard)
                    flip(secondCard)

                    enableAllCards()
                    disableCorrectPairs()
                }, 1500)
            }
            cardValues = []
            choosedCards = []
            break
    }
}

const disableCorrectPairs = () => {
    for (card of pairs) {
        document.getElementById(`${card.id}`).classList.add("disabledCard");
    }
}

const enableAllCards = () => {
    for (card of cards) {
        document.getElementById(`${card.id}`).classList.remove("disabledCard");
    }
}

const disableAllCards = () => {
    for (card of cards) {
        document.getElementById(`${card.id}`).classList.add("disabledCard");
    }
}

const disableCard = (firstCard, secondCard) => {
    for (card of cards) {
        if (card.id != firstCard.id && card.id != secondCard.id) {
            document.getElementById(`${card.id}`).classList.add("disabledCard");
        }
    }
}

// const gameOver = () => {
//     if (choosedCards.length == cards.length) {
//         console.log("fim");
//         return true
//     } 
//     return false
// }