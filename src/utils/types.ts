export type Game = {
    id: number;
    name: string;
    grids: Array<{
        thumbnail: string;
        image: string;
    }>;
}

export type GameSearchResult = {
    id: number;
    name: string;
}