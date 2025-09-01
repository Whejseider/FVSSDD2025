/*
Grupo 3:
Utilizando esta API https://pokeapi.co/api/v2/pokemon/ditto
Hacer script que lea el nombre de un Pokémon por constante y liste las habilidades posibles.
 */

const axios = require('axios').default;

const url = 'https://pokeapi.co/api/v2/pokemon/';

const pokemon = 'Blaziken'; //Lapras, Gengar, Groundon, Pikachu, Celebi, Salamance, Dragonite, etc

async function mustraHabilidades() {
    try {
        const response = await axios.get(url + pokemon);
        if (response.status === 200) {
            const result = response.data.abilities;
            const abilitiesName = result.map(abilityName => abilityName.ability.name);
            console.log(abilitiesName);
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

mustraHabilidades();