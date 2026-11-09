import { httpService } from "./http.service"
const BASE_URL = 'review/'


export const reviewService = {
    add,remove
}

async function add(review) {
    return httpService.post(BASE_URL, review)
}

async function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}