import {rootReducer} from './reducers/rootReducer.js';
import {STATUS_INSTALL_SETTINGS} from './constants.js';

function createStore() {
    let state = {
        currentStatus: STATUS_INSTALL_SETTINGS
    };
    let subscribers = [];

    return {
        subscribe: function(callback) {
            subscribers.push(callback);
        },

        clearSubscribers: function() {
            subscribers = [];
        },

        dispatch: function(action) {
            state = rootReducer(action, state);
            subscribers.forEach(sb => {
                sb(state);
                return state;
            });
        },

        getState: function () {
            return state;
        }
    }
}

export {createStore};