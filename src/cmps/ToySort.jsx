import { useState, useEffect, useRef } from 'react'
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export function ToySort({ queryOptions, onSetQueryOptions, labels }) {

    const [sortToEdit, setSortToEdit] = useState({ ...queryOptions.sort })
    onSetQueryOptions = useRef(utilService.debounce(onSetQueryOptions, 300))

    console.log('sortToEdit', sortToEdit)
    useEffectUpdate(() => {
        onSetQueryOptions.current({ sort: sortToEdit, filterBy: { ...queryOptions.filterBy } })
    }, [sortToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, id } = target
        console.log('target.name', target.target)
        console.log('field', field)
        console.log('target.classList', target.classList)
        // field = target.classList.contains('MuiButtonBase-root') ? 'sortBy' : 'sortDir'

        value = field === 'sortDir' ? +value : value

        setSortToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    return (<div className='toy-sort'>
        <ToggleButtonGroup
            className='sort-by'
            value={sortToEdit.sortBy}
            exclusive
            name="sortBy"
            onChange={handleChange}
            id="sortBy"
        >
            <ToggleButton
                name="sortBy"

                value="name">
                Name
            </ToggleButton>
            <ToggleButton
                name="sortBy"
                value="createdAt">
                Created time
            </ToggleButton>
            <ToggleButton
                name="sortBy"
                value="price" aria-label="right aligned">
                Price
            </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
            className='sort-direction'
            value={sortToEdit.sortDir}
            exclusive
            name="sortDir"
            onChange={handleChange}
            id="sortDir"
        >
            <ToggleButton
                name="sortDir"

                value={1}>
                ⬆            </ToggleButton>
            <ToggleButton
                name="sortDir"
                value={-1}>
                ⬇
            </ToggleButton>
        </ToggleButtonGroup>

    </div>

    );



}