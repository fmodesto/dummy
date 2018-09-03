import counters from 'src/counters.js';
import deepFreeze from 'deep-freeze';

const addCounter = list => {
    return [...list, 0];
};

const removeCounter = (list, index) => {
    return [...list.slice(0, index), ...list.slice(index + 1)];
};

const incrementCounter = (list, index) => {
    return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                done: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            } else {
                return {
                    ...state,
                    completed: !state.completed
                };
            }
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(state, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(e => todo(e, action));
        default:
            return state;
    }
};

it('works', () => {
    expect(counters).toBeInstanceOf(Function);
});

it('should add counter', () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);

    expect(addCounter(listBefore)).toEqual(listAfter);
});

it('should remove counter', () => {
    const listBefore = [10, 20, 30];
    const listAfter = [10, 30];

    deepFreeze(listBefore);

    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
});

it('should increment a counter', () => {
    const listBefore = [10, 20, 30];
    const listAfter = [10, 21, 30];

    deepFreeze(listBefore);

    expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
});
