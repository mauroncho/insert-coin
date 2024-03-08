document.addEventListener('DOMContentLoaded', function () {
  //selecciona el elemento con la etiqueta canvas
  const canvas = document.querySelector('canvas');
  //usamos el contexto 2d dentro del canvas
  const ctx = canvas.getContext('2d');
  //especificamos un alto y un ancho para el canvas
  canvas.width = 500;
  canvas.height = 500;

  //GAME
  //PLAYER
  const playerSpeed = 3;
  const playerWidth = 28;
  const playerHeight = 16;
  let playerX = canvas.width / 2 - playerWidth / 2;
  let playerY = canvas.height - playerHeight;

  function drawPlayer() {
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = 'white';
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
  // let bulletX = 350;
  // let bulletY = canvas.height - playerHeight;
  let bulletSpeed = 7;
  let bulletProyectiles = [];
  //con el eventhandler chequeamos cuando el jugador presiona la barra y
  function shoot() {
    if (shootPressed === true) {
      // Agrega una nueva bala al canvas en la posicion del jugador
      bulletProyectiles.push({
        x: playerX + 14,
        y: canvas.height - playerHeight,
      });
      shootPressed = false;
    }
  }

  function drawBullet() {
    // Dibuja todas las balas almacenadas en el array bulletProyectiles
    // for (let i = 0; i < bulletProyectiles.length; i++) {
    //   let bullet = bulletProyectiles[i];
    //   ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    // }

    bulletProyectiles.map((bullet) =>
      ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight)
    );
  }

  function updateBullets() {
    // Actualiza la posición de todas las balas en el array bulletProyectiles
    for (let i = 0; i < bulletProyectiles.length; i++) {
      bulletProyectiles[i].y -= bulletSpeed;
      // Elimina las balas que estén fuera de la pantalla
      if (bulletProyectiles[i].y < 0) {
        bulletProyectiles.splice(i, 1);
        i--; // Decrementa i para compensar la eliminación del elemento
      }
    }
  }

  //INVADERS
  let invaderStatus = true;
  const invaderHeight = 16;
  const bigInvaderWidth = 25;
  const midInvaderWidth = 23;
  const smallInvaderWidth = 17;
  //dispocision de los invaders
  const numRows = 5;
  const numCols = 9;
  const invaderSpacing = 15;
  const invaderOffsetTop = 50;
  let invadersTroop = [];

  // Inicializar los invasores y almacenar sus posiciones en el array
  for (let row = 0; row < numRows; row++) {
    invadersTroop[row] = [];
    for (let col = 0; col < numCols; col++) {
      let invaderX = col * (bigInvaderWidth + invaderSpacing);
      let invaderY = row * (invaderHeight + invaderSpacing) + invaderOffsetTop;
      let invaderWidth;

      if (row === 0) {
        invaderWidth = smallInvaderWidth;
      } else if (row < 3) {
        invaderWidth = midInvaderWidth;
      } else {
        invaderWidth = bigInvaderWidth;
      }

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
  // Dibujar los invasores en el canvas utilizando las posiciones almacenadas en el array
  function drawInvaders() {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let currentInvader = invadersTroop[row][col];
        if (currentInvader.status === false) {
          continue;
        }
        let invaderX;
        let invaderY = currentInvader.y;
        let invaderWidth = currentInvader.width;
        let invaderHeight = currentInvader.height;
        if (row === 0) {
          invaderX = currentInvader.x + 4;
        } else if (row < 3) {
          invaderX = currentInvader.x + 1;
        } else {
          invaderX = currentInvader.x;
        }
        // Dibujar el invasor en la posición y tamaño almacenados en el array
        ctx.fillRect(invaderX, invaderY, invaderWidth, invaderHeight);
      }
    }
  }

  /*function collisionDetector() {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let currentInvader = invadersTroop[row][col];
        if (currentInvader.status === false) {
          continue;
        }
        console.log(bulletProyectiles);
        // const proyectileSameAsInvader =
        // bulletProyectiles.y === currentInvader.y;
        if (
          currentInvader.status === true &&
          bulletProyectiles.y === currentInvader.y
        ) {
          currentInvader.status = false;

          currentInvader.splice(row, 1);
        }
      }
    }
  }*/

  function collisionDetector() {
    for (let i = 0; i < bulletProyectiles.length; i++) {
      const bullet = bulletProyectiles[i];
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const currentInvader = invadersTroop[row][col];
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
  let spacePressedThisFrame = false; //impide cosas raras al mantener la barra presionada
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
      if (key === 's' && !spacePressedThisFrame && canShoot) {
        shootPressed = true;
        spacePressedThisFrame = true;
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
        spacePressedThisFrame = false; // Resetea el flag para evitar que se presione más de una vez el espacio en el mismo frame.
      }
    }
  }
  //dentro de la función draw ponemos lo que va a visualizarse en el canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //dibuja elementos
    drawPlayer();
    playerMovement();
    drawBullet();
    updateBullets();
    shoot();
    collisionDetector();
    drawInvaders();
    //chequeo colisiones
    //hace que se actualice el canvas ejecutando la función draw, se genera un loop
    window.requestAnimationFrame(draw);
  }
  draw();
  initEvents();
});
