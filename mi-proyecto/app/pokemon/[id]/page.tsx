import {notFound} from "next/navigation";
import PokemonDetailPage from "@/app/pokemon/[id]/pokemonDetailPage";
import {fetchPokemonPropiedades, fetchPokemonSpecies} from "@/services/pokeApiServices";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    try {
        const pokemonId = parseInt(id, 10);

        if (isNaN(pokemonId) || pokemonId < 1) {
            notFound();
        }

        const [pokemon, species] = await Promise.all([
            fetchPokemonPropiedades(pokemonId),
            fetchPokemonSpecies(pokemonId)
        ]);

        return <PokemonDetailPage pokemon={pokemon} species={species}/>;
    } catch (error) {
        notFound();
    }
}
