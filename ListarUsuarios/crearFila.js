import BotonMod from "./botonModificar.js";

export function crearFila(item, keys, dataTipoDoc) {
    const row = document.createElement('tr');
    row.setAttribute('id', item.id);
    
    keys.forEach((key) => {
        const cell = document.createElement('td');
        if (key === "Tipo de Documento") {
            const tipoDoc = dataTipoDoc.find(doc => doc.id === item[key]);
            cell.textContent = tipoDoc ? tipoDoc.tipoDoc : "Desconocido";
        } else {
            cell.textContent = item[key];
        }
        row.appendChild(cell);
    });

    let btnMod = BotonMod('../icons/BuscarIcon.svg', item.id, 0);
    let btnDel = BotonMod('../icons/BorrarIcon.svg', item.id, 1);

    let modCell = document.createElement('td');
    modCell.appendChild(btnMod);
    row.appendChild(modCell);

    let delCell = document.createElement('td');
    delCell.appendChild(btnDel);
    row.appendChild(delCell);

    return row;
}