import {NextResponse} from "next/server";
import {db} from "@/lib/database";

export async function GET() {
    try {
        const pokemonFavorites = await db.getAll();
        return NextResponse.json(pokemonFavorites, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Error al obtener productos"},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validaciones
        if (!body.id || !body.name) {
            return NextResponse.json(
                {error: "Faltan campos obligatorios: id, name"},
                {status: 400}
            );
        }

        const alreadyExists = await db.getById(body.id);
        if (alreadyExists) {
            return NextResponse.json(
                {error: "Este Pokémon ya está en favoritos"},
                {status: 409}
            );
        }

        const newFavoritePokemon = await db.create({
            id: body.id,
            name: body.name
        });

        return NextResponse.json(newFavoritePokemon, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: "Error al agregar favorito"},
            {status: 500}
        );
    }
}