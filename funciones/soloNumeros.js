export function SoloNumeros(e) {
    /^[0-9 ]$/.test(e.key) && (e.keyCode >= 48 && e.keyCode <= 57) ? console.log(e.target.id) : e.preventDefault();
}
