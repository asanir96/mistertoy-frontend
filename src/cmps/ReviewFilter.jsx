import { utilService } from "../services/util.service.js"

import { useState, useRef } from 'react'

import { useEffectUpdate } from '../custom-hooks/useEffectUpdate.js'

import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpWideShort, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons'

export function ReviewFilter({ queryOptions, onSetQueryOptions, labels }) {
    const [queryOptionsToEdit, setQueryOptionsToEdit] = useState(queryOptions)
    onSetQueryOptions = useRef(utilService.debounce(onSetQueryOptions, 300))
    const isAscending = +queryOptionsToEdit.sort.sortDir > 0

    console.log('isAscending', isAscending)
    useEffectUpdate(() => {
        onSetQueryOptions.current(queryOptionsToEdit)
    }, [queryOptionsToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target


        if (field === 'rating' || field === 'sortDir') {
            value = +value
        } else if (type === 'radio') {
            value = (value === "true")
        }

        if (field === 'sortBy' || field === 'sortDir') {
            setQueryOptionsToEdit((prevOptions) => ({ ...prevOptions, sort: { ...prevOptions.sort, [field]: value } }))

        } else {
            setQueryOptionsToEdit((prevOptions) => ({ ...prevOptions, filterBy: { ...prevOptions.filterBy, [field]: value } }))
        }
    }

    return (
        <section className="review-filter full">


            <TextField
                sx={{ gridColumn: '1', gridRow: '1' }}
                id="outlined-required"
                label="Search by user fullname"
                name="userFullname"
                value={queryOptionsToEdit.filterBy.userFullname}
                onChange={handleChange}
                size="small"
            />

            <TextField
                sx={{ gridColumn: '1', gridRow: '2' }}

                id="outlined-required"
                label="Search by toy name"
                name="toyName"
                value={queryOptionsToEdit.filterBy.toyName}
                onChange={handleChange}
                size="small"
            />

            <div className="rating">
                <label>
                    Filter By rating
                </label>
                <Rating
                    sx={{ justifySelf: 'end', alignSelf: 'center' }}
                    name="rating"
                    value={queryOptionsToEdit.filterBy.rating}
                    onChange={handleChange}
                />
            </div>

            <div className="review-sort">

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="review-sort-select-label">Sort reviews</InputLabel>
                        <Select
                            labelId="review-sort-select-label"
                            name='sortBy'
                            defaultValue={'toy.name'}
                            size="small"
                            value={queryOptionsToEdit.sort.sortBy}
                            label="Sort Reviews"
                            onChange={handleChange}
                        >
                            <MenuItem value={'rating'}>Rating</MenuItem>
                            <MenuItem value={'by.fullname'}>User full name</MenuItem>
                            <MenuItem value={'toy.name'}>Toy name</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Button
                    name='sortDir'
                    value={-(+queryOptionsToEdit.sort.sortDir)}
                    variant="contained"
                    startIcon={<FontAwesomeIcon icon={isAscending ? faArrowUpWideShort : faArrowDownShortWide} />}

                    onClick={handleChange}>
                    {isAscending ? 'Ascending' : 'Descending'}
                </Button>

            </div>



            <Divider
                sx={{ gridColumn: '1 / 4', gridRow: '3' }}
                className='full' />
        </section>

    )

}