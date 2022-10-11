//Let Funcion Iniciar Juego
const sectionSeleccionarAtaque = document.getElementById('Seleccionar-Ataque')
const sectionReiniciar = document.getElementById('Reiniciar')
const botonMascotaJugador = document.getElementById('Boton-Mascota')
const botonReiniciar = document.getElementById('Boton-Reiniciar')
sectionReiniciar.style.display = 'none'

//Let Funcion SeleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById('Seleccionar-Mascota')
const spanMascotaJugador = document.getElementById('Mascota-Jugador')
        //imagen de las mascotas en batalla
const insertMascotaJugador = document.getElementById("insertar-mascota-jugador")
const insertMascotaEnemigo = document.getElementById("insertar-mascota-enemigo")

//Let Funcion seleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById ('Mascota-Enemigo')

//Let Funcion combate
const spanVidasJugador = document.getElementById('Vidas-Jugador')
const spanVidasEnemigo = document.getElementById('Vidas-Enemigo')

//Let Funcion crearMensajeFinal
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonHierba
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let fotoJugador
let fotoEnemigo

class Mokepon {
        constructor(nombre, foto, vida) {
                this.nombre = nombre
                this.foto = foto
                this.vida = vida
                this.ataques = []
        }
}

let hipodoge = new Mokepon ('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.webp', 5)
let capipepo = new Mokepon ('Capipepo', './assets/mokepons_mokepon_capipepo_attack.webp', 5)
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5)

hipodoge.ataques.push(
        {nombre: '💧', id: 'Boton-Agua'},
        {nombre: '💧', id: 'Boton-Agua'},
        {nombre: '💧', id: 'Boton-Agua'},
        {nombre: '🔥', id: 'Boton-Fuego'},
        {nombre: '🌱', id: 'Boton-Hierba'},
)

capipepo.ataques.push(
        {nombre: '🌱', id: 'Boton-Hierba'},
        {nombre: '🌱', id: 'Boton-Hierba'},
        {nombre: '🌱', id: 'Boton-Hierba'},
        {nombre: '🔥', id: 'Boton-Fuego'},
        {nombre: '💧', id: 'Boton-Agua'},
)

ratigueya.ataques.push(
        {nombre: '🔥', id: 'Boton-Fuego'},
        {nombre: '🔥', id: 'Boton-Fuego'},
        {nombre: '🔥', id: 'Boton-Fuego'},
        {nombre: '💧', id: 'Boton-Agua'},
        {nombre: '🌱', id: 'Boton-Hierba'},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego () {
    
    sectionSeleccionarAtaque.style.display = 'none'
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
                <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>        
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
                `
    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')

    })

    botonMascotaJugador.addEventListener('click', SeleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function SeleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputHipodoge.checked) {
            spanMascotaJugador.innerHTML = inputHipodoge.id  
            mascotaJugador = inputHipodoge.id
            fotoJugador = `<img
            src = ${hipodoge.foto}
            alt = ${hipodoge.nombre}>
            `
            insertMascotaJugador.innerHTML = fotoJugador

    }   else if (inputCapipepo.checked) {
            spanMascotaJugador.innerHTML = inputCapipepo.id
            mascotaJugador = inputCapipepo.id
            fotoJugador = `<img
            src = ${capipepo.foto}
            alt = ${capipepo.nombre}>
            `
            insertMascotaJugador.innerHTML = fotoJugador

    }   else if (inputRatigueya.checked) {
            spanMascotaJugador.innerHTML = inputRatigueya.id
            mascotaJugador = inputRatigueya.id
            fotoJugador = `<img
            src = ${ratigueya.foto}
            alt = ${ratigueya.nombre}>
            `
            insertMascotaJugador.innerHTML = fotoJugador

    }   else {
            alert('Selecciona a una mascota')
            reiniciarJuego()
    }
        extraerAtaques(mascotaJugador)
        seleccionarMascotaEnemigo ()
}

function extraerAtaques(mascotaJugador) {
        let ataques
        for (let i = 0; i < mokepones.length; i++) {
                if (mascotaJugador === mokepones[i].nombre) {
                        ataques = mokepones[i].ataques
                }
        }
        mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
        ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
        })

        botonFuego = document.getElementById('Boton-Fuego')
        botonAgua = document.getElementById('Boton-Agua')
        botonHierba = document.getElementById('Boton-Hierba')
        botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
        botones.forEach((boton) => {
                boton.addEventListener('click', (e) => {
                        if (e.target.textContent === '🔥') {
                                ataqueJugador.push('FUEGO')
                                console.log(ataqueJugador)
                                boton.style.background = '#112f58'
                                boton.disabled = true
                        } else if (e.target.textContent === '💧') {
                                ataqueJugador.push('AGUA')
                                console.log(ataqueJugador)
                                boton.style.background = '#112f58'
                                boton.disabled = true
                        } else {
                                ataqueJugador.push('HIERBA')
                                console.log(ataqueJugador)
                                boton.style.background = '#112f58'
                                boton.disabled = true
                        }
                        ataqueAleatorioEnemigo()
                })
        })
}

function seleccionarMascotaEnemigo () {
        let mascotaAleatoria = aleatorio(0, mokepones.length -1)
        
       spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
       fotoEnemigo = `<img
            src = ${mokepones[mascotaAleatoria].foto}
            alt = ${mokepones[mascotaAleatoria].nombre}>
            `   
            insertMascotaEnemigo.innerHTML = fotoEnemigo
        
        ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques

        secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
        let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

        if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
                ataqueEnemigo.push('FUEGO')
        } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
                ataqueEnemigo.push('AGUA')
        } else {
                ataqueEnemigo.push('HIERBA')
        } 
        console.log(ataqueEnemigo)
        iniciarPelea()
}

function iniciarPelea() {
        if (ataqueJugador.lenght === 5) {
                combate()
        }
}

function indexAmbosOponente(jugador, enemigo) {
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

        for (let index = 0; index < ataqueJugador.length; index++) {
                if (ataqueJugador[index] === ataqueEnemigo[index]) {
                        indexAmbosOponente(index, index)
                        crearMensaje("Empataste 🤣")
                } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'HIERBA'){
                        indexAmbosOponente(index, index)
                        crearMensaje("Ganaste!")
                        victoriasJugador++
                        spanVidasJugador.innerHTML = victoriasJugador
                } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
                        indexAmbosOponente(index, index)
                        crearMensaje("Ganaste!")
                        victoriasJugador++
                        spanVidasJugador.innerHTML = victoriasJugador
                } else if (ataqueJugador[index] === 'HIERBA' && ataqueEnemigo[index] === 'AGUA'){
                        indexAmbosOponente(index, index)
                        crearMensaje("Ganaste!")
                        victoriasJugador++
                        spanVidasJugador.innerHTML = victoriasJugador
                } else {
                        indexAmbosOponente(index, index)
                        crearMensaje("Perdiste!")
                        victoriasEnemigo++
                        spanVidasEnemigo.innerHTML = victoriasEnemigo
                }
        }
    revisarVidas ()
}

function revisarVidas() {
        if (victoriasJugador === victoriasEnemigo) {
                crearMensajeFinal("Esto fue un empate 😒")
        } else if (victoriasJugador > victoriasEnemigo) {
                crearMensajeFinal("Felicitaciones Ganaste! 🏆")
        } else {        
                crearMensajeFinal("Que pena, Perdiste! 😭")
        }
}

function crearMensaje(resultado) {

        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML = resultado
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador     
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
        
        sectionMensajes.innerHTML = resultadoFinal
        sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
        location.reload()
}

function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)