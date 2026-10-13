import { useState, useEffect, useRef } from 'react'
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

import { LabelDropdown } from './LabelDropdown.jsx'
export function ToySort({ queryOptions, onSetQueryOptions, labels }) {

    const [sortToEdit, setSortToEdit] = useState({ ...queryOptions.sort })
    onSetQueryOptions = useRef(utilService.debounce(onSetQueryOptions, 300))

    useEffectUpdate(() => {
        onSetQueryOptions.current({ sort: sortToEdit, filterBy: { ...queryOptions.filterBy } })
    }, [sortToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = field === 'sortDir' ? +value : value

        setSortToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (
        <div className='toy-sort'>
            <label htmlFor="ascending">▲</label>
            <input
                onChange={handleChange}
                name="sortDir"
                type="radio"
                id="ascending"
                value="1"
                checked={sortToEdit.sortDir === 1} />

            <label htmlFor="descending">▼</label>
            <input
                onChange={handleChange}
                name="sortDir"
                type="radio"
                id="descending"
                value="-1"
                checked={sortToEdit.sortDir === -1} />

            <select name="sortBy"
                id=""
                onChange={handleChange}>
                <option value="name" selected={sortToEdit.sortBy === 'name'}>name</option>
                <option value="price" selected={sortToEdit.sortBy === 'price'}>price</option>
                <option value="created" selected={sortToEdit.sortBy === 'created'}>created time</option>
            </select>
        </div>

    )

}