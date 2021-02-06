class Tractor {
    /**
     * Создание тракторов в точке x = 0, y = 0
     * @param {number} count количество тракторов
     * @returns {Array} tractors [
     *                                {
     *                                     x: number,
     *                                     y: number
     *                                }
     *                           ]
    */
    static createTractors(countTractors) {
        const tractors = [];

        for(let i = 0; i < countTractors; i++) {
            tractors.push({x: 0, y: 0})
        }
        
        return tractors;
    }

    /**
     * Рендер тракторов
     * @param {Object} ctx CanvasRenderingContext2D
     * @param {Array} tractors [
     *                              {
     *                                  x: nubmer,
     *                                  y: number
     *                              }
     *                         ]
     * @param {number} size размер трактора
    */
    static renderTractors(ctx, tractors, size) {
        tractors.forEach((tractor) => {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(tractor.x * size, tractor.y * size, size, size);
        })
    }
    
    /**
     * Определение направления для каждого трактора, tractor[i] соответствует directions[i]
     * @param {Array} tractors [
     *                          tractor: {
     *                                        x: number,
     *                                        y: number
     *                                   }
     *                         ]
     * @param {number} columns
     * @param {number} rows
     * @returns {Array} offsets [
     *                                  {
     *                                       dx: number,
     *                                       dy: number
     *                                  }
     *                          ]
    */
    static moveTractors(tractors, columns, rows) {
        const offsets = [];

        tractors.forEach(tractor => {
            offsets.push(Tractor.getRandomDirection(tractor, columns, rows));
        })

        return offsets;
    }

    /**
     * Выбор рандомного направления из всех возможных
     * @param {Object} tractor {
     *                              x: number,
     *                              y: number
     *                         }
     * @param {nubmer} columns 
     * @param {number} rows 
     * @returns {Object} offsets {
     *                                  dx: number,
     *                                  dy: number
     *                           }
    */
    static getRandomDirection(tractor, columns, rows) {
        const offsets = [];

        if(tractor.y > 1) {
            offsets.push({dx: 0, dy: -2});
        }

        if(tractor.x < columns - 1) {
            offsets.push({dx: 2, dy: 0});
        }

        if(tractor.y < rows - 1) {
            offsets.push({dx: 0, dy: 2});
        }

        if(tractor.x > 1) {
            offsets.push({dx: -2, dy: 0});
        }

        return offsets[Math.random() * offsets.length | 0];
    }
}

export {Tractor};