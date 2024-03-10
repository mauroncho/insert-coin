document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('canvas');
  const sprites = document.getElementById('sprites');
  const gameOverScreen = document.getElementById('game-over');
  const youWinScreen = document.getElementById('you-win');
  const startGameButton = document.getElementById('start-game');
  const startScreen = document.getElementById('start-screen');
  //usamos el contexto 2d dentro del canvas
  const ctx = canvas.getContext('2d');
  //especificamos un alto y un ancho para el canvas
  canvas.width = 500;
  canvas.height = 500;

  //PLAYER
  const playerSpeed = 3;
  const playerWidth = 28;
  const playerHeight = 16;
  let playerX = canvas.width / 2 - playerWidth / 2;
  let playerY = canvas.height - playerHeight;

  function drawPlayer() {
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = 'white';

    ctx.drawImage(
      sprites, //la imagen que voy a usar
      349, //coordenada x en la imagen
      28, //coordenada  y en la imagen
      playerWidth, //el ancho del recorte dentro de la imagen
      playerHeight, //el alto del recorte dentro de la imagen
      playerX, //donde quiero poner el recorte en el eje x del canvas
      playerY, //donde quiero poner el recorte en el eje y del canvas
      playerWidth, //el ancho del dibujo en el canvas
      playerHeight //el alto del dibujo en el canvas
    );
  }
  function playerMovement() {
    if (rightPressed && playerX < canvas.width - playerWidth) {
      playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
      playerX -= playerSpeed;
    }
  }
  //BULLET
  const bulletHeight = 8;
  const bulletWidth = 3;
  let bulletSpeed = 7;
  let bulletProyectiles = [];
  //con el eventhandler chequeamos cuando el jugador presiona la barra
  function shoot() {
    if (shootPressed === true) {
      // Agrega una nueva bala al canvas en la posicion del jugador
      bulletProyectiles.push({
        x: playerX + 12,
        y: canvas.height - 20,
      });
      shootPressed = false;
    }
  }

  function drawBullet() {
    // Dibuja todas las balas almacenadas en el array bulletProyectiles
    for (let i = 0; i < bulletProyectiles.length; i++) {
      let bullet = bulletProyectiles[i];
      ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    }
  }

  function updateBullets() {
    // Actualiza la posición de todas las balas en el array bulletProyectiles
    for (let i = 0; i < bulletProyectiles.length; i++) {
      bulletProyectiles[i].y -= bulletSpeed;
      if (bulletProyectiles[i].y < 0) {
        bulletProyectiles.splice(i, 1);
        i--; // Decrementa i para compensar la eliminación del elemento
      }
    }
  }

  //INVADERS
  let invaderStatus = true;
  const invaderHeight = 16;
  const invaderWidth = 23;
  //disposición de los invaders
  const numRows = 4;
  const numCols = 7;
  const invaderSpacing = 15;
  const invaderOffsetTop = 30;
  let invadersSpeedX = 2;
  let invadersTroop = [];

  function endGame() {
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'flex';
  }

  function winGame() {
    canvas.style.display = 'none';
    youWinScreen.style.display = 'flex';
  }

  // Inicializar los invaders y almacenar sus posiciones en el array
  function initInvaders() {
    invadersTroop = [];
    for (let row = 0; row < numRows; row++) {
      invadersTroop[row] = [];
      for (let col = 0; col < numCols; col++) {
        let invaderX = col * (invaderWidth + invaderSpacing);
        let invaderY = row * (invaderHeight + invaderSpacing) + invaderOffsetTop;
        // Agregar la posición y tamaño del invasor al array
        invadersTroop[row][col] = {
          x: invaderX,
          y: invaderY,
          width: invaderWidth,
          height: invaderHeight,
          status: invaderStatus,
        };
      }
    }
  }

  // Dibujar los invasores en el canvas utilizando las posiciones almacenadas en el array
  function drawInvaders() {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let currentInvader = invadersTroop[row][col];
        if (currentInvader.status === false) {
          continue;
        }
        let invaderX = currentInvader.x;
        let invaderY = currentInvader.y;
        let invaderWidth = currentInvader.width;
        let invaderHeight = currentInvader.height;
        // Dibujar el invasor en la posición y tamaño almacenados en el array
        ctx.fillRect(invaderX, invaderY, invaderWidth, invaderHeight);
        ctx.drawImage(
          sprites,
          1,
          19,
          invaderWidth,
          invaderHeight,
          invaderX,
          invaderY,
          invaderWidth,
          invaderHeight
        );
        if (invaderY > 470) {
          endGame();
        }
      }
    }
  }

  let moveRight = true;
  function invadersMovement() {
    const invadersTroopUpdated = invadersTroop.map((troopRow) =>
      troopRow.filter((invader) => invader.status !== false)
    );
    collisionDetector(invadersTroopUpdated);

    // Encuentra la posición más a la derecha y más a la izquierda de la tropa de invadersconso
    let rightMostInvaderX = 0;
    let leftMostInvaderX = canvas.width;
    let invadersSpeedY = 0;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let currentInvader = invadersTroopUpdated[row][col];
        if (currentInvader) {
          if (currentInvader.x > rightMostInvaderX) {
            rightMostInvaderX = currentInvader.x;
          }
          if (currentInvader.x < leftMostInvaderX) {
            leftMostInvaderX = currentInvader.x;
          }
          if (leftMostInvaderX <= 6 && moveRight === false) {
            invadersSpeedY = 16;
            currentInvader.y += invadersSpeedY;
          }
        }
      }
    }
    if (
      (rightMostInvaderX + invaderWidth >= canvas.width - 5 &&
        moveRight === true) ||
      (leftMostInvaderX <= 6 && moveRight === false)
    ) {
      invadersSpeedX = -invadersSpeedX;
      moveRight = !moveRight;
    } else if (
      (rightMostInvaderX + invaderWidth < canvas.width - 6 &&
        moveRight === true) ||
      (leftMostInvaderX < canvas.width + 5 && moveRight === false)
    ) {
      // Mover hacia la derecha
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          let currentInvader = invadersTroopUpdated[row][col];
          if (currentInvader) {
            currentInvader.x += invadersSpeedX;
          }
        }
      }
    }
  }

  const isEmpty = (a) => Array.isArray(a) && a.every(isEmpty); //parámetro "a" es el array de invaders. esta función se fija que un array de arrays esté vacío

  function collisionDetector(invadersTroopUpdated) {
    if (isEmpty(invadersTroopUpdated)) {
      winGame();
    }
    for (let i = 0; i < bulletProyectiles.length; i++) {
      let bullet = bulletProyectiles[i];
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          let currentInvader = invadersTroop[row][col];
          if (currentInvader.status === false) {
            continue;
          }
          // Verificar si hay colisión entre la bala y el invasor
          if (
            bullet.x > currentInvader.x &&
            bullet.x < currentInvader.x + currentInvader.width &&
            bullet.y > currentInvader.y &&
            bullet.y < currentInvader.y + currentInvader.height
          ) {
            // Si hay colisión, marcar al invasor como eliminado
            currentInvader.status = false;
            // Eliminar la bala que colisionó
            bulletProyectiles.splice(i, 1);
            // Decrementar i para compensar la eliminación del elemento del array
            i--;
            break; // Salir del bucle interno para evitar verificar colisiones con otros invasores
          }
        }
      }
    }
  }

  //EVENTS
  let rightPressed = false;
  let leftPressed = false;
  let shootPressed = false;
  let keyPressedThisFrame = false; //impide manetener apretada la tecla de disparo
  let canShoot = true; //bandera que permite, junto con setTimeout, disparar solo a un determinado intervalo de tiemoi
  const shootInterval = 450;
  function initEvents() {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    function keyDownHandler(e) {
      const { key } = e;
      if (key === 'ArrowRight' || key === 'Right') {
        rightPressed = true;
      }
      if (key === 'ArrowLeft' || key === 'Left') {
        leftPressed = true;
      }
      if (key === 's' && !keyPressedThisFrame && canShoot) {
        shootPressed = true;
        keyPressedThisFrame = true;
        canShoot = false;
        setTimeout(() => {
          canShoot = true;
        }, shootInterval);
      }
    }
    function keyUpHandler(e) {
      const { key } = e;
      if (key === 'ArrowRight' || key === 'Right') {
        rightPressed = false;
      }
      if (key === 'ArrowLeft' || key === 'Left') {
        leftPressed = false;
      }
      if (key === 's') {
        shootPressed = false;
        keyPressedThisFrame = false;
      }
    }
  }
  //dentro de la función draw ponemos lo que va a visualizarse en el canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //dibuja elementos
    drawInvaders();
    drawPlayer();
    drawBullet();
    invadersMovement();
    playerMovement();
    updateBullets();
    shoot();
    //actualiza el canvas ejecutando la función draw, se genera un loop
    window.requestAnimationFrame(draw);
  }

  function startGame() {
    canvas.style.display = 'block';
    initInvaders();
    draw();
    initEvents();
  }

  startGameButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    startGame();
  });
});