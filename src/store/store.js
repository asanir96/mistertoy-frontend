import { createStore } from 'redux'

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

const initialState = {
    toys: []
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys }
        case ADD_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }
        case UPDATE_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.map(toy => toy._id !== cmd.toyId) }
        default:
            return state
    }
}


export const store = createStore(appReducer)