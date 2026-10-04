import {useState} from "react";
import type {Game} from "../utils/types.ts";
import {searchGames} from "../utils/api.ts";

export function useSearch() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Game[] | null>(null);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    function handleSubmit(e: any) {
        e.preventDefault();
        setSelectedGame(null)
        setResults(null);
        setQuery("")

        if (!query) {
            return;
        }

        searchGames(query).then(results => {
            setResults(results);
        }).catch(() => setResults([]));
    }

    function unsetGame(){
        setSelectedGame(null);
    }

    return {
        query,
        setQuery,
        results,
        handleSubmit,
        selectedGame,
        setSelectedGame,
        unsetGame
    }

}