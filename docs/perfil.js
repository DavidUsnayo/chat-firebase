import { eliminarUsuario , editar, upload,downloadURL} from '../chat-firebase.js'

let yo = JSON.parse(localStorage.getItem('miCuenta'))
console.log('you: ', yo)

let dia = document.querySelector('.dialog')
img_superior.addEventListener('click',function(){
    console.log('dia')
    dia.showModal()
    text_des.removeAttribute("disabled")
})

let actualizar = document.querySelector('.actualizar_perfil')
export function colocarDatosAlPerfil(usuario,imagen,descripcion){
    let caja = document.querySelector('.caja_datos_profile')
        caja.innerHTML = `
        <div class="image_profile"> <img src="${imagen}" id="us"> <label id="ed"> <input id="uno" type="file" accept=".jpg,.png"> ✎</label> </div>
        <div class="descripcion">
            <h2>${usuario} </h2>
            <input disabled type="text" value="${descripcion ? descripcion : 'Estoy usando chat'} " id="text_des" maxlength="35">
        </div>
    `
    uno.addEventListener('change', () => {
        let nuevo = uno.files[0]
        let linkLocal = URL.createObjectURL(nuevo)
        us.src = linkLocal
        img_superior.src = linkLocal
        console.log(nuevo)
        actualizar.addEventListener('click', async() => {
            await upload(nuevo)
            console.log('la URI: ', downloadURL)
            editar(yo.id, {descripcion:text_des.value,imagen:downloadURL})
            let e = JSON.parse(localStorage.getItem('miCuenta'))
            e.descripcion = text_des.value
            e.imagen = downloadURL
            localStorage.setItem('miCuenta',JSON.stringify(e))
        })   
    })

    text_des.addEventListener('change', () => {
        actualizar.addEventListener('click', async() => {
            editar(yo.id, {descripcion:text_des.value})
            let e = JSON.parse(localStorage.getItem('miCuenta'))
            e.descripcion = text_des.value
            localStorage.setItem('miCuenta',JSON.stringify(e))
            actual.style.animation='3s actualizar'
            setTimeout(() => {actual.style.animation='none'},3000);
        })
    })

}
yo ? colocarDatosAlPerfil(yo.usuario,yo.imagen,yo.descripcion) : null



let cerrarModal = document.querySelector('.blue p')
cerrarModal.addEventListener('click', () => dia.close())

cerrarSesion.addEventListener('click',() => {
    console.log('cerrar')
    localStorage.removeItem('miCuenta')
})

export function deleteUsuario(id){
    let si = document.querySelector('.si')
    si.addEventListener('click', () => {
        console.log('si borrar')
        eliminarUsuario(id)
        localStorage.removeItem('miCuenta')
        caja.style.display='flex'
        no.style.bottom='-200px'
        dia.close()

    })
}
yo ? deleteUsuario(yo.id) : null

let no = document.querySelector('.no')
let seguridad = document.querySelector('.seguridad')

eliminarCuenta.addEventListener('click',(e) => {
    e.preventDefault()
    seguridad.style.bottom='0px'
    setTimeout(()=>{
        seguridad.style.bottom='-200px'
    },3000)
})
no.addEventListener('click',() => {
    seguridad.style.bottom='-200px'
})




