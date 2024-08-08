export function validarCheck(e, ListaSelectores, $submitButton){
    if (!e.target.checked) {
        ListaSelectores.forEach((selector) => {
            selector.classList.add('uncheck');
            selector.disabled = true;
            $submitButton.setAttribute('disabled', '');
            $submitButton.classList.add('uncheck');
            console.log('Formulario InHabilitado');
        }) 
    }else {
        ListaSelectores.forEach((selector) => {
            selector.classList.remove('uncheck');
            selector.disabled = false;
            $submitButton.removeAttribute('disabled', '');
            $submitButton.classList.remove('uncheck');
            console.log('Formulario Habilitado');
        })
    }
}
