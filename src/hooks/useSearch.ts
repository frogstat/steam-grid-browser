import {useRef, useState} from "react";
import type {Game} from "../utils/types.ts";
import {fetchGame, searchGames} from "../utils/api.ts";

export function useSearch() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Game[] | null>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: any) {
        e.preventDefault();
        if (!query) {
            return;
        }

        const queryIsId = checkboxRef.current?.checked ?? false;
        const search = queryIsId ? searchById : searchByName;

        search().then(results => {
            setResults(results);
        }).catch(() => setResults([]));
    }

    async function searchByName() {
        return await searchGames(query)
    }

    async function searchById() {
        const game = await fetchGame(query);
        return [game]
    }

    return {
        setQuery,
        results,
        handleSubmit,
        checkboxRef
    }

}