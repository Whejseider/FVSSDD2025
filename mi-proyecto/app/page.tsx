'use client';

import PokemonGrid from "@/app/pokemonGrid";
import {fetchAllPokemonDetails, fetchPokemonList} from "@/lib/api";
import {useEffect, useState} from "react";
import SkeletonCard from "@/components/skeletonCard";
import {PokemonPropiedades} from "@/lib/types";

export default function Page() {

    const [pokemon, setPokemon] = useState<PokemonPropiedades[]>([]);
    const [loading, setLoading] = useState(true);
    const POKEMON_COUNT = 30, OFFSET = 0;

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                setLoading(true);
                const pokemonList = await fetchPokemonList(POKEMON_COUNT, OFFSET);
                const pokemonDetails = await fetchAllPokemonDetails(pokemonList);
                const res = await new Promise(res => setTimeout(res, 2000));

                setPokemon(pokemonDetails);
            } catch (error) {
                console.error("Error al cargar los Pokémon:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, []);

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">POKÉDEX</h1>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({length: POKEMON_COUNT}).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            ) : (
                <PokemonGrid pokemon={pokemon}/>
            )}
        </main>
    );
}