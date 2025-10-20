import axios from "axios";
import { Pokemon, PokemonPropiedades, PokemonSpecies } from "@/lib/types";

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
 * @param name nombre del pokemon
 */
export async function fetchPokemonPropiedades(name: string | number): Promise<PokemonPropiedades> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el pokemon ${name}:`, error);
        throw error;
    }
}

/**
 * Trae más detalles del pokemon TODO - no me acuerdo bien que datos trae
 * @param name nombre del pokemon
 */
export async function fetchPokemonSpecies(name: string): Promise<PokemonSpecies> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon-species/${name}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la especie del pokemon:", error);
        throw error;
    }
}

/**
 * Funcion auxiliar que utiliza el Promise.all para fetchear la carga inicial con detalles de la lista de pokemon
 * y que la carga no sea secuencial y ralentice
 * @param names array de nombres de los pokemon
 */
export async function fetchAllPokemonDetails(names: Pokemon[]): Promise<PokemonPropiedades[]> {
    return Promise.all(names.map(p => fetchPokemonPropiedades(p.name)));
}