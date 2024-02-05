//Variable de la url de la api 

const url = 'https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes'  

let datos = []

let habilitar = false  

//Funcion para crear un nuevo cliente 
const cedulaNoRegistrada = ()=>{ 
    
    //Declaracion de variables para obtener el valor de cada input
    const valorNombre = document.querySelector('#nombre').value
    const valorApellido = document.querySelector('#apellido').value
    const valorTipoCedula = document.querySelector('#tipo-doc').value
    const valorCedula = document.querySelector('#cedula').value
    const valorCelular = document.querySelector('#celular').value
    const valorCorreo = document.querySelector('#correo').value
    const valorDepartamento = document.querySelector('#departamento').value
    const valorMunicipio = document.querySelector('#municipio').value
    const valorDireccion = document.querySelector('#direccion').value
    const fechaNacimiento = document.querySelector('#fecha_nacimiento').value 
    const natu = natural.value 
    const juri = juridica.value  
    
    //Formatos JSON para enviar el post a la base de datos
    const celular = valorCelular.toString(); 
    //JSON para regimen de persona natural
    const objetoJSON = {
        // Added_User: addedUser,
        Nombre: valorNombre, 
        Primer_Apellido: valorApellido,  
        Tipo1: valorTipoCedula, 
        Documento: valorCedula, 
        Celular: celular, 
        Correo: valorCorreo,  
        Retenedor: "No", 
        Fecha_de_Nacimiento: fechaNacimiento, 
        Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos : "Si",
        Departamento1: idDepartamento, 
        Municipio: idMunicipio, 
        Regimen: natu, 
        Estado: "Activo",
        Cupo: 0, 
        Tipo: "Detal", 
        Dias: 0, 
        location : {
            country2: "Colombia", 
            address_line_12: valorDireccion, 
            state_province2: valorDepartamento, 
            district_city2: valorMunicipio, 
            postal_Code2: "05001" 
        }
        
    } 
    //JSON para regimen de persona juridica
    const objetoJSON2 = {
        // Added_User: addedUser, 
        Nombre: valorNombre, 
        Primer_Apellido: valorApellido,  
        Tipo1: valorTipoCedula, 
        Documento: valorCedula, 
        Celular: celular, 
        Correo: valorCorreo,  
        Retenedor: "No", 
        Fecha_de_Nacimiento: fechaNacimiento, 
        Acepta_que_la_factura_sea_enviada_por_medios_electr_nicos : "Si",
        Departamento1: idDepartamento, 
        Municipio: idMunicipio, 
        Regimen: juri, 
        Estado: "Activo",
        Cupo: 0, 
        Tipo: "Detal", 
        Dias: 0, 
        location : {
            country2: "Colombia ", 
            address_line_12: valorDireccion, 
            state_province2: valorDepartamento, 
            district_city2: valorMunicipio, 
            postal_Code2: "05001" 
        }
        
    }
    
    const personaNatural ={
        method: 'POST', 
        headers : {
            'Content-Type' : 'application/json', 
        }, 
        
        body: JSON.stringify(objetoJSON)
    }; 
    
    const personaJuridica ={
        method : 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        }, 

        body: JSON.stringify(objetoJSON2)
    }; 
    if(natural.checked){ 
        try{
            fetch(url, personaNatural)
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta', data)
                Swal.fire({
                    icon: "success", 
                    title: "LISTO",
                    text: "Ya estas creado en nuestra base de datos",
                    footer: '<a href="https://www.theberryfields.com/">Vuelve a tu compra</a>'   
                });

                setTimeout(()=>{
                    window.location.href = "https://www.theberryfields.com/"
                }, 4000) 

            })
            .catch(error => {
                console.error('Fallo en la solicitud', error)
                Swal.fire({
                    icon: "error", 
                    title: "Error",
                    text: "Lo sentimos hay un fallo con tu inscripcion en nuestra base de datos",
                });
            })
        }
        catch(error){
            console.error('Error', error) 
        }
    }

    if(juridica.checked){
        try{
            fetch(url, personaJuridica)
            .then(response => response.json()) 
            .then(data => {
                datos = data 
                console.log('Respuesta', data)
            })
        
            .catch(error => {
                console.error('Fallo en la solicitud', error)
                Swal.fire({
                    icon: "error", 
                    title: "Error",
                    text: "Lo sentimos hay un fallo con tu inscripcion en nuestra base de datos",
                });
            })

        }catch(error){
            console.error('error', error) 
        }
    }

}

//Evento para enviar el post 
boton.addEventListener('click', ()=>{ 

    URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Clientes_Report?max=1000&where=Documento=="${Documento}"` 

    const validacionCedula = ()=>{
    fetch(URL_API_Reporte_Clientes)
    .then(response => response.json())
    .then(data =>{

        if (data['status'] === 400) {
            cedulaNoRegistrada() 
        }else{
            cedulaRegistrada()
        }
    })
    
    .catch(error =>{
        console.error('Fallo en la peticion', error) 
    })

    }
    validacionCedula() 
})

//Funcion cuando ya se esta registrado en la base de datos de clientes 
const cedulaRegistrada = ()=>{
    Swal.fire({
        icon: "error", 
        title: "Error",
        text: "Ya estas en nuestra base de datos",
        footer: '<a href="https://www.theberryfields.com/">Regresar al pedido</a>'  
    });
}

//Capturar el valor de la cedula para realizar la busqueda en la api de clientes 
let Documento = []

cedula.addEventListener('keyup', ((e)=>{ 
    const cedula = e.target.value
    Documento = cedula
})) 


let Municipios = [] 

let URL_MUNI = "https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Municipio1" 

const muniBusqueda = ()=>{
    fetch(URL_MUNI)
    .then(response => response.json())
    .then(data =>{
        Municipios = data 
    })
}

muniBusqueda(); 


municipio.addEventListener('keyup', (e)=>{


    const value = e.target.value 
    const busqueda = Municipios.filter(muni => muni.Municipio.toLowerCase().includes(value.toLowerCase())) 

    const containerMun = document.querySelector('.municipio')

    containerMun.classList.remove('hidden-mun')

    let NombreMun = []
    let Departamento = []

    busqueda.forEach(nombre =>{
        NombreMun = nombre.Municipio 
        Departamento = nombre.Departamento 
    })

    let inputMun = document.querySelector('.municipio')

    let newMun = document.createElement('div')  

    newMun.classList.add('nombreMuni') 

    inputMun.innerHTML = `
        <div class="NombreMun"> ${NombreMun} </div>  


    `
    const nombreMun = document.querySelector('.NombreMun') 
    
    nombreMun.addEventListener('click', ()=>{

        const valorMun = document.querySelector('.locationMun') 

        valorMun.innerHTML = ` 
        <i class="material-icons">location_city</i> 
        <em>Municipio </em> 
        <input type="text" name="Municipio" id="municipio" value="${NombreMun}"> 
        <span></span>  
        `
        const containerMun = document.querySelector('.municipio')

        containerMun.classList.add('hidden-mun')

        Buscar = NombreMun;  

        const valorDep = document.querySelector('.locationDep')

        valorDep.innerHTML = `
        <i class="material-icons">public</i> 
        <em class="departamento">Departamento </em>  
        <input type="text" name="Departamento" id="departamento" value="${Departamento}">  
        <span></span> 
        `
    
    });  
}); 


let Buscar = [] 
//Funcion para traer los municipios 
municipio.addEventListener('keyup', (e)=>{ 
    
    Buscar = e.target.value 

    URL_REPORT_MUNICIPIOS = URL_API_Reporte_Clientes = `https://nexyapp-f3a65a020e2a.herokuapp.com/zoho/v1/console/Municipio1?where=Municipio.contains("${Buscar}")` 

    const busquedaMunicipios = ()=>{
        fetch(URL_REPORT_MUNICIPIOS)
        .then(response => response.json())
        .then(data => {
            mun = data; 

            recorrido(mun)
        })
        .catch(error =>{
            console.error(error) 
        })
    }
    busquedaMunicipios(); 

}) 

//Funcion para traer el id del municipio dependiendo del departamento 

let idMunicipio = []

let idDepartamento =[] 


const recorrido = ()=>{
    mun.forEach(municipio =>{

        idMunicipio = municipio.ID 

        idDepartamento = municipio.ID

    }) 
}