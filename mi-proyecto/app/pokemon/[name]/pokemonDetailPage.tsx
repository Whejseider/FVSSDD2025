'use client';

import {getTipoColor} from "@/lib/utils";
import Image from "next/image";
import {PokemonPropiedades, PokemonSpecies} from "@/lib/types";
import BackButton from "@/components/backButton";

type Props = {
    pokemon: PokemonPropiedades;
    species: PokemonSpecies;
};

export default function PokemonDetailPage({pokemon, species}: Props) {

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

            <div
                className="rounded-lg shadow-xl overflow-hidden"
                style={{backgroundColor}}
            >
                {/* header */}
                <div className="p-6 md:p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {pokemon.name.toUpperCase()}
                    </h1>
                    <p className="text-lg md:text-xl opacity-90">#{pokemon.id.toString().padStart(4, '0')}</p>
                    <p className="text-base md:text-lg mt-2">{categoria}</p>
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
        </div>
    );
}
