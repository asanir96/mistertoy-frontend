// import { store } from "../store";
import { toyService } from "../../services/toy.service.local";
import { UPDATE_TOY, ADD_TOY, SET_TOYS,REMOVE_TOY, store } from "../store";

export function loadToys() {
    return toyService.query()
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.log('Toy action --> could not load toys', err)
            throw err
        })
}

export function saveToy(toyToSave) {
    const action = toyToSave._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toyToSave)
        .then(savedToy => {
            store.dispatch({ type: action, savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('Toy action --> could not save toys', err)
            throw err
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