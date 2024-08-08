import {validarCorreo} from "./funciones/validarCorreo.js";
import { SoloLetras } from "./funciones/soloLetras.js";
import { SoloNumeros } from "./funciones/soloNumeros.js";
import { validarCheck } from "./funciones/validarCheck.js";
import { validar } from "./funciones/validar.js";
import { validacion } from "./funciones/validacion.js";
import { enviarDatos } from "./funciones/ajax.js";
import { Select } from "./funciones/select.js";
import { createTable } from "./ListarUsuarios/tb.js";
import { crearFila } from "./ListarUsuarios/tb.js";

const $formulario = document.querySelector('#form');
const $nombre = document.querySelector('#Nombre');
const $apellido = document.querySelector('#Apellido');
const $direccion = document.querySelector('#Direccion');
const $telefono = document.querySelector('#Tell');
const $correo = document.querySelector('#Correo');
const $doc = document.querySelector('#Documento');
const $submitButton = document.querySelector('#Boton');
const $checkBox = document.querySelector('#Politicas');


let $ListaSelectores = document.querySelectorAll('form[novalidate] > *[required]')

async function modif() {
    const miSelect = await Select();
    let $selector = miSelect.querySelector('select');
    $telefono.parentNode.insertBefore(miSelect, $telefono.nextSibling);
    $ListaSelectores = [...$ListaSelectores, $selector]
    console.log($selector);
    
    $ListaSelectores.forEach((selector) => {
        selector.classList.add('uncheck');
        $submitButton.classList.add('uncheck');
        $submitButton.setAttribute('disabled', '');
        selector.disabled = true;
    })

    $ListaSelectores.forEach((campo) => {
        campo.addEventListener('blur', (evt) => validacion(evt, campo));
    });

    let $table = await createTable();
    console.log($table);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling)
}
modif();

let data;
$formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    $submitButton.setAttribute('disabled', '');
    $submitButton.classList.add('uncheck');
    let validacion = await validar(e, $ListaSelectores)
    console.log(1);
    console.log(validacion);
    if(validacion){
        console.log(2);
        await enviarDatos($ListaSelectores)
        $submitButton.classList.remove('uncheck');
        $submitButton.removeAttribute('disabled', '');
        $ListaSelectores.forEach((selector) => {
            selector.value = ''
        })
        $ListaSelectores.forEach((selector) => {
            selector.classList.remove('correcto')
        })

        data = $ListaSelectores.forEach(element => {
            return element.value
        })
        

    } else {
        console.log(3);
        $submitButton.classList.remove('uncheck');
        $submitButton.removeAttribute('disabled', '');
    }
});


$nombre.addEventListener('keydown', SoloLetras);

$apellido.addEventListener('keydown', SoloLetras);

$telefono.addEventListener('keydown', SoloNumeros);

$correo.addEventListener('keyup', (e) => {
    let rs = validarCorreo(e)

    if(!rs){
        $correo.classList.add('error');
        $correo.classList.remove('correcto');
    } else {
        $correo.classList.remove('error');
        $correo.classList.add('correcto');
    }
});

$doc.addEventListener('keydown', SoloNumeros);

$checkBox.addEventListener('change', (e) => {
    validarCheck(e, $ListaSelectores, $submitButton)
});
