import { createStore } from 'redux'
import { toyService } from '../services/toy.service.local'

export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'

export const SET_QUERY_OPTIONS = 'SET_QUERY_OPTIONS'

export const SET_LABELS = 'SET_LABELS'

export const SET_ISLOADING = 'SET_ISLOADING'

const initialState = {
    queryOptions: toyService.getDefaultQueryOptions(),
    toys: [],
    labels: null,
    isLoading: false
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, cmd.toy] }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== cmd.toyId) }
        case SET_QUERY_OPTIONS:
            return { ...state, queryOptions: cmd.queryOptions }
        case SET_LABELS:
            return { ...state, labels: cmd.labels }
        case SET_ISLOADING:
            return { ...state, isLoading:cmd.isLoading }
        default:
            return state
    }
}


export const store = createStore(appReducer)