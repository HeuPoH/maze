import {INIT_MAZE, MOVE_TRACTORS, INIT_PLAYERS, MOVE_PLAYERS} from '../constants.js';
import {Tractor} from '../objects/Tractor.js';
import {Player} from '../objects/Player.js';

function initMazeAction(cfg) {
    return {
        type: INIT_MAZE,
        payload: {
            columns: cfg.level.columns,
            rows: cfg.level.rows,
            countTractors: cfg.level.countTractors,
            countPlayers: cfg.countPlayers,
            size: cfg.level.size,
        }
    }
}

function moveTractorsAction(tractors, columns, rows) {
    return {
        type: MOVE_TRACTORS,
        payload: {
            offsets: Tractor.moveTractors(tractors, columns, rows),
        }
    }
}

function initPlayersAction() {
    return {
        type: INIT_PLAYERS
    }
}

function movePlayersAction(players, matrix, key) {
    return {
        type: MOVE_PLAYERS,
        payload: {
            offsets: Player.movePlayers(players, matrix, key)
        }
    }
}

export {initMazeAction, moveTractorsAction, initPlayersAction, movePlayersAction};