export async function enviarDatos(ListaSelectores) {
    try {
        const data = {};
        ListaSelectores.forEach((element) => {
            data[element.name] = element.value;
        });
        console.log(data);
        
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok){
        alert(`El usuario ${data.Nombre} fue guaradado correctamente`)
      } else {
        alert("No se pudieron cargar los datos")
      }
      
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

export async function traerDatos(id) {
  try {

  const response = await fetch('http://localhost:3000/users/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
  const data = await response.json()
  return data
  
  } catch (error) {
    console.error('Error al traer los datos:', error);
  }
}

export async function EditarDatos(id, datos) {
  try {

    const response = await fetch('http://localhost:3000/users/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(datos)
    })

    if (response.ok) {
      alert(`datos del usuario ${datos.Nombre} fueron actualizados correctamente`)
    } else {
      alert(`Hubo un error al modificar los datos del usuario ${datos.Nombre}`)
    }

  } catch (error) {
    console.error(error);
    
  }
}

export async function BorrarDatos(id) {
  try {
    const response = await fetch('http://localhost:3000/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        }
    })

    if(response.ok){
      alert(`Usuario con id ${id} eliminado correctamente`)
    } else {
      alert(`Hubo un error al eliminar el usuario con id ${id}`)
    }
  } catch (error) {
    console.error(error);
    
  }
}
  
