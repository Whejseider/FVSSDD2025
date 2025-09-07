import axios from "axios";

const URL_USUARIOS = 'https://jsonplaceholder.typicode.com/users';
const URL_PUBLICACIONES = 'https://jsonplaceholder.typicode.com/posts?userId=';

let listaUsuarios = [];

/**
 * Obtiene la lista de usuarios (maximo 10)
 * @returns {Promise<any>} lista de usuarios
 */
async function obtenerListaUsuarios() {
    try {
        let response = await axios.get(URL_USUARIOS);
        return await response.data;
    } catch (e) {
        console.log("Error al obtener la lista de usuarios.");
    }
}

/**
 * Obtiene la cantidad de publicaciones de un usuario por id
 * @param id - El id del usuario
 * @returns {Promise<number|*>} - La cantidad de publicaciones
 */
async function obtenerCantidadDePublicaciones(id) {
    try {
        let response = await axios.get(`${URL_PUBLICACIONES}${id}`);
        let result = await response.data;
        return result.length;
    } catch (e) {
        console.log("Error al obtener la cantidad de publicaciones del usuario.");
        return 0;
    }
}

async function ejecucionSecuencial() {
    console.time(`Secuencial`);
    try {
        console.log(`--- Ejecucion Secuencial ---`);
        // Obtener lista de usuarios y guardarla en la variable global
        listaUsuarios = await obtenerListaUsuarios();
        // Obtener los primeros 3 usuarios
        const primerosTresUsuarios = listaUsuarios.slice(0, 3);
        // Obtener numero de publicaciones secuencialmente
        for (const u of primerosTresUsuarios) {
            const cantPublicaciones = await obtenerCantidadDePublicaciones(u.id);
            console.log(`${u.name} tiene ${cantPublicaciones} publicaciones.`);
        }
    } catch (e) {
        console.log("Error al ejecutar de forma secuencial.");
    }
    console.timeEnd(`Secuencial`);
}

async function ejecucionParalela() {
    console.time(`Paralela`);

    try {
        console.log(`--- Ejecucion Paralela ---`);
        // Obtener lista de usuarios y guardarla en la variable global
        listaUsuarios = await obtenerListaUsuarios();
        // Obtener los primeros 3 usuarios
        const primerosTresUsuarios = listaUsuarios.slice(0, 3);
        // Obtener las promesas
        const promesasPublicaciones = primerosTresUsuarios.map(u => {
            return obtenerCantidadDePublicaciones(u.id)
        })
        // Array y esperar a que se ejecuten las promesas
        const cantPublicacionesArray = await Promise.all(promesasPublicaciones);
        // Mostrar en consola
        primerosTresUsuarios.forEach((u, index) => {
            console.log(`${u.name} tiene ${cantPublicacionesArray[index]} publicaciones.`);
        });
    } catch (e) {
        console.log("Error al ejecutar de forma secuencial.");
    }
    console.timeEnd(`Paralela`);
}

ejecucionSecuencial();

// Esto no se si esta bien hacerlo, porque sino me tira las 2 ejecuciones juntas
setTimeout(() => {
    console.log(); // Para formatear (?
    ejecucionParalela();
}, "2000");

