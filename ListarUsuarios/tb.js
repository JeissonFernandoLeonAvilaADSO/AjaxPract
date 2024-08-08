export async function createTable() {
    let response = await fetch('http://localhost:3000/users')
    let data = await response.json()
    console.log(data.length);

    let fragment = document.createDocumentFragment();
    let table = (document.querySelector('#FirstTableTempate')).content.cloneNode(true).querySelector('table')
    let tbody = table.querySelector('tbody')
    console.log(table);

    table.setAttribute('id', 'tabla')
    table.classList.add('tabla')
    let header = table.querySelectorAll('thead > tr > th')

    let row = table.querySelector('tbody > tr')

    for (let i = 0; i < header.length; i++){
        header[i].textContent = Object.keys(data[0])[i];
    }

    data.forEach(item => {
        let rowC = row.cloneNode(true)
        
        for (let index = 0; index < Object.values(item).length; index++) {
            rowC.children[index].textContent = Object.values(item)[index];
        }
        tbody.appendChild(rowC);
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
  