import BotonMod from "./botonModificar.js";

export async function createTable() {
    let response = await fetch('http://localhost:3000/users');
    let data = await response.json();

    let rpTipoDoc = await fetch('http://localhost:3000/TipoDocData');
    let dataTipoDoc = await rpTipoDoc.json();
    
    let fragment = document.createDocumentFragment();
    let table = (document.querySelector('#FirstTableTempate')).content.cloneNode(true).querySelector('table');
    let tbody = table.querySelector('tbody');

    table.setAttribute('id', 'tabla');
    table.classList.add('tabla');
    let header = table.querySelectorAll('thead > tr > th');

    const keys = Object.keys(data[0]);
    keys.forEach((key, index) => {
        header[index].textContent = key;
    });

    data.forEach((item) => {
        const row = tbody.querySelector('tr').cloneNode(true);
        keys.forEach((key, index) => {
            if (key === "Tipo de Documento") {
                const tipoDoc = dataTipoDoc.find(doc => doc.id === item[key]);
                row.children[index].textContent = tipoDoc ? tipoDoc.tipoDoc : "Desconocido";
            } else {
                row.children[index].textContent = item[key];
            }
        });

        

        let btnMod = BotonMod('../icons/BuscarIcon.svg', item);
        let btnDel = BotonMod('../icons/BorrarIcon.svg', item);

        row.children[row.children.length - 2].appendChild(btnMod);
        row.children[row.children.length - 1].appendChild(btnDel);

        tbody.appendChild(row);
    });

    fragment.appendChild(table);
    return fragment;
}


export function crearFila(data){
    let table = (document.querySelector('#FirstTableTempate')).content.cloneNode(true).querySelector('table')
    let row = table.querySelector('tbody > tr')
    data.forEach(item => {
        let rowC = row.cloneNode(true)
        
        for (let index = 0; index < Object.values(item).length; index++) {
            rowC.children[index].textContent = Object.values(item)[index];
        }
        tbody.appendChild(rowC);
    });
    return row

}
  