import {fetchGet, parseGameData, parseGridData} from "./utils.js";

const BASE_URL = "https://www.steamgriddb.com/api/v2"

////Returns only game information with no pictures
export async function getGameByIdPure(gameId) {
    console.log(`Getting game with id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/games/id/${gameId}`);
    return parseGameData(responseData);
}

export async function getGameById(gameId) {
    console.log(`Getting game with id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/games/id/${gameId}`);
    const parsedData = parseGameData(responseData);
    parsedData["grids"] = await getGridById(parsedData.id);
    return parsedData;
}



export async function searchGames(query) {
    console.log(`Searching for ${query}`);
    const responseData = await fetchGet(`${BASE_URL}/search/autocomplete/${query}`);
    return responseData.data
        .filter(game => game.name.toLowerCase().includes(query.toLowerCase()))
        .map(game => {
        return {
            id: game.id,
            name: game.name,
        }
    })
}

/////--------------------------

async function getGridById(gameId) {
    console.log(`Getting grid with id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/grids/game/${gameId}/?dimensions=600x900&nsfw=any`);
    return parseGridData(responseData)
}