import {validarCorreo} from "./funciones/validarCorreo.js";
import { SoloLetras } from "./funciones/soloLetras.js";
import { SoloNumeros } from "./funciones/soloNumeros.js";
import { validarCheck } from "./funciones/validarCheck.js";
import { validar } from "./funciones/validar.js";
import { validacion } from "./funciones/validacion.js";
import { enviarDatos } from "./funciones/ajax.js";
import { Select } from "./funciones/select.js";
import { createTable, consultaPag } from "./ListarUsuarios/tb.js";
import { crearFila } from "./ListarUsuarios/crearFila.js";
import { EditarDatos } from "./funciones/ajax.js";
import { desHabilitarBoton, 
    habilitarBotn, 
    cambiarEstados, 
    uncheckBoton, 
    checkBoton } from "./funciones/estadosBotones.js";

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
const $primPag = document.querySelector('#Primera');
const $ultPag = document.querySelector('#Ultima');

let pagina = 1;

let $ListaSelectores = document.querySelectorAll('form[novalidate] > *[required]')

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


async function modif() {
    const miSelect = await Select();
    let $selector = miSelect.querySelector('select');
    $telefono.parentNode.insertBefore(miSelect, $telefono.nextSibling);
    $ListaSelectores = [...$ListaSelectores, $selector]
    console.log($selector);
    
    $ListaSelectores.forEach((selector) => {
        uncheckBoton(selector)
    })
    
    $ListaSelectores.forEach((campo) => {
        campo.addEventListener('blur', (evt) => validacion(evt, campo));
    });
    
    uncheckBoton($submitButton)

    desHabilitarBoton($pag1)
    desHabilitarBoton($primPag)

    let $table = await createTable(1);
    console.log($table);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling)

}
modif();


$formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    uncheckBoton($submitButton)
    
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

        checkBoton($submitButton)


        $ListaSelectores.forEach((selector) => {
            selector.value = ''
        })
        $ListaSelectores.forEach((selector) => {
            selector.classList.remove('correcto')
        })
        
    } else {
        console.log(3);
        checkBoton($submitButton)
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
    const rpPag = await consultaPag(pagina);

    if(pagina > rpPag.first){
        pagina -= 1;
    }
    let $table = await createTable(pagina);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling);

    console.log([rpPag.prev, rpPag.next]);
    if(rpPag.prev === null){
        desHabilitarBoton($pag1)
        desHabilitarBoton($primPag)
    } else {
        habilitarBotn($pag1)
        habilitarBotn($pag2)
        habilitarBotn($ultPag)
    }
})

$pag2.addEventListener('click', async (e) => {
    document.querySelector('table').remove();
    const rpPag = await consultaPag(pagina);

    if (pagina < rpPag.last){
        pagina += 1;
    }

    let $table = await createTable(pagina);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling);

    console.log([rpPag.prev, rpPag.next]);
    
    if(rpPag.next === null){
        desHabilitarBoton($pag2)
        desHabilitarBoton($ultPag)
    } else {
        habilitarBotn($pag1)
        habilitarBotn($pag2)
        habilitarBotn($primPag)
    }
})


$primPag.addEventListener('click', async (e) => {
    document.querySelector('table').remove();
    const rpPag = await consultaPag(pagina);

    pagina = rpPag.first

    let $table = await createTable(pagina);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling);

    console.log(pagina);
    
    cambiarEstados($pag2, $pag1)
    cambiarEstados($ultPag, $primPag)
})


$ultPag.addEventListener('click', async (e) => {
    document.querySelector('table').remove();
    const rpPag = await consultaPag(pagina);

    pagina = rpPag.last

    let $table = await createTable(pagina);
    $formulario.parentNode.insertBefore($table, $formulario.nextElementSibling);

    console.log([rpPag.prev, rpPag.next]);

    cambiarEstados($pag1, $pag2)
    cambiarEstados($primPag, $ultPag)

})