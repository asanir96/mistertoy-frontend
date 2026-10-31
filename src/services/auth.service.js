import { httpService } from "./http.service"
const USER_SESSION_STORAGE_KEY = 'loggedInUser'



export const authService = {
    signup,
    login,
    logout,
    getLoggedinUser
}

async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        _setLoggedinUser(user)
        return user
    } catch (err) {
        throw err
    }
}
async function logout() {
    try {
        await httpService.post('auth/logout')
        _setLoggedinUser(null)
    } catch (err) {
        throw err
    }
}

async function signup(credentials) {
    try {
        const user = await httpService.post('auth/signup', credentials)
        _setLoggedinUser(user)
        return user
    } catch (err) {
        throw err
    }
}

export function getLoggedinUser() {
    const user = sessionStorage.getItem(USER_SESSION_STORAGE_KEY)
    return JSON.parse(user)
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(user))
}