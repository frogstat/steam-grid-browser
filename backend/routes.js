import express from "express";

import {
    getCover,
    getGame,
    getImages,
    searchGames
} from "./steamGridApi.js";

const router = express.Router();

router.get("/game/:id", async (req, res) => {
    try {
        const {id} = req.params;
        return res.status(200).json(await getGame(id));
    } catch (e) {
        return handleError(res, e.message);
    }
});

router.get("/images/:type/:id", async (req, res) => {
    try {
        const { type, id } = req.params;
        return res.status(200).json(await getImages(id, type));
    } catch (e) {
        return handleError(res, e.message);
    }
});

router.get("/cover/:id", async (req, res) => {
    try {
        const {id} = req.params;
        return res.status(200).json(await getCover(id));
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

export default router