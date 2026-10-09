import {createStore} from 'redux'
// export const LOAD_TOYS = 'LOAD_TOYS'

const initialState = {
    toys: []
}

export function appReducer(state = initialState,cmd={}){
    switch (cmd.type){

        default:
            return state
    }
}


export const store = createStore(appReducer)