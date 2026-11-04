import { store } from "../store.js";
import { toyService } from "../../services/toy.service";
import { utilService } from "../../services/util.service";
import { UPDATE_TOY, ADD_TOY, SET_TOYS, REMOVE_TOY, SET_QUERY_OPTIONS, SET_LABELS, SET_ISLOADING, SET_STATS } from "../reducers/toy.reducer";
import { showErrorMsg } from "../../services/event-bus.service";

export async function loadToys(queryOptions) {
    store.dispatch({ type: SET_ISLOADING, isLoading: true })

    try {
        const data = await toyService.query(queryOptions)
        store.dispatch({ type: SET_TOYS, toys: data.toys })
    } catch (err) {
        throw err
    } finally {
        store.dispatch({ type: SET_ISLOADING, isLoading: false })
    }
}

export async function saveToy(toyToSave) {
    store.dispatch({ type: SET_ISLOADING, isLoading: true })

    const action = toyToSave._id ? UPDATE_TOY : ADD_TOY

    try {
        const savedToy = await toyService.save(toyToSave)
        store.dispatch({ type: action, toy: savedToy })
        return savedToy

    } catch (err) {
        console.log('Toy action --> could not save toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_ISLOADING, isLoading: false })

    }
}

export async function removeToy(toyId) {
    const removedToy = await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
    return removedToy
}

export async function addToyMsg(msg, toyId) {
    try {
        const updatedToy = await toyService.addMsg(msg, toyId)
        store.dispatch({ type: UPDATE_TOY, toy: updatedToy })
        return updatedToy
    } catch (err) {
        console.log('Toy action --> could not add toy message', err)
        throw err
    }
}

export function setQueryOptions(queryOptions) {
    store.dispatch({ type: SET_QUERY_OPTIONS, queryOptions })
}

export async function setLabels() {
    const data = await toyService.query()
    const labels = utilService.getUniqueLabels(data.toys, 'labels')
    store.dispatch({ type: SET_LABELS, labels })
}

export async function loadStats() {
    const stats = await toyService.getStats()
    store.dispatch({ type: SET_STATS, stats })
}

