import Link from "next/link";
import {getTipoColor} from "@/lib/utils";
import Image from "next/image";
import {useDeleteFavorite, useFavoritesPokemon} from "@/app/hooks/useFavorites";
import {Heart, LoaderCircle} from "lucide-react";
import {useState} from "react";
import {FavoritePokemon} from "@/lib/types/favorites/favorites";

type FavoritePokemonCardProps = {
    pokemon: FavoritePokemon;
};

export default function FavoritePokemonCard({pokemon}: FavoritePokemonCardProps) {
    const {data: favoritesPokemon = []} = useFavoritesPokemon();
    const [error, setError] = useState<string | null>(null);

    const removeFavorite = useDeleteFavorite();

    const isFavorite = favoritesPokemon.some(
        (favPokemon: FavoritePokemon) => favPokemon.id === pokemon.id
    );

    const isLoading = removeFavorite.isPending;

    const handleRemoveFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setError(null);

        try {
            await removeFavorite.mutateAsync(pokemon.id);
        } catch (err) {
            setError("Error al quitar de favoritos");
            setTimeout(() => setError(null), 3000);
        }
    };

    const tipoPrimario = pokemon.types[0];
    const backgroundColor = getTipoColor(tipoPrimario);

    return (
        <div className="
        text-white font-semibold
        max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700
        flex flex-col items-center relative overflow-hidden h-full
        ">

            {error && (
                <div className="absolute top-2 left-2 right-2 bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-300">
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
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            height={300}
                            width={300}
                            priority
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

            <div
                className="flex flex-col items-center w-full px-4 py-3 rounded-b-lg flex-1"
                style={{backgroundColor: "#232323"}}
            >
                <div className="relative flex justify-center w-full py-3">
                    <div className="flex flex-col items-center w-full px-8">
                        <h3 className="text-xl font-bold text-center break-words w-full">
                            {(pokemon.alias && pokemon.alias.trim() !== "")
                                ? pokemon.alias.toUpperCase()
                                : pokemon.name.toUpperCase()}
                        </h3>
                        {pokemon.alias && pokemon.alias.trim() !== "" && (
                            <p className="text-xs text-gray-400 mt-1 text-center break-words w-full">
                                {pokemon.name.toUpperCase()}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleRemoveFavorite}
                        disabled={isLoading}
                        className="absolute right-1 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
                        aria-label="Quitar de favoritos"
                    >
                        {isLoading ? (
                            <LoaderCircle className="size-7 animate-spin text-gray-400" />
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

                <div className="min-h-[60px] flex items-center justify-center w-full px-2 my-2">
                    {pokemon.description && pokemon.description.trim() !== "" ? (
                        <p className="text-sm text-gray-300 italic text-center break-words overflow-wrap-anywhere w-full line-clamp-3">
                            "{pokemon.description}"
                        </p>
                    ) : null}
                </div>

                <p className="text-sm">
                    Altura: {pokemon.height * 10} cm | Peso: {pokemon.weight / 10} kg
                </p>
                <div className="flex gap-2 flex-wrap justify-center mt-2">
                    {pokemon.types.map(type => (
                        <span
                            key={type}
                            className="px-3 py-1 rounded-full text-white text-xs md:text-sm font-semibold"
                            style={{backgroundColor: getTipoColor(type)}}
                        >
                            {type.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}