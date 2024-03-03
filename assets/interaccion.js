/*
const contactoForm = document.getElementById('contacto-form');
const nombreUsuario = document.getElementById('username');
const apellidoUsuario = document.getElementById('userapellido');
const mailUsuario = document.getElementById('usermail');
const btnEnviar = document.getElementById('contacto-submit');

console.log(btnEnviar);

function validarFormulario() {
  // Validar nombre
  if (nombreUsuario.value == 0) {
    nombreUsuario.classList.add('is-invalid');
    alert('Nombre es obligatorio');
    nombreUsuario.focus();
    return false;
  } else {
    nombreUsuario.classList.add('is-valid');
  }
  // Validar apellido
  if (apellidoUsuario.value == '') {
    apellidoUsuario.classList.add('is-invalid');
    alert('Apellido es obligatorio');
    document.formulario.apellido.focus();
    return false;
  } else {
    apellidoUsuario.classList.add('is-valid');
  }

  // Validar email
  const regexEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  if (!regexEmail.test(mailUsuario.value)) {
    mailUsuario.classList.add('is-invalid');
    alert('Email debe contener un email');
    return false;
  } else {
    mailUsuario.classList.add('is-valid');
  }
  // Enviar formulario
  alert('Muchas gracias por enviar el formulario');
  contactoForm.submit();
}

btnEnviar.addEventListener('click', validarFormulario);
*/

document.addEventListener('DOMContentLoaded', function () {
  const contactoForm = document.getElementById('contacto-form');
  const nombreUsuario = document.getElementById('username');
  const apellidoUsuario = document.getElementById('userapellido');
  const mailUsuario = document.getElementById('usermail');
  const btnEnviar = document.getElementById('contacto-submit');

  if (btnEnviar) {
    btnEnviar.addEventListener('click', validarFormulario);
  } else {
    console.error(
      "El elemento con el id 'contacto-submit' no se encontró en el documento."
    );
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

    // Validar email
    const regexEmail =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!regexEmail.test(mailUsuario.value)) {
      mailUsuario.classList.add('is-invalid');
      alert('Email debe contener un email');
      return false;
    }

    // Enviar formulario
    alert('Muchas gracias por enviar el formulario');
    contactoForm.submit();
  }
});
