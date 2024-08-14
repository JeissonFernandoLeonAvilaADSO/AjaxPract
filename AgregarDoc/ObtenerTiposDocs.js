export async function ObtenerTipoDocs(){
    let response = await fetch('http://localhost:3000/TipoDocData')
    let data = await response.json()
    let arr = Object.values(data)
    return arr
}