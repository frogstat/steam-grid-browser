import {fetchGet, parseGameData, parseGridData} from "./utils.js";

const BASE_URL = "https://www.steamgriddb.com/api/v2"

export async function getGameById(gameId) {
    console.log(`Getting game with id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/games/id/${gameId}`);
    const parsedData = parseGameData(responseData);
    parsedData["grids"] = await getGridById(parsedData.id);
    return parsedData;
}

export async function getGameBySteamId(gameId) {
    console.log(`Getting game with steam id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/games/steam/${gameId}`);
    const parsedData = parseGameData(responseData);
    parsedData["grids"] = await getGridBySteamId(parsedData.id);
    console.log(parsedData);
    return parsedData;
}

export async function getGridById(gameId) {
    console.log(`Getting grid with id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/grids/game/${gameId}/?dimensions=600x900&nsfw=any`);
    return parseGridData(responseData)
}

export async function getGridBySteamId(gameId) {
    console.log(`Getting grid with steam id: ${gameId}`);
    const responseData = await fetchGet(`${BASE_URL}/grids/steam/${gameId}/?dimensions=600x900&nsfw=any`);
    return parseGridData(responseData)
}

export async function searchGames(query) {
    console.log(`Searching for ${query}`);
    const responseData = await fetchGet(`${BASE_URL}/search/autocomplete/${query}`);
    return responseData.data.map(game => {
        return {
            id: game.id,
            name: game.name,
        }
    })
}