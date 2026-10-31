import { toyService } from '../../services/toy.service'
import { authService } from '../../services/auth.service'
export const SET_USER = 'SET_USER'

const initialState = {
    user: authService.getLoggedinUser()
}

export function authReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_USER:
            return { ...state, user: cmd.user }
        default:
            return state
    }
}

