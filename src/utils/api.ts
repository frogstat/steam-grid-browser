import type {Game, GameImage} from "./types.ts";
export type ImageTypes =  "grids" | "heroes" | "icons";

const BASE_URL = "http://localhost:3001/api"

export async function searchGames(query: string): Promise<Game[]> {
    return await fetchGet<Game[]>(`${BASE_URL}/search/${query}`);
}

export async function fetchGame(id: number | string): Promise<Game> {
    return await fetchGet<Game>(`${BASE_URL}/game/${id}`)
}

export async function fetchImages(id: number | string, imageType: ImageTypes): Promise<GameImage[]> {
    return await fetchGet<GameImage[]>(`${BASE_URL}/${imageType}/${id}`)
}

export async function fetchCover(id: number | string): Promise<GameImage> {
    return await fetchGet<GameImage>(`${BASE_URL}/cover/${id}`)
}


export async function fetchGet<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}