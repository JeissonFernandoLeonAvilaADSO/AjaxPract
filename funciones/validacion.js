export function validacion(evt, selector) {
    const valor = selector.value.trim();
    selector.classList.toggle('error', valor === '');
    selector.classList.toggle('correcto', valor !== '');
};
