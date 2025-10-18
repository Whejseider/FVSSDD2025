import PokemonCard from "@/components/pokemonCard";
import {PokemonPropiedades} from "@/lib/types";

type PokemonGridProps = {
    pokemon: PokemonPropiedades[];
};

export default function PokemonGrid({ pokemon }: PokemonGridProps) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );

}