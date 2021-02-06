import {INIT_MAZE, MOVE_TRACTORS,
        STATUS_GENERATED, INIT_PLAYERS,
        MOVE_PLAYERS, STATUS_READY_GENERATING_MAZE,
        STATUS_GAMING, STATUS_GENERATING_MAZE, STATUS_GAMEOVER} from '../constants.js';

import {Maze} from '../objects/Maze.js';
import {Tractor} from '../objects/Tractor.js';
import {Player} from '../objects/Player.js';

function rootReducer(action, state) {

    switch(action.type) {
        case INIT_MAZE: {
            state.columns = action.payload.columns;
            state.rows = action.payload.rows;
            state.matrix = Maze.createMaze(action.payload.columns, action.payload.rows);
            state.tractors = Tractor.createTractors(action.payload.countTractors);
            state.size = action.payload.size;
            state.unvisitedCells = Math.floor(action.payload.columns / 2 + 1) * Math.floor(action.payload.rows / 2 + 1) - 1;
            state.unvisitedCellsProcent = 0;
            state.countCellsForVisit = state.unvisitedCells;
            state.countPlayers = action.payload.countPlayers;
            state.currentStatus = STATUS_READY_GENERATING_MAZE;
            state.winner = null;

            return {...state};
        }

        case MOVE_TRACTORS: {
            state.currentStatus = STATUS_GENERATING_MAZE;
            const updatedState = Maze.updateMaze(state.tractors, state.matrix, state.currentStatus, state.unvisitedCells, action.payload.offsets);

            state.matrix = updatedState.matrix;
            state.tractors = updatedState.actors;
            state.unvisitedCells = updatedState.unvisitedCells;
            state.unvisitedCellsProcent = (100 / state.countCellsForVisit * (state.countCellsForVisit - updatedState.unvisitedCells)) | 0;
            if(updatedState.unvisitedCells === 0) {
                state.tractors = null;
                state.currentStatus = STATUS_GENERATED;
            }

            return {...state};
        }

        case INIT_PLAYERS: {
            state.players =  Player.createPlayers(state.countPlayers);
            state.currentStatus = STATUS_GAMING;

            return {...state};
        }

        case MOVE_PLAYERS: {
            const players = Maze.updateMaze(state.players, state.matrix, state.currentStatus, 0, action.payload.offsets);

            state.players = players.actors;
            players.actors.forEach((player) => {
                if(player.x === state.matrix.length - 1 && player.y === state.matrix[0].length - 1) {
                    state.winner = player;
                    state.players = null;
                    state.currentStatus = STATUS_GAMEOVER;
                }
            });

            return {...state};
        }
    }
}

export {rootReducer};