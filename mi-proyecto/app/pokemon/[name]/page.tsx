import {notFound} from "next/navigation";
import PokemonDetailPage from "@/app/pokemon/[name]/pokemonDetailPage";
import {fetchPokemonPropiedades, fetchPokemonSpecies} from "@/services/pokeApiServices";

export default async function Page({params}: { params: { name: string } }) {
    const {name} = await params;

    try {

        const [pokemon, species] = await Promise.all([
            fetchPokemonPropiedades(name),
            fetchPokemonSpecies(name)
        ]);

        return <PokemonDetailPage pokemon={pokemon} species={species}/>;
    } catch {
        notFound();
    }
}
