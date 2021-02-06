import {STATUS_GENERATING_MAZE} from '../constants.js';

class Maze {
    /**
     * Создание массива массивов которое соответсвует полю лабиринта
     * @param {number} columns 
     * @param {number} rows 
     * @returns {Array} matrix [
     *                              [Array],
     *                              [Array]
     *                         ]
     */
    static createMaze(columns, rows) {
        const matrix = [];
    
        for(let x = 0; x < columns; x++) {
            matrix[x] = [];
            for(let y = 0; y < rows; y++) {
                matrix[x].push(0);
            }
        }
        matrix[0][0] = 1;
        
        return matrix;
    }

    /**
     * Рендеринг поля в соответствии с значением в ячейке
     * @param {Object} ctx CanvasRenderingContext2D
     * @param {Object} state {
     *                            matrix: [[Array], [Array], [Array]]
     *                            countCellsForEnd: number,
     *                            currentStatus: string,
     *                            size: number,
     *                            tractors: [
     *                                          {
     *                                              x: number,
     *                                              y: number
     *                                          }
     *                                      ],
     *                            unvisitedCells: number
     *                       }
     */
    static renderMaze(ctx, state) {
        for(let x = 0; x < state.matrix.length; x++) {
            for(let y = 0; y < state.matrix[x].length; y++) {
                ctx.beginPath();
                ctx.fillStyle = (state.matrix[x][y])?'white':'#e7dc9c';
                ctx.fillRect(x * state.size, y * state.size, state.size, state.size);
            }
        }
    }

    /**
     * Обновление состояния лабиринта и других объектов
     * @param {Array} actors [
     *                            {
     *                                 x: number,
     *                                 y: number
     *                            }
     *                       ]
     * @param {Array} matrix [
     *                            [Array],
     *                            [Array]
     *                       ]
     * @param {string} status 
     * @param {number} unvisitedCells 
     * @param {Array} directions [
     *                                  {
     *                                       dx: number,
     *                                       dy: number
     *                                  }
     *                           ]
     * @returns {Object} {
     *                        actors: [Array],
     *                        matrix: [Array]
     *                        unvisitedCells: number
     *                   }
     */
    static updateMaze(actors, matrix, status, unvisitedCells = 0, offsets) {
        actors.map((actor, index) => {
            actor.x += offsets[index]['dx'];
            actor.y += offsets[index]['dy'];

            if(status === STATUS_GENERATING_MAZE) {
                if(matrix[actor.x][actor.y] === 0) {
                    matrix[actor.x][actor.y] = 1;
                    matrix[actor.x - offsets[index]['dx'] / 2][actor.y - offsets[index]['dy'] / 2] = 1;
                    unvisitedCells = unvisitedCells - 1;
                }
            }
            return actor;
        });
 
        return {actors: actors, matrix: matrix, unvisitedCells: unvisitedCells};
    }
}

export {Maze};