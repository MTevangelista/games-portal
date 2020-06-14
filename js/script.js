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
    { id: 'aws0', path: './images/aws.svg' },
    { id: 'aws1', path: './images/aws.svg' },
    { id: 'html50', path: './images/html5.svg' },
    { id: 'html51', path: './images/html5.svg' },
    { id: 'js0', path: './images/js.svg' },
    { id: 'js1', path: './images/js.svg' },
    { id: 'nodejs0', path: './images/nodejs.svg' },
    { id: 'nodejs1', path: './images/nodejs.svg' },
    { id: 'vuejs0', path: './images/vuejs.svg', },
    { id: 'vuejs1', path: './images/vuejs.svg', },
    { id: 'code0', path: './images/code.svg', },
    { id: 'code1', path: './images/code.svg', },
    { id: 'npm0', path: './images/npm.svg' },
    { id: 'npm1', path: './images/npm.svg' },
    { id: 'react0', path: './images/react.svg' },
    { id: 'react1', path: './images/react.svg' },
]
let choosedCards = []

function createBoard() {
    for (card of cards) {
        cardBoard.innerHTML +=
            `              
                    <div class="flip-card">
                        <div class="flip-card-inner" id="${card.id}" onclick="checkCard(${card.id})">
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
}

function startGame() {
    cardBoard.innerHTML = ''
    btnStart.disabled = true
    
    cards = shuffle(cards)

    createBoard()
    
    setTimeout(function () {
        for (card of cards){
            flip(card)
        }
        
    }, 1500)
}

const shuffle = lista => {
    lista.sort(function () {
        return .5 - Math.random()
    })
    return lista
}

const flip = (card) => {
    let cardHTML =  document.getElementById(`${card.id}`)
    cardHTML.classList.add("flip");
}

const unFlip = (card) => {
    let cardHTML = document.getElementById(`${card.id}`)
    cardHTML.classList.remove("flip");
}

const checkCard = (card) => {
    console.log(cards.length);
    console.log(choosedCards.length);
    // console.log('id=', card.id);
    unFlip(card)
    choosedCards.push(card.id)
    if (!gameOver()) {
        console.log('Jogo continua');
    } else {
        console.log('FINALIZADO');
    }
   
    console.log(choosedCards);
}

const gameOver = () => {
    if (choosedCards.length == cards.length) {
        console.log("fim");
        return true
    } 
    return false
}