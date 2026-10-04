import {fetchGet, parseGameData, parseGridData} from "./utils.js";

const BASE_URL = "https://www.steamgriddb.com/api/v2"

export async function getGame(gameId) {
    const responseData = await fetchGet(`${BASE_URL}/games/id/${gameId}`);
    return parseGameData(responseData);
}

export async function getImages(gameId, imageType) {
    const args = (function () {
        switch (imageType) {
            case "grids":
                return "?dimensions=600x900&nsfw=false";
            case "heroes":
                return "?dimensions=1920x620&nsfw=false";
            case "icons":
                return "?nsfw=false";
            default:
                return "";
        }
    })();

    const responseData = await fetchGet(`${BASE_URL}/${imageType}/game/${gameId}${args}`);
    return parseGridData(responseData)
}

export async function getCover(gameId) {
    const responseData = await fetchGet(`${BASE_URL}/grids/game/${gameId}/?dimensions=600x900&nsfw=any&limit=1`);
    return {
        thumbnail: responseData.data[0]?.thumb ?? null,
        image: responseData.data[0]?.url ?? null,
    }
}

export async function searchGames(query) {
    console.log(`Searching for ${query}`);
    const responseData = await fetchGet(`${BASE_URL}/search/autocomplete/${query}`);
    return responseData.data
        .map(game => {
            return {
                id: game.id,
                title: game.name,
            }
        })
}