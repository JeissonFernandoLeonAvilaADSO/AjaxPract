export default function BotonMod(url, data){
    const btn = document.createElement('button')
    const imgButton = document.createElement('img');
    imgButton.setAttribute('src', url);
    btn.appendChild(imgButton)
    btn.classList.add('formulario__formButton')
    btn.setAttribute('id', data.id)

    btn.addEventListener('click', (e)=> {

        document.querySelector('#Nombre').value = data.Nombre
        document.querySelector('#Apellido').value = data.Apellido
        document.querySelector('#Direccion').value = data.Direccion
        document.querySelector('#Tell').value = data.Telefono
        document.querySelector('#TipoDoc').value = data["Tipo de Documento"]
        document.querySelector('#Correo').value = data.Correo
        document.querySelector('#Documento').value = data.Documento
    })

    return btn
}