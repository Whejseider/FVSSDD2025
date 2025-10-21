import Link from "next/link";
import {PokemonPropiedades} from "@/lib/types";
import {getTipoColor} from "@/lib/utils";
import Image from "next/image";
import {HeartIcon} from "@heroicons/react/24/outline";

type PokemonCardProps = {
    pokemon: PokemonPropiedades;
};

// TODO Documentar los DIV, me faltan los otros pero lo dejo aca a esto
export default function PokemonCard({pokemon}: PokemonCardProps) {
    const tipoPrimario = pokemon.types[0].type.name;
    const backgroundColor = getTipoColor(tipoPrimario);

    return (
        <div className="
        text-white font-semibold
        max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700
        flex flex-col items-center
        ">
            <Link href={`/pokemon/${pokemon.name}`} passHref>
                <article
                    style={{backgroundColor}}
                    className="rounded-t-lg shadow-md
                 cursor-pointer group overflow-visible p-0
                transition-all duration-300 hover:shadow-xl hover:brightness-110 w-full"
                >
                    <div className="w-full px-4 py-3 overflow-visible flex-grow">
                        <Image
                            className="relative h-full w-full mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                            height={300}
                            width={300}
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
                   <HeartIcon className="
                   absolute right-1 top-1/2 -translate-y-1/2
                   size-7 hover:text-red-400 cursor-pointer"
                   />
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

        </div>
    );
}