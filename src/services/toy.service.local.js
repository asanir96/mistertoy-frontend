import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
]
export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultQueryOptions,
    getQueryOptionsFromSearchParams
}
window.ts = toyService
const STORAGE_KEY = 'toyDB'

_createToys()


function query(queryOptions = { filterBy: {}, sort: {} }) {
    const { filterBy, sort } = queryOptions

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let filteredToys = [...toys]

            if (filterBy && filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy && filterBy.inStock !== undefined) {
                console.log('filterBy.inStock', filterBy.inStock)
                filteredToys = filteredToys.filter(toy => toy.inStock === filterBy.inStock)
            }

            console.log('filterBy', filterBy)
            if (filterBy.labels && filterBy.labels.length > 0) {
                filteredToys = filteredToys.filter(toy => toy.labels?.some(label => filterBy.labels.includes(label)))
            }

            return filteredToys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function save(toyToSave) {
    if (toyToSave._id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        const { name } = toyToSave
        if (!name) return Promise.reject('Missing required fields!')

        toyToSave = {
            ...toyToSave,
            imgUrl: 'hardcoded-url-for-now',
            createdAt: Date.now(),
            price: utilService.getRandomIntInclusive(10, 200),
            labels: utilService.getRandomLabel(labels),
            inStock: false
        }
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}


function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = [
        {
            _id: 't101',
            name: 'Talking Doll',
            imgUrl: '../assets/img/horse-toys-icon.png',
            price: 123,
            labels: ['Doll', 'Battery Powered', 'Baby'],
            createdAt: 1631031801011,
            inStock: true,
        },
        {
            _id: 't102',
            name: 'Lego City Police Station',
            imgUrl: 'hardcoded-url-for-now',
            price: 249,
            labels: ['Puzzle', 'Art'],
            createdAt: 1642031801011,
            inStock: true,
        },
        {
            _id: 't103',
            name: 'Remote Control Car',
            imgUrl: 'hardcoded-url-for-now',
            price: 179,
            labels: ['On wheels', 'Battery Powered', 'Outdoor'],
            createdAt: 1653031801011,
            inStock: false,
        },
        {
            _id: 't104',
            name: 'Wooden Shape Sorter',
            imgUrl: 'hardcoded-url-for-now',
            price: 69,
            labels: ['Baby', 'Puzzle'],
            createdAt: 1664031801011,
            inStock: true,
        },
        {
            _id: 't105',
            name: 'Watercolor Painting Kit',
            imgUrl: 'hardcoded-url-for-now',
            price: 89,
            labels: ['Art'],
            createdAt: 1675031801011,
            inStock: true,
        },
        {
            _id: 't106',
            name: 'Board Game: Treasure Hunt',
            imgUrl: 'hardcoded-url-for-now',
            price: 115,
            labels: ['Box game', 'Puzzle'],
            createdAt: 1686031801011,
            inStock: false,
        },
        {
            _id: 't107',
            name: 'Teddy Bear',
            imgUrl: 'hardcoded-url-for-now',
            price: 55,
            labels: ['Baby', 'Doll'],
            createdAt: 1697031801011,
            inStock: true,
        },
        {
            _id: 't108',
            name: 'Electric Robot',
            imgUrl: 'hardcoded-url-for-now',
            price: 199,
            labels: ['Battery Powered', 'Puzzle'],
            createdAt: 1708031801011,
            inStock: true,
        },
        {
            _id: 't109',
            name: 'Kids Football Set',
            imgUrl: 'hardcoded-url-for-now',
            price: 79,
            labels: ['Outdoor'],
            createdAt: 1719031801011,
            inStock: false,
        },
        {
            _id: 't110',
            name: 'Toy Fire Truck',
            imgUrl: 'hardcoded-url-for-now',
            price: 99,
            labels: ['On wheels', 'Battery Powered'],
            createdAt: 1721031801011,
            inStock: true,
        },
        {
            _id: 't111',
            name: '1000-Piece Jigsaw Puzzle',
            imgUrl: 'hardcoded-url-for-now',
            price: 65,
            labels: ['Puzzle', 'Art'],
            createdAt: 1732031801011,
            inStock: true,
        },
        {
            _id: 't112',
            name: 'Outdoor Bubble Machine',
            imgUrl: 'hardcoded-url-for-now',
            price: 135,
            labels: ['Outdoor', 'Battery Powered', 'Baby'],
            createdAt: 1743031801011,
            inStock: false,
        },
    ]

    utilService.saveToStorage(STORAGE_KEY, toys)
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

function getQueryOptionsFromSearchParams(searchParams) {
    const defaultQueryOptions = getDefaultQueryOptions()
    const filterBy = {}

    for (const field in defaultQueryOptions.filterBy) {
        var value = searchParams.get(field)

        if (value) {
            filterBy[field] = field === 'inStock' ? value === 'true' : value
        }
    }


    const sort = {
        sortBy: searchParams.get('sortBy') || '',
        sortDir: searchParams.get('sortDir') || 1
    }

    return { filterBy, sort }
}