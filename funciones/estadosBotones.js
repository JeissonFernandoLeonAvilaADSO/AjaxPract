export function desHabilitarBoton(boton){
    boton.classList.add('disabled')
    boton.setAttribute('disabled', '')
}

export function habilitarBotn(boton){
    boton.classList.remove('disabled')
    boton.removeAttribute('disabled', '')
}

export function cambiarEstados(botonActivar, botonDesactivar){
    habilitarBotn(botonActivar)
    desHabilitarBoton(botonDesactivar)
}

export function uncheckBoton(boton){
    boton.setAttribute('disabled', '');
    boton.classList.add('uncheck');
}

export function checkBoton(boton){
    boton.classList.remove('uncheck');
    boton.removeAttribute('disabled', '');
}