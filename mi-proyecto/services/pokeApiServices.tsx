import axios from "axios";
import { Pokemon, PokemonPropiedades, PokemonSpecies } from "@/lib/types/types";

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Lista pokemon con datos minimos con un limite total a mostrar y su offset
 * @param limit cantidad de pokemon a mostrar
 * @param offset desde donde arranca (pagina?)
 */
export async function fetchPokemonList(limit = 30, offset = 0): Promise<Pokemon[]> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        console.error("Error al obtener la lista de pokemon:", error);
        throw error;
    }
}

/**
 * Trae los datos más relevantes del pokemon
 * @param id id del pokemon
 */
export async function fetchPokemonPropiedades(id: number | string): Promise<PokemonPropiedades> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el pokemon ${id}:`, error);
        throw error;
    }
}

/**
 * Trae más detalles del pokemon TODO - no me acuerdo bien que datos trae
 * @param id nombre del pokemon
 */
export async function fetchPokemonSpecies(id: number | string): Promise<PokemonSpecies> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la especie del pokemon:", error);
        throw error;
    }
}

/**
 * Funcion auxiliar que utiliza el Promise.all para fetchear la carga inicial con detalles de la lista de pokemon
 * y que la carga no sea secuencial y ralentice
 * @param pokemons array de nombres de los pokemon
 */
export async function fetchAllPokemonDetails(pokemons: Pokemon[]): Promise<PokemonPropiedades[]> {
    return Promise.all(
        pokemons.map(p => fetchPokemonPropiedades(getPokemonIdFromUrl(p.url)))
    );
}

function getPokemonIdFromUrl(url: string): number {
    const id = url.split('/').filter(Boolean).pop();
    return parseInt(id || '0', 10);
}