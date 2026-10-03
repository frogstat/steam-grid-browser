import type {Game, GameSearchResult} from "./types.ts";

const BASE_URL = "http://localhost:3001/api"

export async function searchGames(query: string): Promise<GameSearchResult[]> {
    return await fetchGet<GameSearchResult[]>(`${BASE_URL}/search/${query}`);
}

export async function getGameById(id: string): Promise<any> {
    return await fetchGet<Game>(`${BASE_URL}/game/id/${id}`)
}


export async function fetchGet<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}