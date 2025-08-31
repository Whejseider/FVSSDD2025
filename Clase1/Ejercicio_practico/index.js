import {lista_personas} from "./constants.js";

function masViejo(personas) {
    let edad = 0, persona = null;
    for (const p of personas) {
        if (p.edad > edad) {
            edad = p.edad;
            persona = p;
        }
    }
    return persona;
}

function masAlto(personas) {
    let altura = 0, persona = null;
    for (const p of personas) {
        if (p.altura > altura) {
            altura = p.altura;
            persona = p;
        }
    }
    return persona;
}

function mostrarResultados(personas) {
    const personaMasVieja = masViejo(personas);
    const personaMasAlta = masAlto(personas);

    console.log(`De todas las personas, ${personaMasVieja.nombre_completo} es la más vieja y tiene ${personaMasVieja.edad} años.`);
    console.log(`De todas las personas, ${personaMasAlta.nombre_completo} es la más alta y mide ${personaMasAlta.altura}m.`);
}

mostrarResultados(lista_personas);