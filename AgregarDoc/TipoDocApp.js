import { SoloLetras } from "../funciones/soloLetras.js";
import { validar } from "../funciones/validar.js";
import { AgregarTipoDoc } from "./AgregarTipoDoc.js";
import { validacion } from "../funciones/validacion.js";

const $submitButton = document.querySelector('#Boton')
const $form = document.querySelector('#form')
const $input = document.querySelector('#AddDoc')
const $ListaSelectores = [$input]

$input.addEventListener('keydown', SoloLetras)



$form.addEventListener('submit', async (e) => {
    e.preventDefault();
    $submitButton.setAttribute('disabled', '');
    $submitButton.classList.add('uncheck');
    let validacion = await validar(e, $ListaSelectores)
    console.log(1);
    console.log(validacion);
    if (validacion){
        console.log(2);
        await AgregarTipoDoc($input.value)
        $submitButton.classList.remove('uncheck');
        $submitButton.removeAttribute('disabled', '');
        $input.value = ''
    } else {
        console.log(3);
        $submitButton.classList.remove('uncheck');
        $submitButton.removeAttribute('disabled', '');
    }
});

$ListaSelectores.forEach((campo) => {
    campo.addEventListener('blur', (evt) => validacion(evt, campo));
});







