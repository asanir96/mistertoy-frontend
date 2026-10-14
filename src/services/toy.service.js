import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultQueryOptions,
    getStats
}

function query(queryOptions = {}) {
    const { sort, filterBy } = queryOptions

    return httpService.get(BASE_URL, { ...sort, ...filterBy })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: 'hardcoded-url-for-now',
        inStock: false,
        price: 0
    }
}


function getDefaultQueryOptions() {
    return {
        filterBy: {
            name: '',
            inStock: undefined,
            labels: []
        },
        sort: {
            sortBy: 'name',
            sortDir: 1
        }
    }
}

function getStats() {
    return httpService.get(BASE_URL+'stats')
}

// function _getToyCountByLabel() {
//     return httpService.get(BASE_URL, { sort: {}, filterBy: {} })
//         .then(toys => _getToyCountByLabel(toys))
// }

function _getAvgPriceByLabel(toys) {
    const ToysByLabls = _getToyCountByLabel(toys)
    const priceByLabel = _getPriceByLabel(toys)
    const avgPriceByLabel = riceByLabel.map(label => label.price / ToysByLabls[label])
}


function _getToyCountByLabel(toys) {
    return toys.reduce((acc, toy) => {

        toy.labels?.forEach(label => {
            if (label in acc) acc[label]++
            else acc[label] = 1
        })

        return acc
    }, {})
}

function _getPriceByLabel(toys) {
    return toys.reduce((acc, toy) => {

        toy.labels?.forEach(label => {
            if (label in acc) acc[label] += toy.price
            else acc[label] = toy.price
        })

        return acc
    }, {})
}