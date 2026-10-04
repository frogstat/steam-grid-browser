import 'dotenv/config'
const API_KEY = process.env.API_KEY;

export async function fetchGet(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${API_KEY}`
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    if (!data.success) {
        console.log(data)
        throw new Error("Server did not return success = true");
    }

    return data;
}

export function parseGridData(originData){
    return originData.data.map((grid) => {
        return {
            thumbnail: grid.thumb,
            image: grid.url
        }
    })
}

export function parseGameData(originData){
    return {
        id: originData.data.id,
        title: originData.data.name
    }
}