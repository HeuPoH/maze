'use strict';

import {Maze} from './objects/Maze.js';
import {Tractor} from './objects/Tractor.js';
import {initMazeAction, moveTractorsAction, initPlayersAction, movePlayersAction} from './actions/action.js';
import {createStore} from './store.js';
import {STATUS_GENERATED, STATUS_READY_GENERATING_MAZE, STATUS_GENERATING_MAZE} from './constants.js';
import {Player} from './objects/Player.js';
import {initSettings} from './settings.js';

const currentStatus = document.getElementById('currentStatus');
const statusProcent = document.getElementById('statusProcent');
const windowGameover = document.getElementById('windowGameover');
const generateMazeButton = document.getElementById('generateMazeButton');
const startGameButton = document.getElementById('startGameButton');
const saveSettingsButton = document.getElementById('saveSettings');
const settingsBlock = document.getElementById('settingsMaze');
const settingsGameButton = document.getElementById('settingsGameButton');
const helpButton = document.getElementById('helpGameButton');
const helpBlock = document.getElementById('windowHelp');

const store = createStore();
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/**
 * Изменение настроек приложения
 */
saveSettingsButton.addEventListener('click', () => {
    const typeLevel = [...document.getElementsByName('typeLevel')].find((level) => level.checked).id;
    const countPlayers = [...document.getElementsByName('countPlayers')].find((count) => count.checked).id;
    const cfg = initSettings(typeLevel, countPlayers);

    canvas.setAttribute('width', `${cfg.level.columns * cfg.level.size}px`);
    canvas.setAttribute('height', `${cfg.level.rows * cfg.level.size}px`);

    settingsBlock.style.display = 'none';
    store.dispatch(initMazeAction(cfg));
});

/**
 * Генерация лабиринта
 */
generateMazeButton.addEventListener('click', () => {
    const state = store.getState();

    if(state.currentStatus !== STATUS_READY_GENERATING_MAZE) return;
    (function loopCreateMaze() {
        const state = store.getState();

        store.dispatch(moveTractorsAction(state.tractors, state.columns, state.rows));
        if(state.currentStatus === STATUS_GENERATED) return;
        requestAnimationFrame(loopCreateMaze);
    }());
});

/**
 * Запуск игры и реагирование на нажатие кнопок игроком
 */
startGameButton.addEventListener('click', () => {
    const state = store.getState();

    if(state.currentStatus !== STATUS_GENERATED) return;
    store.dispatch(initPlayersAction());
    document.body.onkeydown = function movePlayer(event) {
        store.dispatch(movePlayersAction(state.players, state.matrix, event.key));
    };
});

/**
 * Рендеринг лабиринта
 */
store.subscribe((state) => {
    Maze.renderMaze(ctx, state);
});

/**
 * Рендеринг тракторов при создании лабиринта
 */
store.subscribe((state) => {
    if(state.tractors) {
        Tractor.renderTractors(ctx, state.tractors, state.size);
    }
});

/**
 * Рендеринг игроков
 */
store.subscribe((state) => {
    if(state.players) {
        Player.renderPlayers(ctx, state.players, state.size);
    }
});

/**
 * Отображение текущей инофомации
 */
store.subscribe((state) => {
    currentStatus.innerText = state.currentStatus;
    statusProcent.innerText = (state.currentStatus === STATUS_GENERATING_MAZE)?`${state.unvisitedCellsProcent}%`:'';
});

/**
 * Отображение победителя
 */
store.subscribe((state) => {
    if(state.winner) {
        windowGameover.innerText = `Игра окончена. Победил игрок №${state.winner.id}. Для генерации нового лабиринта нажмите генерировать`;
        windowGameover.style.display = 'block';
        windowGameover.addEventListener('click', function(){this.style.display = 'none';});
        saveSettingsButton.click();
    }
});

/**
 * Применить настройки по умолчанию
 */
saveSettingsButton.click();

/**
 * Показать/скрыть блок "Помощь"
 */
helpButton.addEventListener('click', () => {
    helpBlock.style.display = (helpBlock.style.display === 'block')?'none':'block';
});

/**
 * Показать/скрыть блок "Настройки"
 */
settingsGameButton.addEventListener('click', () => {
    settingsBlock.style.display = (settingsBlock.style.display === 'block')?'none':'block';
});