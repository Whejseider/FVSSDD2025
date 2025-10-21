import {FavoritePokemon} from "@/lib/database";

export const favoritesPokemonService = {
    getAll: async (): Promise<FavoritePokemon[]> => {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("Error al obtener pokémon favoritos");
        return res.json();
    },

    add: async (favoritePokemon: {
        id: number,
        name: string;
    }): Promise<FavoritePokemon> => {
        const res = await fetch("/api/favorites", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(favoritePokemon),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al crear pokémon favorito");
        }
        return res.json();
    },

    remove: async (id: number): Promise<void> => {
        const res = await fetch(`/api/favorites/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar pokémon favorito");
    },
};