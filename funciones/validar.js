export function validar(evt, ListaSelectores){
    let valid;
    ListaSelectores.forEach((selector) => {
        if (selector.value.trim() === '') {
            selector.classList.add('error');
            selector.classList.remove('correcto');
            console.log(`${selector.name} esta vacio`);
            valid = false

        } else {
            selector.classList.remove('error');
            selector.classList.add('correcto');
            valid = true
        }
    });
    return valid
};