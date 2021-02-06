class Player {
    /**
     * Создание игроков в точке x = 0, y = 0
     * @param {number} countPlayers
     * @returns {Array} players [
     *                                {
     *                                     id: number,
     *                                     x: number,
     *                                     y: number
     *                                }
     *                          ]
     */
    static createPlayers(countPlayers) {
        const players = [];
        const colors = ['black', 'red'];

        for(let i = 0; i < countPlayers; i++) {
            players.push({id: i, x: 0, y: 0, color: colors[i]});
        }

        return players;
    }

    /**
     * Рендер игроков
     * @param {Object} ctx CanvasRenderingContext2D
     * @param {Array} players [
     *                              {
     *                                  x: nubmer,
     *                                  y: number
     *                              }
     *                         ]
     * @param {number} size размер игрока
     */
    static renderPlayers(ctx, players, size) {
        players.forEach((player) => {
            ctx.beginPath();
            ctx.fillStyle = player.color;
            ctx.arc(player.x * size + size / 2, player.y * size + size / 2, size / 2, 0, Math.PI * 2);
            ctx.fill();
        })
    }

    /**
     * Определение направления игрокjd в зависимости от нажатой кнопки
     * @param {Array} players [
     *                                {
     *                                     x: number,
     *                                     y: number
     *                                }
     *                        ]
     * @param {Array} matrix [[Array], [Array], [Array]]
     * @param {string} key код нажатой кнопки
     */
    static movePlayers(players, matrix, key) {
        return players.map((player, index) => {
            return this.getOffsets(player, index, matrix, key);
        });
    }

    /**
     * Получить смещение в зависимости от нажатой кнопки
     * Объект controlButtons[0] кнопки управления для первого игрока
     * Объект controlButtons[1] кнопки управления для второго игрока
     * @param {Array} player [
     *                                {
     *                                     x: number,
     *                                     y: number
     *                                }
     *                       ]
     * @param {number} indexPlayer 
     * @param {Array} matrix [[Array], [Array], [Array]]
     * @param {string} key 
     * @returns {Object} offset {
     *                              dx: number,
     *                              dy: number
     *                          }
     */
    static getOffsets(player, indexPlayer, matrix, key) {
        const controlButtons = [
            {
                ArrowUp: {dx: 0, dy: -1},
                ArrowLeft: {dx: -1, dy: 0},
                ArrowDown: {dx: 0, dy: 1},
                ArrowRight: {dx: 1, dy: 0}
            },
            {
                w: {dx: 0, dy: -1},
                a: {dx: -1, dy: 0},
                s: {dx: 0, dy: 1},
                d: {dx: 1, dy: 0}
            }
        ];
        const offset = (controlButtons[indexPlayer][key])?controlButtons[indexPlayer][key]:{dx: 0, dy: 0};
        const x = player.x + offset.dx;
        const y = player.y + offset.dy

        return (x >= 0 && x < matrix.length && y >= 0 && y < matrix[0].length && matrix[x][y] === 1)?offset:{dx: 0, dy: 0};
    }
}

export {Player};