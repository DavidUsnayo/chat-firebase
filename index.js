import {upload,eliminar,mostrarUsuarios,insertar, mostrarMensajes, downloadURL} from './chat-firebase.js'
import {yo} from './docs/registro.js'
let caja_mensajes = document.querySelector('.caja_mensajes')

// let yo = {
//     id:1,
//     usuario:'David',
//     contraseña: 'galaxy',
//     imagen: ''
// }
let tu = {id:0}

//aun con fallas mensaje a uno y le llega a otro 
mostrarUsuarios(function(query){
    let all = document.querySelector('.all')
    all.innerHTML = ''
    query.forEach(function(doc){
        let datos = doc.data()
        if(doc.id == yo.id){
            
        }
        else{
            all.innerHTML += `
                    <div class="usuario" data-id="${doc.id}">
                        <div class="img_u">
                            <img src="${datos.imagen}">
                        </div>
                        <div class="name_u">
                            <h3>${datos.nombre} </h3>
                            <p>${datos.descripcion} </p>
                        </div>
                    </div>
            `
            }
            let usuario = document.querySelectorAll('.usuario')
            usuario.forEach(function(u){
                u.addEventListener('click',function(){
                    texto.value = ''
                    caja_mensajes.style.display='block'
                    let id = u.getAttribute('data-id')
                    console.log(u.children[1].children[0].textContent)
                    nombre_info.textContent = u.children[1].children[0].textContent
                    imagen_info.src = u.children[0].children[0].src

                    tu = {id:id}
                    console.log(tu)
                    mostrarMensajes(yo.id,id,function(query){
                        mensajeria.innerHTML = ''
                        query.forEach(function(data){
                            let datos = data.data()
                            let existe = datos.img == ''
                            mensajeria.innerHTML += `
                                <div data-id="${data.id}" class="${datos.emisor == yo.id? 'mess yo':'mess tu'} ">
                                    ${existe ? '' :`<img src=${datos.img}>`}
                                    <p>${datos.sms} </p>
                                </div>
                                `
                            mensajeria.scrollTop = mensajeria.scrollHeight;
                            let mess = document.querySelectorAll('.mess')
                            mess.forEach(function(m){
                                m.addEventListener('dblclick',function(){
                                let p = document.createElement('img')
                                p.src = './assets/icons8-basura-100.png'
                                p.classList.add('delete_coment')
                                m.append(p)
                                console.log('doble click DELETE sms')
                                let doc = m.getAttribute('data-id')
                                p.addEventListener('click',() => {
                                    eliminar(doc)
                                })
                            })
                            })
                            
                        
                        })
                        
                    })
                    
                })
            })
            
    })
})
let imagenURL = ''
let file;    //esto del file una vez que se asigna esta ahi / y se sube solo eso 
archivo.addEventListener('change',function(e){
    file = archivo.files[0];
    imagenURL = URL.createObjectURL(file);
    imagenCargada.src = imagenURL
    imagenCargada.style.display='block'
})    //quisa es mejon con funcion y asi usar dos veces

form_message.addEventListener('submit',function(e){
    e.preventDefault()
        if(texto.value == '' ){

        }else{
            (async ()=> {
                file == undefined ? file = undefined : await upload(file)
                console.log('sending ', yo.id, tu.id,texto.value,downloadURL) //aqui ya no funciona el texto
                if(file == undefined){
                    console.log('--este es el usuario: ',yo.usuario)
                    insertar(yo.id,tu.id,texto.value,'',yo.usuario)
                    form_message.reset() 
                }else{
                    console.log('esto el texto:',texto.value)
                    await insertar(yo.id,tu.id,texto.value,downloadURL,yo.usuario)
                    file = undefined
                    form_message.reset()  
                }
            })()
        
        }
        imagenCargada.src = ''
        imagenCargada.style.display='none'
    })    


//JAVACRIPT PURO
let uno = document.querySelectorAll('.uno')
let boton = document.querySelectorAll('.boton')
boton.forEach(function(b,i){
    b.addEventListener('click',function(){
        uno[0].style.display='none'
        uno[1].style.display='none'

        uno[i].style.display='block'
    })
})

back.addEventListener('click',function(){
    caja_mensajes.style.display='none'
})

