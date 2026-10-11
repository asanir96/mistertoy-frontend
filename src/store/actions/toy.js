// import { store } from "../store";
import { toyService } from "../../services/toy.service.local";
import { utilService } from "../../services/util.service";
import { UPDATE_TOY, ADD_TOY, SET_TOYS, REMOVE_TOY, SET_QUERY_OPTIONS, SET_LABELS, SET_ISLOADING, store } from "../store";

export function loadToys(queryOptions) {
    store.dispatch({ type: SET_ISLOADING, isLoading: true })

    return toyService.query(queryOptions)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.log('Toy action --> could not load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_ISLOADING, isLoading: false })
        })
}

export function saveToy(toyToSave) {
    store.dispatch({ type: SET_ISLOADING, isLoading: true })

    const action = toyToSave._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toyToSave)
        .then(savedToy => {
            store.dispatch({ type: action, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('Toy action --> could not save toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_ISLOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(removedToy => {
            store.dispatch({ type: REMOVE_TOY, toyId })
            return removedToy
        })
        .catch(err => {
            console.log('Toy action --> could not remove toy', err)
            throw err
        })
}

export function setQueryOptions(queryOptions) {
    store.dispatch({ type: SET_QUERY_OPTIONS, queryOptions })
}

export function setLabels() {
    return toyService.query()
        .then(toys => {
            const labels = utilService.getUniqueLabels(toys, 'labels')
            store.dispatch({ type: SET_LABELS, labels })
        })
        .catch(err => {
            console.log('Toy action --> could not load toys', err)
            throw err
        })
}

