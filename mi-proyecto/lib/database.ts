import fs from "fs/promises";
import path from "path";
import {FavoritePokemon} from "@/lib/types/favorites/favorites";

const DB_PATH = path.join(process.cwd(), "database.json");

class Database {
    private async readDB(): Promise<FavoritePokemon[]> {
        try {
            const data = await fs.readFile(DB_PATH, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, devolver array vacío
            return [];
        }
    }

    private async writeDB(data: FavoritePokemon[]): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    }

    async getAll(): Promise<FavoritePokemon[]> {
        return await this.readDB();
    }

    async getById(id: number): Promise<FavoritePokemon | undefined> {
        const data = await this.readDB();
        return data.find((item) => item.id === id);
    }

    async create(pokemon: FavoritePokemon): Promise<FavoritePokemon> {
        const data = await this.readDB();

        const newFavoritePokemon: FavoritePokemon = {
            id: pokemon.id,
            name: pokemon.name,
            sprite: pokemon.sprite,
            types: pokemon.types,
            height: pokemon.height,
            weight: pokemon.weight,
        };

        data.push(newFavoritePokemon);
        await this.writeDB(data);
        return newFavoritePokemon;
    }

    async delete(id: number): Promise<boolean> {
        const data = await this.readDB();
        const initialLength = data.length;
        const filtered = data.filter((item) => item.id !== id);

        if (filtered.length === initialLength) {
            return false; // No se encontró el elemento
        }

        await this.writeDB(filtered);
        return true;
    }

    async update(id: number, updates: Partial<Omit<FavoritePokemon, "id">>): Promise<FavoritePokemon | null> {
        const data = await this.readDB();
        const index = data.findIndex((item) => item.id === id);

        if (index === -1) {
            return null;
        }

        data[index] = { ...data[index], ...updates };
        await this.writeDB(data);
        return data[index];
    }
}

export const db = new Database();

