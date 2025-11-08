'use client';

import {getTipoColor} from "@/lib/utils";
import Image from "next/image";
import {PokemonPropiedades, PokemonSpecies} from "@/lib/types/types";
import BackButton from "@/components/backButton";
import {useAddFavorite, useDeleteFavorite, useFavoritesPokemon} from "@/app/hooks/useFavorites";
import React, {useState} from "react";
import {FavoritePokemon, toFavoritePokemon} from "@/lib/types/favorites/favorites";
import {Heart, LoaderCircle} from "lucide-react";
import {FormValues} from "@/validations/favoritePokemonValidation";
import PokemonFavoriteModal from "@/app/favorites/components/pokemonFavoriteModal";
import {useDisclosure} from "@heroui/modal";
import {addToast} from "@heroui/toast";

type Props = {
    pokemon: PokemonPropiedades;
    species: PokemonSpecies;
};

export default function PokemonDetailPage({pokemon, species}: Props) {

    const {data: favoritesPokemon = []} = useFavoritesPokemon();
    const [error, setError] = useState<string | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const addFavorite = useAddFavorite();
    const removeFavorite = useDeleteFavorite();

    const isFavorite = favoritesPokemon.some(
        (favPokemon: FavoritePokemon) => favPokemon.id === pokemon.id
    );

    const isLoading = addFavorite.isPending || removeFavorite.isPending;

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setError(null);

        if (isFavorite) {
            try {
                await removeFavorite.mutateAsync(pokemon.id);
            } catch (err) {
                setError("Error al quitar de favoritos");
                setTimeout(() => setError(null), 3000);
            }
        } else {
            onOpen();
        }
    };

    const handleFormSuccess = async (values: FormValues) => {
        try {
            const favData = toFavoritePokemon(pokemon, values.name || "", values.description || "");
            await addFavorite.mutateAsync(favData);
            {
                addToast({
                    title: "FAVORITOS",
                    description: `El pokemon ${pokemon.name} se agregó correctamente a favoritos!`,
                    color: "success",
                    variant: "bordered",
                    icon: (
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            height={50}
                            width={50}
                        />
                    ),
                    classNames: {
                        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
                    },
                    closeIcon: (
                        <svg
                            fill="none"
                            height="32"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="32"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    ),

                });
            }
        } catch (err) {
            setError("Error al agregar a favoritos");
            setTimeout(() => setError(null), 3000);
            throw err;
        }
    };

    const tipoPrimario = pokemon.types[0].type.name;
    const backgroundColor = getTipoColor(tipoPrimario);

    const descripcion = species.flavor_text_entries
        .find(e => e.language.name === 'es')
        ?.flavor_text.replace(/\f/g, ' ') || 'No hay descripción disponible.';

    const categoria = species.genera
        .find(g => g.language.name === 'es')
        ?.genus || 'Desconocido';

    return (
        <div className="container mx-auto px-4 py-4 max-w-3xl">

            <div className="mb-6 relative">
                <BackButton/>
            </div>

            {error && (
                <div
                    className="absolute top-2 left-2 right-2 bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                    {error}
                </div>
            )}

            <div
                className="rounded-lg shadow-xl overflow-hidden"
                style={{backgroundColor}}
            >
                {/* header */}
                <div className="flex flex-col items-center w-full rounded-b-lg
                p-6 md:p-8 text-white">
                    <div className="relative flex flex-col justify-center w-full px-4 py-3 rounded-b-lg">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {pokemon.name.toUpperCase()}
                        </h1>
                        <p className="text-lg md:text-xl opacity-90">#{pokemon.id.toString().padStart(4, '0')}</p>
                        <p className="text-base md:text-lg mt-2">{categoria}</p>
                        {/* Botón de favorito */}
                        <button
                            onClick={handleToggleFavorite}
                            disabled={isLoading}
                            className="absolute right-1 top-6 -translate-y-1/2 disabled:cursor-not-allowed"
                            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                        >
                            {isLoading ? (
                                <LoaderCircle className="size-10 animate-spin text-gray-400"/>
                            ) : (
                                <Heart
                                    className={`size-10 cursor-pointer 
                                    transition-all duration-300 ease-out
                                    hover:scale-110 active:scale-95
                                    ${isFavorite
                                        ? "fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                                        : "text-white/60 hover:text-red-400"
                                    }`}
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* contenido */}
                <div className="bg-white p-4 md:p-6 lg:p-8">

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                        <div className="flex items-center justify-center">
                            <Image
                                height={300}
                                width={300}
                                src={pokemon.sprites.other['official-artwork'].front_default}
                                alt={pokemon.name}
                                className="w-full max-w-md"
                            />
                        </div>

                        {/* info */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold mb-3">Descripción</h2>
                                <p className="text-gray-700 text-sm md:text-base">{descripcion}</p>
                            </div>

                            <div>
                                <h2 className="text-xl md:text-2xl font-bold mb-3">Datos</h2>
                                <div className="space-y-2 text-sm md:text-base">
                                    <p><strong>Altura:</strong> {pokemon.height * 10} cm</p>
                                    <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                                    <div className="flex items-center gap-2">
                                        <strong>Tipos:</strong>
                                        <div className="flex gap-2 flex-wrap">
                                            {pokemon.types.map(t => (
                                                <span
                                                    key={t.type.name}
                                                    className="px-3 py-1 rounded-full text-white text-xs md:text-sm font-semibold"
                                                    style={{backgroundColor: getTipoColor(t.type.name)}}
                                                >
                                                        {t.type.name.toUpperCase()}
                                                    </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* seccion inferior */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-3">Habilidades</h2>
                            <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
                                {pokemon.abilities.map(a => (
                                    <li key={a.ability.name} className="capitalize">
                                        {a.ability.name.replace('-', ' ')}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-3">Estadísticas</h2>
                            <div className="space-y-3">
                                {pokemon.stats.map(s => (
                                    <div key={s.stat.name}>
                                        <div className="flex justify-between mb-1 text-sm md:text-base">
                                                <span className="capitalize font-medium">
                                                    {s.stat.name.replace('-', ' ')}
                                                </span>
                                            <span className="font-bold">{s.base_stat}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="h-2.5 rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${(s.base_stat / 255) * 100}%`,
                                                    backgroundColor
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <PokemonFavoriteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                pokemon={pokemon}
                onSuccess={handleFormSuccess}
            />
        </div>
    );
}
