import { httpService } from './http.service.js'

const BASE_URL = 'user/'

export const userService = {
    getById,
}


function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}