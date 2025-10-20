'use client';

import PokemonGrid from "@/app/pokemonGrid";
import SkeletonCard from "@/components/skeletonCard";
import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchAllPokemonDetails, fetchPokemonList} from "@/services/pokeApiServices";

const POKEMON_PER_PAGE = 30;
const TOTAL_POKEMON = 1302;

export default function Page() {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["pokemonList"],
        queryFn: async ({pageParam = 0}) => {
            const pokemonList = await fetchPokemonList(POKEMON_PER_PAGE, pageParam);
            return await fetchAllPokemonDetails(pokemonList);
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextOffset = allPages.length * POKEMON_PER_PAGE;
            return nextOffset < TOTAL_POKEMON ? nextOffset : undefined;
        },
        initialPageParam: 0,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    const allPokemon = data?.pages.flat() ?? [];

    if (isLoading) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                    POKÉDEX
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({length: POKEMON_PER_PAGE}).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            </main>
        );
    }

    // TODO
    if (isError) {
        return (
            <main className="container mx-auto px-4 py-8 max-w-7xl text-center">
                <h1 className="text-4xl font-bold mb-4">Error</h1>
                <p className="text-gray-600">{(error as Error).message }</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-4xl font-bold text-center mb-8 text-black tracking-wider">
                POKÉDEX
            </h1>

            <PokemonGrid pokemon={allPokemon}/>

            {isFetchingNextPage && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {Array.from({length: POKEMON_PER_PAGE}).map((_, index) => (
                        <SkeletonCard key={`loading-${index}`}/>
                    ))}
                </div>
            )}

            {hasNextPage && (
                <div className="flex justify-center mt-8 gap-4 items-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg inline-flex items-center"
                    >
                        {isFetchingNextPage && (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                        )}
                        {isFetchingNextPage ? "Cargando..." : "Cargar más"}
                    </button>
                </div>
            )}

            <div className="text-center mt-4 space-y-1">
                <p className="text-gray-600">
                    Mostrando {allPokemon.length} de {TOTAL_POKEMON} Pokémon
                </p>
                {!hasNextPage && allPokemon.length > 0 && (
                    <p className="text-sm text-gray-500">
                        ¡Has llegado al final de la Pokédex!
                    </p>
                )}
            </div>
        </main>
    );
}