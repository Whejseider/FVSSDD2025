import PokemonCard from "@/components/pokemonCard";

import {PokemonPropiedades} from "@/lib/types/types";
import {FavoritePokemon} from "@/lib/types/favorites/favorites";
import FavoritePokemonCard from "@/app/favorites/components/pokemonFavoriteCard";

type PokemonGridProps = {
    pokemon: PokemonPropiedades[] | FavoritePokemon[];
};

function isPokemonPropiedades(pokemon: any): pokemon is PokemonPropiedades {
    return 'sprites' in pokemon && typeof pokemon.sprites === 'object';
}

export default function PokemonGrid({pokemon}: PokemonGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {pokemon.map((poke) => {
                if (isPokemonPropiedades(poke)) {
                    return <PokemonCard key={poke.id} pokemon={poke} />;
                } else {
                    return <FavoritePokemonCard key={poke.id} pokemon={poke} />;
                }
            })}
        </div>
    );
}