import { useState, useEffect, useRef } from 'react'
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { LabelDropdown } from './LabelDropdown.jsx'
export function ToyFilter({ queryOptions, onSetQueryOptions, labels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...queryOptions.filterBy })
    onSetQueryOptions = useRef(utilService.debounce(onSetQueryOptions, 300))

    useEffectUpdate(() => {
        onSetQueryOptions.current({ sort: { ...queryOptions.sort }, filterBy: filterByToEdit })
    }, [filterByToEdit])

    function handleChange({ target }) {

        let { value, name: field, type } = target

        value = type === 'number' ? +value : value

        if (type === 'number') {
            value = +value
        } else if (type === 'radio') {
            value = (value === "true")
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

    }

    return (
        <section className="toy-filter full">
            <h2>Toy Filter</h2>
            <form className='form-layout'>

                <TextField
                    id="outlined-required"
                    label="Search by name"
                    name="name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                {/* <input
                    type="radio"
                    id="out-of-stock"
                    name="inStock"
                    value={false}
                    checked={filterByToEdit.inStock === false}
                    onChange={handleChange} />
                <label for="out-of-stock">Out of stock</label>

                <input
                    type="radio"
                    id="in-stock"
                    name="inStock"
                    value={true}
                    onChange={handleChange}
                    checked={filterByToEdit.inStock === true} />
                <label for="in-stock">In stock</label> */}


                <RadioGroup row  name="inStock"
                    onChange={handleChange}
                >
                    <FormControlLabel value={true} control={<Radio />} label="In stock" />
                    <FormControlLabel value={false} control={<Radio />} label="Out of stock" />
                </RadioGroup>

                < LabelDropdown
                    labels={labels}
                    filterBy={filterByToEdit}
                    handleChange={handleChange} />

            </form>
        </section>
    )

}