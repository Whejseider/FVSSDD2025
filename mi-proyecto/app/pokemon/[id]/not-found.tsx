import Image from "next/image";
import BackButton from "@/components/backButton";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Pokémon no encontrado</h1>
                    <p className="text-gray-600 mb-8">
                        El Pokémon que buscas no existe o no está disponible.
                    </p>
                    <BackButton/>
                </div>
                <div>
                    <Image height={400} width={400} src={"/psyduck.png"} alt={"Psyduck"}/>
                </div>
            </div>
        </div>
    );
}