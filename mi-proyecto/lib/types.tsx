export type Pokemon = {
    name: string;
    url: string;
    next: string;
};

export type PokemonPropiedades = {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: Array<{
        type: {
            name: string;
        }
    }>;
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        }
    }>;
    moves: Array<{
        move: {
            name: string;
            url: string;
        }
    }>;
    species: {
        url: string;
    };
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }
    }>;
};

export type PokemonSpecies = {
    flavor_text_entries: Array<{
        flavor_text: string;
        language: {
            name: string;
        };
    }>;
    genera: Array<{
        genus: string;
        language: {
            name: string;
        };
    }>;
    evolution_chain: {
        url: string;
    };
};