import { authService } from "../../services/auth.service";
import { SET_USER } from "../reducers/auth.reducer";
import { store } from "../store";

export async function login(credentials) {
    try {
        const user = await authService.login(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log(err)
        throw err
    }
}
export async function logout() {
    try {
        await authService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function signup(user){
    try {
        await authService.signup(user)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log(err)
        throw err
    }
}