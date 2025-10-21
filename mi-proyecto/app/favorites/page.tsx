'use client';

import PokemonGrid from "@/app/pokemonGrid";
import SkeletonCard from "@/components/skeletonCard";
import {useFavoritesPokemon} from "@/app/hooks/useFavorites";
import Link from "next/link";
import {Heart} from "lucide-react";

export default function Page() {
    const {data: favoritesPokemon = [], isLoading, isError, error} = useFavoritesPokemon();

    if (isLoading) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                    MIS FAVORITOS
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({length: 8}).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl text-center">
                <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
                <p className="text-gray-600 mb-6">
                    {(error as Error).message || "Error al cargar favoritos"}
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
                >
                    Volver al inicio
                </Link>
            </main>
        );
    }

    if (favoritesPokemon.length === 0) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                    MIS FAVORITOS
                </h1>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Heart className="size-24 text-gray-300 mb-6" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                        No tienes favoritos aún
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md">
                        Explora la Pokédex y agrega tus Pokémon favoritos haciendo clic en el corazón
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
                    >
                        Explorar Pokédex
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2 text-black tracking-wider">
                    MIS FAVORITOS
                </h1>
                <p className="text-gray-600">
                    {favoritesPokemon.length} {favoritesPokemon.length === 1 ? 'Pokémon' : 'Pokémon'}
                </p>
            </div>

            <PokemonGrid pokemon={favoritesPokemon}/>
        </main>
    );
}