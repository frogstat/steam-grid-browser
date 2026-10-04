import type {Game} from "../utils/types.ts";
import ImagesView from "./ImagesView.tsx";

type GameViewProps = {
    game: Game,
    unsetGame: () => void,
}

function GameView({game, unsetGame}: GameViewProps) {



    return (
        <div className="game-view">
            <button onClick={unsetGame}>Return</button>
            <h1>{game.title}</h1>
            <ImagesView id={game.id} imageType={"grids"}/>
            <ImagesView id={game.id} imageType={"heroes"}/>
            <ImagesView id={game.id} imageType={"icons"}/>
        </div>
    )
}

export default GameView;