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
  const bigInvaderHeight = 16;
  const bigInvaderWidth = 25;
  const midInvaderHeight = 16;
  const midInvaderWidth = 23;
  const smallInvaderHeight = 16;
  const smallInvaderWidth = 17;
  //dispocision de los invaders
  const numRows = 5;
  const numCols = 9;
  const invaderSpacing = 15;
  const invaderOffsetTop = 50;
  let invadersTroop = [];
  function drawInvaders(e) {
    // Dibujar filas y columnas de Invaders
    // console.log(invadersTroop);
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let invaderX = col * (bigInvaderWidth + invaderSpacing);
        let invaderY =
          row * (bigInvaderHeight + invaderSpacing) + invaderOffsetTop;

        if (row === 0) {
          ctx.fillRect(
            invaderX + 4,
            invaderY,
            smallInvaderWidth,
            smallInvaderHeight
          );
        } else if (row < 3) {
          ctx.fillRect(
            invaderX + 1,
            invaderY,
            midInvaderWidth,
            midInvaderHeight
          );
        } else {
          ctx.fillRect(invaderX, invaderY, bigInvaderWidth, bigInvaderHeight);
        }
        // invadersTroop.push({ x: invaderX, y: invaderY });
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
      // console.log(e);
      const { key } = e;
      console.log(key);
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
      // console.log(shootPressed);
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
    drawInvaders();
    //chequeo colisiones
    //hace que se actualice el canvas ejecutando la función draw, se genera un loop
    window.requestAnimationFrame(draw);
  }
  draw();
  initEvents();
});
