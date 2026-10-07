export type Game = {
    id: number,
    title: string
}

export type GameImage = {
    thumbnail: string
    image: string
}

export type AllowNsfw = "true" | "false" | "any";