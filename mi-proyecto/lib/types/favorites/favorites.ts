import {PokemonPropiedades} from "@/lib/types/types";

export interface FavoritePokemon {
    id: number;
    name: string;
    alias: string;
    description: string;
    sprite: string;
    types: string[];
    height: number;
    weight: number;
}

export function toFavoritePokemon(pokemon: PokemonPropiedades, alias: string, description: string): FavoritePokemon {
    return {
        id: pokemon.id,
        name: pokemon.name,
        alias: alias || "",
        description: description || "",
        sprite: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map(t => t.type.name),
        height: pokemon.height,
        weight: pokemon.weight
    };
}