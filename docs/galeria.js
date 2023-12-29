
let galeria = document.querySelector('.galeria')
let form = document.querySelector('.form')
let columnUno = document.querySelector('.column_uno')
let columnDos = document.querySelector('.column_dos')

function buscar(search){
    const apiKey = 'WmYIsMUsjPxAma45RL5qbz8faBylSkFNZypb28inJzriYubwb1OoRNG0'
    const apiUrl = `https://api.pexels.com/v1/search?query=${search}&page=${1}&per_page=${20}`

    fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Authorization': apiKey,
    },
    })
    .then(response => response.json())
    .then(data => {
            columnUno.innerHTML = ''
            columnDos.innerHTML = ''
            console.log(data)
            data.photos.forEach(function(item){
                if(columnUno.children.length < 10){
                    columnUno.innerHTML += `
                    <img src='${item.src.large2x}' class="galery_img">
                `
                }else{
                    columnDos.innerHTML += `
                    <img src='${item.src.large2x}' class="galery_img">
                `
                }

                let galery_img = document.querySelectorAll('.galery_img')
                galery_img.forEach((g) => {
                    g.addEventListener('click',function(){
                        imagen_modal.src = g.src
                        modal.showModal()
                        btn_cerrar.style.bottom='0px'
                    })
                })
                btn_cerrar.addEventListener('click', () => {
                    modal.close()
                    btn_cerrar.style.bottom='150px'
                })
                
            })
    })
    .catch(error => console.error('Error:', error))
}


buscar('paisajes')

form.addEventListener('submit',function(e){
    e.preventDefault()
    buscar(entrada.value)
    console.log('buscar')
})