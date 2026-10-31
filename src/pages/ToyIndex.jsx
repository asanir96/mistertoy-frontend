import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { FloatingAddBtn } from "../cmps/FloatingAddBtn";
import { loadToys, removeToy, setQueryOptions, setLabels, loadStats } from "../store/actions/toy";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { ToySort } from "../cmps/ToySort";

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function ToyIndex() {
    const toys = useSelector(storedState => storedState.toyModule.toys)
    const isLoading = useSelector(storedState => storedState.toyModule.isLoading)
    const queryOptions = useSelector(storedState => storedState.toyModule.queryOptions)
    const labels = useSelector(storedState => storedState.toyModule.labels)
    const user = useSelector(storedState=>storedState.authModule.user)
    const navigate = useNavigate()

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


    return <section className="toys main-layout full position-relative">
        <div className="sort-filter">
        {labels && <ToyFilter
            queryOptions={queryOptions}
            onSetQueryOptions={onSetQueryOptions}
            labels={labels}
        />}

        <ToySort
            queryOptions={queryOptions}
            onSetQueryOptions={onSetQueryOptions} />
        </div>


        {isLoading ?
            <div className="loader position-absolute"></div> :
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy} />
        }
        {user && user.isAdmin && <FloatingAddBtn />}
    </section>
}