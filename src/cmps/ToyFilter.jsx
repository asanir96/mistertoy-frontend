import { useState, useEffect, useRef } from 'react'
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

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

    function handleMultiSelectChange({ target }) {
        let { value, name: field, type } = target

        if (!filterByToEdit.labels) {
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: [value] }))
        } else if (filterByToEdit.labels?.includes(value)) {
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: prevFilter.labels.filter(label => label !== value) }))
        } else {
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: prevFilter.labels ? [...prevFilter.labels, value] : [value] }))
        }

    }

    return (
        <section className="car-filter full main-layout">
            <h2>Toy Filter</h2>
            <form >
                <label htmlFor="vendor">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <input
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
                <label for="in-stock">In stock</label>


                < LabelDropdown
                    labels={labels}
                    filterBy={filterByToEdit}
                    handleChange={handleMultiSelectChange} />

                {/* <label for="labels">Labels:</label>
                <select name="labels" id="cars" multiple size={labels.length} onChange={handleChange}>
                    {labels.map(label => {
                        return <option key={`option-${label}`} value={label}>{label}</option>
                    })}
                </select> */}

            </form>
        </section>
    )

}