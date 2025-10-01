import PokemonList from "@/app/pokemonList";

export default function Page() {

    return (
        <div className="relative flex justify-top flex-col m-auto min-h-screen py-8">

            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "url('/diagonal-stripes.svg')",
                    backgroundRepeat: 'repeat',
                    backgroundSize: '300px'
                }}
            />

            <div className="relative z-10">
                <h1 className="text-2xl font-bold text-center mb-8">Lista de Pokemons</h1>
                <div className="max-w-3xl mx-auto">
                    <PokemonList/>
                </div>
            </div>

        </div>
    );
}