import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Pokémon no encontrado</h1>
                    <p className="text-gray-600 mb-8">
                        El Pokémon que buscas no existe o no está disponible.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold"
                    >
                        Volver a la Pokédex
                    </Link>
                </div>
                <div>
                    <Image height={400} width={400} src={"/psyduck.png"} alt={"Psyduck"}/>
                </div>
            </div>
        </div>
    );
}