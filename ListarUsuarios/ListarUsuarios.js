import { createTable } from "./tb.js"


const $body = document.querySelector('body')
const $title = document.querySelector('#title')
const back = document.querySelector('#Back')


async function sd() {
    const $table = await createTable()
    $title.parentNode.insertBefore($table, $title.nextSibling)
    console.log($table);
}
sd()







  


