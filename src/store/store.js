import { authReducer } from './reducers/auth.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'
import { combineReducers, createStore } from 'redux'


export const appReducer = combineReducers({ authModule: authReducer, toyModule: toyReducer })

export const store = createStore(appReducer)