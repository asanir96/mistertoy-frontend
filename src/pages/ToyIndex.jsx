import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams,Link } from "react-router-dom";
import { useEffectUpdate } from "../custom-hooks/useEffectUpdate";

import { toyService } from "../services/toy.service.local";
import { loadToys, removeToy, setQueryOptions, setLabels } from "../store/actions/toy";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { utilService } from "../services/util.service";

export function ToyIndex() {
    const toys = useSelector(storedState => storedState.toys)
    const queryOptions = useSelector(storedState => storedState.queryOptions)
    const labels = useSelector(storedState => storedState.labels)

    useEffect(() => {
        setLabels()
    }, [])

    useEffect(() => {
        loadToys(queryOptions)
    }, [queryOptions])

    function onSetQueryOptions(queryOptions) {
        setQueryOptions(queryOptions)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy was remove successfully'))
            .catch(() => showErrorMsg('Unable to remove'))
    }

    if (!toys || !toys.length) return <div>Loading...</div>

    return <main>
        {labels && <ToyFilter
            queryOptions={queryOptions}
            onSetQueryOptions={onSetQueryOptions}
            labels={labels}
        />}
        <Link to="/toy/edit">
        <button>Add toy</button></Link>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />
    </main>
}