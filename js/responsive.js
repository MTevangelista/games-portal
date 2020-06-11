function start() {
    responsive()
    createBoard()
}

function createBoard() {
    const cards = [
        { id: 'cardFront', path: './images/aws.svg' },
        { id: 'cardFront', path: './images/code.svg' },
        { id: 'cardFront', path: './images/html5.svg' },
        { id: 'cardFront', path: './images/js.svg' },
        { id: 'cardFront', path: './images/nodejs.svg' },
        { id: 'cardFront', path: './images/npm.svg' },
        { id: 'cardFront', path: './images/vuejs.svg' }
    ]
    const cardFront = './images/front-face.svg'
    const cardBoard = document.getElementById('cardBoard')
    const boardLengh = 16

    for (let index = 1; index <= boardLengh; index++) {
            console.log(boardLengh);
            let div_card = document.createElement("div")
            div_card.innerHTML +=
                `
                    <div class="card" id="${index}">
                        <figure>
                            <img src="${cardFront}">
                        </figure>
                    </div>
                `
            cardBoard.appendChild(div_card)
    }
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