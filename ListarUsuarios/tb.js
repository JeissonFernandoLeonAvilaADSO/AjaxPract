

import { crearFila } from './crearFila.js';

export async function createTable(page) {
    let response = await fetch('http://localhost:3000/users?_page=' + page);
    let data = (await response.json()).data;
    console.log(data);
    
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
        const row = crearFila(item, keys, dataTipoDoc);
        tbody.appendChild(row);
    });

    fragment.appendChild(table);
    return fragment;
}



  