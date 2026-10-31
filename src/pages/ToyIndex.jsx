import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
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
    const toys = useSelector(storedState => storedState.toyModule.toys)
    const isLoading = useSelector(storedState => storedState.toyModule.isLoading)
    const queryOptions = useSelector(storedState => storedState.toyModule.queryOptions)
    const labels = useSelector(storedState => storedState.toyModule.labels)
    const user = useSelector(storedState=>storedState.authModule.user)
    const navigate = useNavigate()
    // const stats = useSelector(storedState => storedState.stats)

    // console.log('Object.keys(stats).length', Object.keys(stats).length)

    // const toyCountsByLabel = useRef()

    useEffect(() => {
        loadLabels()
    }, [])

    useEffect(() => {
        load(queryOptions)
    }, [queryOptions])

    async function load(queryOptions) {
        try {
            await loadToys(queryOptions)
        } catch (err) {
            showErrorMsg('Could not load toys')
            navigate('/');
        }
    }
    async function loadLabels() {
        try {
            await setLabels()
        } catch (err) {
            showErrorMsg('Could not load labels')
        }
    }

    function onSetQueryOptions(queryOptions) {
        setQueryOptions(queryOptions)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy was remove successfully')

        } catch (err) {
            showErrorMsg('Unable to remove')

        }

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