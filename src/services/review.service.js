import { httpService } from "./http.service"
const BASE_URL = 'review/'


export const reviewService = {
    add,remove,query,getDefaultQueryOptions
}

function query(queryOptions = {}) {
    const { sort, filterBy } = queryOptions

    return httpService.get(BASE_URL, { ...sort, ...filterBy })
}

async function add(review) {
    return httpService.post(BASE_URL, review)
}

async function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function getDefaultQueryOptions() {
    return {
        filterBy: {
            userFullname: '',
            toyName: '',
            rating: null
        },
        sort: {
            sortBy: 'toy.name',
            sortDir: 1
        }
    }
}