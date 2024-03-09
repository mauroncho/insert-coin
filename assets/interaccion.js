//VALIDACIÓN FORMULARIO
document.addEventListener('DOMContentLoaded', function () {
  const contactoForm = document.getElementById('contacto-form');
  const nombreUsuario = document.getElementById('username');
  const apellidoUsuario = document.getElementById('userapellido');
  const mailUsuario = document.getElementById('usermail');
  const mensajeUsuario = document.getElementById('comentarios');
  const btnEnviar = document.getElementById('contacto-submit');

  if (btnEnviar) {
    btnEnviar.addEventListener('click', validarFormulario);
  }

  function validarFormulario() {
    // Validar nombre
    if (nombreUsuario.value == 0) {
      nombreUsuario.classList.add('is-invalid');
      alert('Nombre es obligatorio');
      nombreUsuario.focus();
      return false;
    } else {
      nombreUsuario.classList.remove('is-invalid');
      nombreUsuario.classList.add('is-valid');
    }
    // Validar apellido
    if (apellidoUsuario.value == '') {
      apellidoUsuario.classList.add('is-invalid');
      alert('Apellido es obligatorio');
      document.formulario.apellido.focus();
      return false;
    } else {
      apellidoUsuario.classList.remove('is-invalid');
      apellidoUsuario.classList.add('is-valid');
    }

    if (mensajeUsuario.value == '') {
      mensajeUsuario.classList.add('is-invalid');
      alert('Escribí un mensaje');
      document.formulario.apellido.focus();
      return false;
    } else {
      mensajeUsuario.classList.remove('is-invalid');
      mensajeUsuario.classList.add('is-valid');
    }

    // Validar email
    const regexEmail =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!regexEmail.test(mailUsuario.value)) {
      mailUsuario.classList.add('is-invalid');
      alert('Email debe contener un email');
      return false;
    } else {
      mailUsuario.classList.remove('is-invalid');
      mailUsuario.classList.add('is-valid');
    }

    // Enviar formulario
    contactoForm.submit();
    contactoForm.reset();
    alert('Muchas gracias por enviar el formulario');
  }
});

//RULETA DE STICKERS
document.addEventListener('DOMContentLoaded', function () {
  const divStickers = document.getElementById('stickers');
  let stickerA = [
    'stickers-donkey.jpg',
    'stickers-mk.jpg',
    'stickers-streetfighter.jpg',
    'stickers-wonderboy.jpg',
    'stickes-cadillacs.jpg',
  ];

  let botonSortear = document.getElementById('sortear-sticker');

  botonSortear.addEventListener('click', function () {
    let sorteoS = Math.floor(Math.random() * stickerA.length);

    divStickers.innerHTML = `
      <a href="img/${stickerA[sorteoS]}" download="img/${stickerA[sorteoS]}">
      <img src="img/${stickerA[sorteoS]}" alt="Sticker de la página Insert Coin" class="w-100">
      </a>`;
  });
});

// MODAL CLASICOS
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionar el elemento utilizando querySelectorAll
  const boostrapModals = document.querySelectorAll('modal');

  // Iterar sobre cada elemento
  boostrapModals.forEach(function (modal) {
    // Convertir la lista de clases a un array para poder usar métodos como includes()
    const clasesArray = Array.from(modal.classList);

    // Imprimir las clases CSS aplicadas al elemento
    console.log('Clases CSS aplicadas al elemento:', clasesArray);
    return clasesArray;
  });
  if (clasesArray.some('show')) {
  }
});
