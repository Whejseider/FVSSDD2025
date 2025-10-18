import {fetchPokemon, fetchPokemonSpecies} from "@/lib/api";
import {notFound} from "next/navigation";
import PokemonDetailPage from "@/app/pokemon/[name]/pokemonDetailPage";

export default async function Page({params}: { params: { name: string } }) {
    try {

        const [pokemon, species] = await Promise.all([
            fetchPokemon(params.name),
            fetchPokemonSpecies(params.name)
        ]);

        return <PokemonDetailPage pokemon={pokemon} species={species}/>;
    } catch {
        notFound();
    }
}
