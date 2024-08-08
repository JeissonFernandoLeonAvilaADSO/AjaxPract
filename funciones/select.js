import { ObtenerTipoDocs } from "../AgregarDoc/ObtenerTiposDocs.js"

export async function Select() {
  try {
    const fragment = document.createDocumentFragment();
    const select = document.createElement('select');
    const label = document.createElement('label');
    const optionDef = document.createElement('option');
    const TiposDocs = await ObtenerTipoDocs();

    optionDef.value = ''
    optionDef.textContent = 'Seleccione un tipo de documento'
    select.appendChild(optionDef)

    for (let i = 0; i < TiposDocs.length; i++) {
      const option = document.createElement('option');
      option.value = TiposDocs[i].tipoDoc;
      option.textContent = TiposDocs[i].tipoDoc;
      select.appendChild(option);
    }

    label.textContent = "Tipo de documento";
    label.setAttribute('for', 'TipoDoc');
    label.classList.add('formulario__formLabel');

    select.classList.add('formulario__formInput');
    select.setAttribute('name', 'Tipo de Documento');
    select.setAttribute('id', 'TipoDoc');
    select.required = true;

    fragment.appendChild(label); 
    fragment.appendChild(select);

    return fragment;

  } catch (error) {
    console.error('Error al crear el select:', error);
    return null; 
  }
}
