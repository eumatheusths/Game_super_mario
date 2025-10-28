// Seleciona os elementos do jogo
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameBoard = document.querySelector('.game-board'); // Para adicionar texto

// Função de pulo
const jump = () => {
  mario.classList.add('jump');
  
  // Remove a classe 'jump' depois que a animação termina (500ms)
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

// Loop principal do jogo (verifica o estado do jogo a cada 10ms)
const loop = setInterval(() => {

    // Pega a posição atual do cano
    const pipePosition = pipe.offsetLeft;
    
    // Pega a posição 'bottom' do Mario (o '+' converte a string "180px" para o número 180)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Pega a posição das nuvens
    const cloudsPosition = clouds.offsetLeft;

    // --- CONDIÇÃO DE GAME OVER ---
    // Se o cano chegou no Mario (pipePosition <= 120)
    // E o Mario não está pulando por cima (marioPosition < 80)
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        // 1. Para o loop do jogo
        clearInterval(loop);

        // 2. Para a animação do cano onde ele bateu
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // 3. Para a animação do Mario onde ele bateu
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // 4. Troca a imagem do Mario pela imagem de 'Game Over'
        mario.src = './img/game-over.webp';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // 5. Para as nuvens
        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        // (Opcional) Adiciona texto de Game Over
        const gameOverText = document.createElement('h1');
        gameOverText.innerText = 'GAME OVER';
        gameOverText.style.position = 'absolute';
        gameOverText.style.top = '40%';
        gameOverText.style.left = '50%';
        gameOverText.style.transform = 'translateX(-50%)';
        gameOverText.style.color = 'red';
        gameOverText.style.textShadow = '2px 2px #000';
        gameOverText.style.fontSize = '4rem';
        gameBoard.appendChild(gameOverText);
    }

}, 10);

// Faz o Mario pular ao pressionar qualquer tecla
document.addEventListener('keydown', jump);
