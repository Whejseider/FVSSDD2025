'use client';

import axios from "axios";
import {useState, useEffect} from "react";

type PokemonItemProps = {
    name: string;
    url: string;
}

type PokemonPropiedades = {
    id: number;
    height: number;
    weight: number;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: Array<{
        type: {
            name: string;
        }
    }>;
}

const getTipoColor = (tipo: string): { backgroundColor: string; className: string } => {
    const colores: { [key: string]: string } = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    return {
        backgroundColor: colores[tipo] || '#777',
        className: 'hover:brightness-110 transition-all'
    };
};

export default function PokemonItem({name, url}: PokemonItemProps) {
    const [contador, setContador] = useState<number>(0);
    const [propiedades, setPropiedades] = useState<PokemonPropiedades | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const result = response.data;
                setPropiedades(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [url]);


    if (!propiedades) return <div className="text-white">Cargando...</div>;

    const tipoPrimario = propiedades.types[0].type.name;
    const {backgroundColor, className} = getTipoColor(tipoPrimario);

    return (
        <button
            style={{backgroundColor}}
            className={`${className} text-white font-semibold rounded-lg shadow-md flex flex-col items-center cursor-pointer group overflow-visible p-0 transition-all duration-300 hover:shadow-xl`}
            onClick={() => setContador(contador + 1)}
        >
            <div className="w-full px-4 py-3 overflow-visible">
                <img className="relative w-full h-full mx-auto transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                     src={propiedades.sprites.other['official-artwork'].front_default} alt={name}/>
            </div>
            <div className="w-full px-4 py-3 rounded-b-lg"
                 style={{
                     backgroundColor: "#232323",
                 }}
            >
                <h3 className="text-xl font-bold">{name.toUpperCase()}</h3>
                <p className="text-sm">ID: {propiedades.id}</p>
                <p className="text-sm">Altura: {propiedades.height * 10} cm | Peso: {propiedades.weight / 10} kg</p>
                <p className="text-sm">Tipo: {propiedades.types.map(t => t.type.name.toUpperCase()).join(', ')}</p>
                <p className="text-sm mt-2 px-2 py-1 rounded"
                   style={{
                       backgroundColor: '#313131',
                   }}
                >Clicks: {contador}</p>
            </div>
        </button>
    );
}