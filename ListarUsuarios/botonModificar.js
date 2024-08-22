import { traerDatos, BorrarDatos } from "../funciones/ajax.js";

export default function BotonMod(url, id, tp){
    const btn = document.createElement('button')
    const imgButton = document.createElement('img');
    imgButton.setAttribute('src', url);
    btn.appendChild(imgButton)
    btn.classList.add('formulario__formButton')
    btn.setAttribute('id', id)

    if (tp === 1){
        btn.classList.add('formulario__formButton--borrarBtn')
        btn.addEventListener('click', async (e)=> {
            const data = await traerDatos(id)
            console.log(data);
                const des = confirm(`¿Esta seguro de eliminar el usuario?`)
                if (des) {
                    BorrarDatos(id)
                    document.getElementById(`${id}`).remove()
                }
        })
    }


    btn.addEventListener('click', async (e)=> {
        const data = await traerDatos(id)
        console.log(data);

        if (tp === 0) {
            document.querySelector('#form').setAttribute('iduser', id)

            document.querySelector('#Boton').textContent = "Modificar"
            document.querySelector('#Nombre').value = data.Nombre
            document.querySelector('#Apellido').value = data.Apellido
            document.querySelector('#Direccion').value = data.Direccion
            document.querySelector('#Tell').value = data.Telefono
            document.querySelector('#TipoDoc').value = data["Tipo de Documento"]
            document.querySelector('#Correo').value = data.Correo
            document.querySelector('#Documento').value = data.Documento

        } else if(tp === 1){
            const des = confirm(`¿Esta seguro de eliminar el usuario?`)
            if (des) {
                BorrarDatos(id)
                document.getElementById(`${id}`).remove()
            }
        } else {
            console.log('Boton no encontrado')
        }
    })


    return btn
}