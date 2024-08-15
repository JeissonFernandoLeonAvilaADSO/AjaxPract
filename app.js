import {validarCorreo} from "./funciones/validarCorreo.js";
import { SoloLetras } from "./funciones/soloLetras.js";
import { SoloNumeros } from "./funciones/soloNumeros.js";
import { validarCheck } from "./funciones/validarCheck.js";
import { validar } from "./funciones/validar.js";
import { validacion } from "./funciones/validacion.js";
import { enviarDatos } from "./funciones/ajax.js";
import { Select } from "./funciones/select.js";
import { createTable } from "./ListarUsuarios/tb.js";
import { crearFila } from "./ListarUsuarios/crearFila.js";
import { EditarDatos } from "./funciones/ajax.js";

const $formulario = document.querySelector('#form');
const $nombre = document.querySelector('#Nombre');
const $apellido = document.querySelector('#Apellido');
const $direccion = document.querySelector('#Direccion');
const $telefono = document.querySelector('#Tell');
const $correo = document.querySelector('#Correo');
const $doc = document.querySelector('#Documento');
const $submitButton = document.querySelector('#Boton');
const $checkBox = document.querySelector('#Politicas');
const $limpiar = document.querySelector('#Limpiar');
const $pag1 = document.querySelector('#Paginate1');
const $pag2 = document.querySelector('#Paginate2');

let pagina = 1;

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

    let $table = await createTable(1);
    console.log($table);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling)

}
modif();

let data = {
    "id": null,
    "Nombre": null,
    "Apellido": null,
    "Direccion": null,
    "Telefono": null,
    "Correo": null,
    "Documento": null,
    "Tipo de Documento": null
};


let keys = Object.keys(data);
let rpTipoDoc = await fetch('http://localhost:3000/TipoDocData');
let dataTipoDoc = await rpTipoDoc.json();

$formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    $submitButton.setAttribute('disabled', '');
    $submitButton.classList.add('uncheck');
    let validacion = await validar(e, $ListaSelectores)
    console.log(1);
    console.log(validacion);
    if(validacion){
        console.log(2);
        $ListaSelectores.forEach(element => {
            data[element.name] = element.value
        })
        
        data.id = $formulario.getAttribute('iduser')
        if($formulario.getAttribute('iduser') != null){
            EditarDatos(data.id, data)
            console.log(data);
            console.log(1);
        } else {
            document.querySelector('table > tbody').appendChild(crearFila(data, keys, dataTipoDoc))
            delete data.id
            enviarDatos($ListaSelectores)
            console.log(2);
        }

        $submitButton.classList.remove('uncheck');
        $submitButton.removeAttribute('disabled', '');
        $ListaSelectores.forEach((selector) => {
            selector.value = ''
        })
        $ListaSelectores.forEach((selector) => {
            selector.classList.remove('correcto')
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

$limpiar.addEventListener('click', (e) => {
    $formulario.removeAttribute('iduser')
    $submitButton.textContent = "Enviar"
    
})

$pag1.addEventListener('click', async (e) => {
    document.querySelector('table').remove();
    if(pagina < 1){
        pagina -= 1;
    }
    let $table = await createTable(pagina);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling);
})

$pag2.addEventListener('click', async (e) => {
    document.querySelector('table').remove();
    pagina += 1;
    let $table = await createTable(pagina);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling);
})
