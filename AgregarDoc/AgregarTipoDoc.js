
import { ObtenerTipoDocs } from "./ObtenerTiposDocs.js";

export async function AgregarTipoDoc(tipoDoc) {
  try {
    const tiposDoc = await ObtenerTipoDocs();
    const nuevoId = `${tiposDoc.length + 1}`;

    const response = await fetch('http://localhost:3000/TipoDocData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        id: nuevoId,
        tipoDoc: tipoDoc
      })
    });

    if (!response.ok) {
      throw new Error(`Error al agregar tipo de documento: ${response.statusText}`);
    }

    const data = await response.json();
    alert(`Tipo de documento agregado: ${tiposDoc[nuevoId].tipoDoc}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

