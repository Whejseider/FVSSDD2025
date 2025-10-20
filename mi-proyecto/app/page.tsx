'use client';

import PokemonGrid from "@/app/pokemonGrid";
import SkeletonCard from "@/components/skeletonCard";
import {PokemonPropiedades} from "@/lib/types";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchAllPokemonDetails, fetchPokemonList} from "@/services/pokeApiServices";
import {useState} from "react";


export default function Page() {
    const [count, setCount] = useState(30);
    const [offset, setOffset] = useState(0);

    const {data, isLoading, isError, error, isFetching} = useQuery<PokemonPropiedades[]>({
        queryKey: ["pokemonList", count, offset],
        queryFn: async () => {
            const pokemonList = await fetchPokemonList(count, offset);
            return await fetchAllPokemonDetails(pokemonList);
        },
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    if (isLoading) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                    POKÉDEX
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({length: count}).map((_, index) => (
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

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setOffset((old) => old + 30)}
                    disabled={isFetching}
                    className="px-6 py-2 cursor-pointer  bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                    {isFetching ? "Cargando..." : "Cargar más"}
                </button>
            </div>
        </main>
    );
}