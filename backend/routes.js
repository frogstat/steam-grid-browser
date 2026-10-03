import express from "express";

import {
    getGameById,
    getGameBySteamId,
    getGridById,
    getGridBySteamId,
    searchGames
} from "./steamGridApi.js";

const router = express.Router();

router.get("/game/id/:id", async (req, res) => {
    try {
        const gameId = getIdFromParams(req.params);
        return res.status(200).json(await getGameById(gameId));
    } catch (e) {
        return handleError(res, e.message);
    }
});

router.get("/game/steamid/:id", async (req, res) => {
    try {
        const gameId = getIdFromParams(req.params);
        return res.status(200).json(await getGameBySteamId(gameId));
    } catch (e) {
        return handleError(res, e.message);
    }
});

router.get("/grid/id/:id", async (req, res) => {
    try {
        const gameId = getIdFromParams(req.params);
        return res.status(200).json(await getGridById(gameId));
    } catch (e) {
        return handleError(res, e.message);
    }
});

router.get("/grid/steamid/:id", async (req, res) => {
    try {
        const gameId = getIdFromParams(req.params);
        return res.status(200).json(await getGridBySteamId(gameId));
    } catch (e) {
        return handleError(res, e.message);
    }
});

router.get("/search/:query", async (req, res) => {
    try {
        const { query } = req.params;
        return res.status(200).json(await searchGames(query));
    } catch (e) {
        return handleError(res, e.message);
    }
});


function handleError(res, errorMessage) {
    console.error(errorMessage);
    return res.status(502).json({
        error: errorMessage
    })
}

function getIdFromParams(params) {
    const {id} = params;
    if (!id) {
        throw new Error("game id must be provided");
    }
    return id;
}

export default router