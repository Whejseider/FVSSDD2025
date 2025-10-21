"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {favoritesPokemonService} from "@/services/favorites.service";
import {FavoritePokemon} from "@/lib/types/favorites/favorites";

export function useFavoritesPokemon() {
    return useQuery({
        queryKey: ["favoritesPokemon"],
        queryFn: favoritesPokemonService.getAll,
    });
}

export function useAddFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: favoritesPokemonService.add,

        onMutate: async (newFavorite) => {
            await queryClient.cancelQueries({ queryKey: ["favoritesPokemon"] });

            const previousFavorites = queryClient.getQueryData<FavoritePokemon[]>(["favoritesPokemon"]);

            queryClient.setQueryData<FavoritePokemon[]>(
                ["favoritesPokemon"],
                (old = []) => [...old, newFavorite]
            );

            return { previousFavorites };
        },

        onError: (err, newFavorite, context) => {
            if (context?.previousFavorites) {
                queryClient.setQueryData(["favoritesPokemon"], context.previousFavorites);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favoritesPokemon"] });
        },
    });
}

export function useDeleteFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: favoritesPokemonService.remove,

        onMutate: async (pokemonId) => {
            await queryClient.cancelQueries({ queryKey: ["favoritesPokemon"] });

            const previousFavorites = queryClient.getQueryData<FavoritePokemon[]>(["favoritesPokemon"]);

            queryClient.setQueryData<FavoritePokemon[]>(
                ["favoritesPokemon"],
                (old = []) => old.filter(fav => fav.id !== pokemonId)
            );

            return { previousFavorites };
        },

        onError: (err, pokemonId, context) => {
            if (context?.previousFavorites) {
                queryClient.setQueryData(["favoritesPokemon"], context.previousFavorites);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favoritesPokemon"] });
        },
    });
}