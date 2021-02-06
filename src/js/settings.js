function initSettings(level, countPlayers) {
    return {
        level: (cfg.typeLevel[level])?cfg.typeLevel[level]:typeLevel['easy'],
        countPlayers: (cfg.countPlayers[countPlayers])?cfg.countPlayers[countPlayers]:1
    }
}

const cfg = {
    typeLevel: {
        easy: {
            columns: 21,
            rows: 21,
            size: 20,
            countTractors: 2,
        },
        medium: {
            columns: 31,
            rows: 31,
            size: 15,
            countTractors: 4,
        },
        hard: {
            columns: 51,
            rows: 51,
            size: 10,
            countTractors: 10,
        }
    },
    countPlayers: {
        onePlayer: 1,
        twoPlayer: 2
    }
}

export {initSettings};