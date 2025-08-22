async function getData() {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function getPokemonLocationArea(name) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + name + "/encounters";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}


/*
Todavia no pude hacer esto
 */
try {
    const data = await getData();
    const pokemonNames = data.results.map(pokemon => pokemon.name);
    const locationsPromises = pokemonNames.map(pokemonName => getPokemonLocationArea(pokemonName)
    );
    const pokemonLocations = await Promise.all(locationsPromises);
    console.log(pokemonLocations);
    // console.log(pokemonNames);
    // console.log(data);
} catch (err) {
    console.error("Error al fetchear los datos", err.message);
}