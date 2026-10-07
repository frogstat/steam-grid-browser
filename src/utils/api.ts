import type {AllowNsfw, Game, GameImage} from "./types.ts";
export type ImageTypes =  "grids" | "heroes" | "icons";

const BASE_URL = "http://localhost:3001/api"

export async function searchGames(query: string): Promise<Game[]> {
    return fetchGet<Game[]>(`${BASE_URL}/search/${encodeURIComponent(query)}`);
}

export async function fetchGame(id: number | string): Promise<Game> {
    return fetchGet<Game>(`${BASE_URL}/game/${id}`)
}

export async function fetchImages(id: number | string, imageType: ImageTypes, allowNsfw:AllowNsfw): Promise<GameImage[]> {
    console.log(allowNsfw);
    return fetchGet<GameImage[]>(`${BASE_URL}/images/${imageType}/${id}?nsfw=${allowNsfw}`);
}

async function fetchCoverRemotely(id: number | string): Promise<GameImage> {
    return fetchGet<GameImage>(`${BASE_URL}/cover/${id}`)
}


export async function fetchGet<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}


export async function fetchCover(id: number | string): Promise<GameImage> {
    const localCover = sessionStorage.getItem(String(id))
    if (!localCover) {
        const result = await fetchCoverRemotely(id)
        sessionStorage.setItem(String(id), JSON.stringify(result));
        return result;
    }
    return JSON.parse(localCover);
}