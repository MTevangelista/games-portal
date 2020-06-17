function start() {
    responsive()
    createBoard()
    showUserTime()
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
const result = document.getElementById('result')
const cardBack = './images/dev.svg'
let cards = [
    { id: 'aws0', order: 0, value: 'aws', path: './images/aws.svg' },
    { id: 'aws1', order: 1, value: 'aws', path: './images/aws.svg' },
    { id: 'html50', order: 2, value: 'html', path: './images/html5.svg' },
    { id: 'html51', order: 3, value: 'html', path: './images/html5.svg' },
    { id: 'js0', order: 4, value: 'js', path: './images/js.svg' },
    { id: 'js1', order: 5, value: 'js', path: './images/js.svg' },
    { id: 'nodejs0', order: 6, value: 'nodejs', path: './images/nodejs.svg' },
    { id: 'nodejs1', order: 7, value: 'nodejs', path: './images/nodejs.svg' },
    { id: 'vuejs0', order: 8, value: 'vuejs', path: './images/vuejs.svg', },
    { id: 'vuejs1', order: 9, value: 'vuejs', path: './images/vuejs.svg', },
    { id: 'code0', order: 10, value: 'code', path: './images/code.svg', },
    { id: 'code1', order: 11, value: 'code', path: './images/code.svg', },
    { id: 'npm0', order: 12, value: 'npm', path: './images/npm.svg' },
    { id: 'npm1', order: 13, value: 'npm', path: './images/npm.svg' },
    { id: 'react0', order: 14, value: 'react', path: './images/react.svg' },
    { id: 'react1', order: 15, value: 'react', path: './images/react.svg' },
]
let choosedCards = []
let cardValues = []
let pairs = []
let firstCard, secondCard, startTime, endTime
let storage = window.localStorage;
let times = JSON.parse(storage.getItem('times'))

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
    startTime = new Date()
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
    setTimeout(function () {
        if (gameOver()) {
            endTime = new Date()
            saveUserTime()
            resetGame()
        }
    }, 1500)
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

const gameOver = () => {
    if (pairs.length == cards.length) {
        return true
    }
    return false
}

const resetGame = () => {
    pairs = []
    for (card of cards) {
        card = cards.sort(function (a, b) {
            return a.order - b.order
        })
    }
    cardBoard.innerHTML = ''
    createBoard()
    btnStart.disabled = false
}

const saveUserTime = () => {
    let time = endTime - startTime
    times.push(time)
    storage.setItem('times', JSON.stringify(times))
}

const showUserTime = () => {
    for (let i = 0; i <= times.length; i++) {
        times.sort(function (a, b) {
            return a - b
        })
    }
    result.innerHTML = `Melhor tempo: ${times[0]}`
}