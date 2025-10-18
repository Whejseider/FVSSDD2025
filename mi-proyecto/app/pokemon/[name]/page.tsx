import {fetchPokemon, fetchPokemonSpecies} from "@/lib/api";
import {notFound} from "next/navigation";
import PokemonDetailPage from "@/app/pokemon/[name]/pokemonDetailPage";

export default async function Page({params}: { params: { name: string } }) {
    const {name} = await params;

    try {

        const [pokemon, species] = await Promise.all([
            fetchPokemon(name),
            fetchPokemonSpecies(name)
        ]);

        return <PokemonDetailPage pokemon={pokemon} species={species}/>;
    } catch {
        notFound();
    }
}
