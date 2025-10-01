'use client';

import axios from 'axios';
import {useEffect, useState} from "react";
import PokemonItem from "@/app/pokemonItem";

type Pokemon = {
    name: string;
    url: string;
};

const url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export default function PokemonList() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(url);
                const result = response.data.results;
                setPokemons(result);
            } catch (error){
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokemons.map((p, index) => (
                <PokemonItem key={index} name={p.name} url={p.url}/>
            ))}
        </div>
    );

}