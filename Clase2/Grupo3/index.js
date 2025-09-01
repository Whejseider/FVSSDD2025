/*
Grupo 3:
Utilizando esta API https://pokeapi.co/api/v2/pokemon/ditto
Hacer script que lea el nombre de un Pokémon por constante y liste las habilidades posibles.
 */
import {writeFileSync} from 'fs';
import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = 'Blaziken'; //Lapras, Gengar, Groundon, Pikachu, Celebi, Salamance, Dragonite, etc
const path = './abilities.json';

async function mustraHabilidades() {
    try {
        const response = await axios.get(url + pokemon);
        if (response.status === 200) {
            const result = response.data.abilities;
            const abilitiesName = result.map(abilityName => abilityName.ability.name);
            writeFileSync(path, JSON.stringify(abilitiesName, null , 2), 'utf8');
            console.log('Data successfully saved to disk.');
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}

mustraHabilidades();