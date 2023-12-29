import {crearUsuario, mostrarUsuarios, existeContrasena, obtenerUsuarioPorContrasena, persona} from '../chat-firebase.js'
import {colocarDatosAlPerfil, deleteUsuario} from '../docs/perfil.js'
export let yo = {
    id:1,
    usuario:'David',
    contraseña: 'galaxy',
    imagen: ''
}

//LocalStorage
yo = JSON.parse(localStorage.getItem('miCuenta'))
yo ? caja.style.display='none' : caja.style.display='flex' //existe una cuenta registrada?

yo ? perfilArriba(yo.usuario, yo.imagen) : yo = {id:1,usuario:'David',contraseña: 'galaxy',imagen: ''}

let perfil_imagen = document.querySelectorAll('.perfil_imagen')
perfil_imagen.forEach((p) => {
    p.addEventListener('click',function(){
        foto.src = p.getAttribute('data-url')
        foto.setAttribute('data',p.getAttribute('data-url'))
    })
})

let caja_flex = document.querySelector('.caja_flex')
let boton_sesion = document.querySelector('.boton_sesion')
boton_sesion.addEventListener('click',function(){
    caja_flex.style.transform='translate(-440px,0px)'
})
let boton_crear = document.querySelector('.boton_crear')
boton_crear.addEventListener('click',function(){
    caja_flex.style.transform='translate(0px,0px)'
})

let boton_registrar = document.querySelector('.boton_registrar')
boton_registrar.addEventListener('click',function(){
    if(nombre_crear.value == '' || pass_crear.value == ''){
        console.log('Llenar los campos')
    }else{
        existeContrasena(pass_crear.value)
        .then((existe) => {
            if (existe) {
                console.log("La contraseña ya existe en la base de datos.");
                contraExiste.style.opacity='90%'
                setTimeout(()=>{
                    contraExiste.style.opacity='0%'
                },2000)
            } else {
                console.log("La contraseña no existe en la base de datos.");
                crearUsuario(nombre_crear.value,pass_crear.value,foto.getAttribute('data'))
                perfilArriba(nombre_crear.value,foto.getAttribute('data'))
                obtenerUsuarioPorContrasena(pass_crear.value)
                .then((id) => {
                    if (id !== null) {
                        console.log(`El ushuario coons: ${pass_login.value} tiene el idin: ${id}.`);
                        persona(id)
                        .then(data => {
                            let lista = data.data()
                            yo = {
                                id:id,
                                usuario: lista.nombre,
                                contraseña: lista.contraseña,
                                imagen: lista.imagen,
                                descripcion:''
                            }
                            localStorage.setItem('miCuenta',JSON.stringify(yo))
                            console.log('texto two: ', localStorage.getItem('miCuenta'))

                            //datos perfil superior
                            perfilArriba(yo.usuario,yo.imagen)
                            colocarDatosAlPerfil(yo.usuario,yo.imagen)
                            deleteUsuario(yo.id)
                            let un = document.querySelectorAll('.usuario')
                                un.forEach(function(u){
                                console.log('los usuaritos: ', u)
                                let cod = u.getAttribute('data-id')
                                if(cod == yo.id){
                                    u.remove()
                                }
                            })
                        })
                    }else{
                        console.log('no encontrao')
                    }
                })
                nombre_crear.value = ''
                pass_crear.value = ''
                caja.style.display='none'
            }
        });
        console.log(nombre_crear.value,pass_crear.value,foto.src)
    }
})


//LOGIN
let boton_entrar = document.querySelector('.boton_entrar')
boton_entrar.addEventListener('click',function(){
    if(nombre_login.value == '' || pass_login.value == ''){
        console.log('Llenar los campos')
    }else{
        obtenerUsuarioPorContrasena(pass_login.value)
        .then((id) => {
            if (id !== null) {
                console.log(`El usuario con la contraseña ${pass_login.value} tiene el ID ${id}.`);
                caja.style.display='none'
                persona(id)
                .then(data => {
                    let lista = data.data()
                    yo = {
                        id:id,
                        usuario: lista.nombre,
                        contraseña: lista.contraseña,
                        imagen: lista.imagen,
                        descripcion:''
                    }
                    localStorage.setItem('miCuenta',JSON.stringify(yo))
                    //datos perfil superior
                    perfilArriba(yo.usuario,yo.imagen)
                    colocarDatosAlPerfil(yo.usuario,yo.imagen)
                    deleteUsuario(yo.id)
                    let un = document.querySelectorAll('.usuario')
                        un.forEach(function(u){
                            console.log('los usuaritos: ', u)
                            let cod = u.getAttribute('data-id')
                            if(cod == yo.id){
                                u.remove()
                            }
                        })
                })
            
            } else {
                console.log(`No se encontró ningún usuario con la contraseña ${pass_login.value}.`);
                contraMal.style.opacity='90%'
                setTimeout(()=>{
                    contraMal.style.opacity='0%'
                },2000)
            }
        });

    }
})

let heads = document.querySelectorAll('#caras p')
heads.forEach((h) => {
    h.addEventListener('click', () => {
        texto.value += h.textContent
    })
})

function perfilArriba(name,foto){
    name_superior.textContent = name
    img_superior.src = foto
}