'use client';

import PokemonGrid from "@/app/pokemonGrid";
import SkeletonCard from "@/components/skeletonCard";
import {PokemonPropiedades} from "@/lib/types";
import {useQuery} from "@tanstack/react-query";
import {fetchAllPokemonDetails, fetchPokemonList} from "@/services/pokeApiServices";


export default function Page() {
    const POKEMON_COUNT = 30, OFFSET = 0;

    const {data, isLoading, isError, error} = useQuery<PokemonPropiedades[]>({
        queryKey: ["pokemonList", POKEMON_COUNT, OFFSET],
        queryFn: async () => {
            const pokemonList = await fetchPokemonList(POKEMON_COUNT, OFFSET);
            return await fetchAllPokemonDetails(pokemonList);
        },
    });

    if (isLoading) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                    POKÉDEX
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({length: POKEMON_COUNT}).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl text-center">
                <h1 className="text-4xl font-bold mb-4">Error</h1>
                <p className="text-gray-600">{(error as Error).message}</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                POKÉDEX
            </h1>
            <PokemonGrid pokemon={data!}/>
        </main>
    );
}