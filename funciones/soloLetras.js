export function SoloLetras(e) {
    return !/^[a-zA-Z ]$/.test(e.target.value) && (e.keyCode >= 48 && e.keyCode <= 57) ? e.preventDefault() : console.log(e.target.id);
}