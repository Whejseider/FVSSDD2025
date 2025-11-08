import Link from "next/link";
import {PokemonPropiedades} from "@/lib/types/types";
import {getTipoColor} from "@/lib/utils";
import Image from "next/image";
import {useAddFavorite, useDeleteFavorite, useFavoritesPokemon} from "@/app/hooks/useFavorites";
import {Heart, LoaderCircle} from "lucide-react";
import React, {useState} from "react";
import {FavoritePokemon, toFavoritePokemon} from "@/lib/types/favorites/favorites";
import {FormValues} from "@/validations/favoritePokemonValidation";
import {useDisclosure} from "@heroui/modal";
import PokemonFavoriteModal from "@/app/favorites/components/pokemonFavoriteModal";
import {addToast} from "@heroui/toast";

type PokemonCardProps = {
    pokemon: PokemonPropiedades;
};

export default function PokemonCard({pokemon}: PokemonCardProps) {
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

    return (
        <div className="
        text-white font-semibold
        max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700
        flex flex-col items-center relative
        ">
            {/* TODO Mensaje de error */}
            {error && (
                <div
                    className="absolute top-2 left-2 right-2 bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-300">
                    {error}
                </div>
            )}

            <Link href={`/pokemon/${pokemon.id}`} passHref className="w-full block">
                <article
                    style={{backgroundColor}}
                    className="rounded-t-lg
                 cursor-pointer group overflow-hidden
                transition-all duration-300 hover:brightness-110 w-full h-[300px] flex items-center justify-center"
                >
                    <div className="relative w-full h-full flex items-center justify-center px-4 py-3">
                        <Image
                            className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                            height={300}
                            width={300}
                            loading="lazy"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </div>
                </article>
            </Link>

            {/* Contenido */}
            <div
                className="flex flex-col items-center w-full px-4 py-3 rounded-b-lg"
                style={{backgroundColor: "#232323"}}
            >
                <div className="relative flex justify-center w-full px-4 py-3 rounded-b-lg">
                    <h3 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h3>

                    {/* Botón de favorito */}
                    <button
                        onClick={handleToggleFavorite}
                        disabled={isLoading}
                        className="absolute right-1 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
                        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        {isLoading ? (
                            <LoaderCircle className="size-7 animate-spin text-gray-400"/>
                        ) : (
                            <Heart
                                className={`size-7 cursor-pointer 
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

                <p className="text-sm">N.° {pokemon.id.toString().padStart(4, '0')}</p>
                <p className="text-sm">
                    Altura: {pokemon.height * 10} cm | Peso: {pokemon.weight / 10} kg
                </p>
                <div className="flex gap-2 flex-wrap justify-center mt-2">
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

            <PokemonFavoriteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                pokemon={pokemon}
                onSuccess={handleFormSuccess}
            />
        </div>
    );
}