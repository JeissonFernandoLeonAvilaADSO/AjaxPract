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
  
