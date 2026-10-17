import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useEffectUpdate } from "../custom-hooks/useEffectUpdate";

import { loadToys, removeToy, setQueryOptions, setLabels, loadStats } from "../store/actions/toy";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { ToySort } from "../cmps/ToySort";
import { ToyDashbord } from "./ToyDashbord";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { utilService } from "../services/util.service";
import { toyService } from "../services/toy.service";

export function ToyIndex() {
    const toys = useSelector(storedState => storedState.toys)
    const isLoading = useSelector(storedState => storedState.isLoading)
    const queryOptions = useSelector(storedState => storedState.queryOptions)
    const labels = useSelector(storedState => storedState.labels)
    // const stats = useSelector(storedState => storedState.stats)

    // console.log('Object.keys(stats).length', Object.keys(stats).length)

    // const toyCountsByLabel = useRef()

    useEffect(() => {
        setLabels()
        // loadStats()
    }, [])

    useEffect(() => {
        loadToys(queryOptions)
    }, [queryOptions])

    function onSetQueryOptions(queryOptions) {
        console.log('queryOptions',queryOptions)
        setQueryOptions(queryOptions)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy was remove successfully'))
            .catch(() => showErrorMsg('Unable to remove'))
    }

    // if (isLoading) return <div>Loading...</div>

    return <section className="toys main-layout full position-relative">
        {labels && <ToyFilter
            queryOptions={queryOptions}
            onSetQueryOptions={onSetQueryOptions}
            labels={labels}
        />}

        <ToySort
            queryOptions={queryOptions}
            onSetQueryOptions={onSetQueryOptions} />
        <Link

            to="/toy/edit">
            <button className="add-btn">Add toy</button></Link>

        {isLoading ?
            <div className="loader position-absolute"></div> :
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy} />
        }

        {/* {stats && Object.keys(stats).length && <ToyDashbord stats={stats} />} */}
    </section>
}