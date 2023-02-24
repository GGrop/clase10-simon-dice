let secuenciaMaquina = []
let secuenciaJugador = []
let nivel = 0

document.querySelector('#empezar').onclick = function(e){
    empezarJuego()
}


const empezarJuego=()=>{
    ReinciarVariables()
    gestionarRondas()
}

const gestionarRondas=()=>{
    const $cuadradoAleatorio = obtenerCuadradoAleatorio()
    manejarTurnoMaquina($cuadradoAleatorio)
    const DELAY_JUGADOR = secuenciaMaquina.length*1050
    setTimeout(function(){
        turnoJugador()
    },DELAY_JUGADOR)
}

const reiniciarJuego=()=>{
    secuenciaMaquina = []
    secuenciaJugador = []
    document.querySelector('#nivel').textContent = ''
}

const manejarTurnoMaquina=($cuadradoAleatorio)=>{
    const TURNO_MAQUINA_ALERTA = 'Turno de la maquina...'
    estadoDeJuego(TURNO_MAQUINA_ALERTA)
    bloquearJuegoUsuario()
    secuenciaMaquina.push($cuadradoAleatorio)
    ejecucionmanejarTurnoMaquina(secuenciaMaquina)
}

const bloquearJuegoUsuario=()=>{
    document.querySelectorAll('.cuadrado').forEach(function($cuadrado){
        $cuadrado.onclick = function(){
        }
    })
}

const obtenerCuadradoAleatorio=()=>{
    const $cuadrados = document.querySelectorAll('.cuadrado')
    let indice = Math.floor(Math.random()* $cuadrados.length)
    return $cuadrados[indice]
}

const ejecucionmanejarTurnoMaquina=(secuencia)=>{
    secuencia.forEach(function($cuadrado,i){
        let DELAY = 1000*i
        setTimeout(function(){
            resaltar($cuadrado)
        },DELAY)
    })
}

const resaltar=($cuadrado)=>{
    const cuadradoId =`#${$cuadrado.id}`
    document.querySelector(cuadradoId).style.opacity = 1
    setTimeout(function(){
        document.querySelector(cuadradoId).style.opacity = 0.5
    },500)
}

const turnoJugador=()=>{
    secuenciaJugador = []
    const TURNO_JUGADOR_ALERT = 'Es tu turno jugador!'
    estadoDeJuego(TURNO_JUGADOR_ALERT)
    document.querySelectorAll('.cuadrado').forEach(function($cuadrado){
        $cuadrado.onclick = clickUsuario
    })
}

const clickUsuario=(e)=>{
    const $cuadradoUsuario =e.target
    resaltar($cuadradoUsuario)
    secuenciaJugador.push($cuadradoUsuario)
    comparacionSecuencias($cuadradoUsuario)
}

const comparacionSecuencias=($cuadradoUsuario)=>{
    const $cuadradoMaquina = secuenciaMaquina[secuenciaJugador.length-1]
    if($cuadradoMaquina !== $cuadradoUsuario){
        perder()
    }else{
        if(secuenciaMaquina.length === secuenciaJugador.length){
            setTimeout(function(){
                subirDeNivel()
            },1000)
        }
    }
}

const perder=()=>{
    estadoDeJuego('Perdiste :( vuelvelo a intentar!')
    bloquearJuegoUsuario()
    ReinciarVariables()
}

const subirDeNivel=()=>{
    nivel++;
    document.querySelector('#nivel').textContent = nivel
    gestionarRondas()
}

const estadoDeJuego=(texto)=>{
    const $alert = document.querySelector('#estadoDeJuego')
    $alert.classList.add('alert-primary');
        if(/Perdiste/.test(texto)){
            $alert.classList.remove('alert-primary');
            $alert.classList.add('alert-danger');
            $alert.textContent = texto
        } else if(/Ganaste/.test(texto)){
            $alert.classList.remove('alert-primary');
            $alert.classList.add('alert-success');
            $alert.textContent = texto
        } else {
            $alert.textContent = texto
            $alert.classList.remove('alert-danger');
            $alert.classList.add('alert-primary');
        }
    }
