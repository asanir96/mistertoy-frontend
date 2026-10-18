
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import NumberField from '../cmps/NumberField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { LabelDropdown } from "../cmps/LabelDropdown";
import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveToy } from "../store/actions/toy"

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
]

export function ToyEdit() {
    const [toyToEdtit, setToyToEdit] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
        
    useEffect(() => {
        if (params.toyId) {
            toyService.getById(params.toyId)
                .then(toy => setToyToEdit(toy))
        } else {
            setToyToEdit(toyService.getEmptyToy)
        }
    }, [])

    function handleChange(ev) {
        const { target } = ev

        if (!target) {
            setToyToEdit(prev => ({ ...prev, price: ev }))
            return
        }

        let { type, name: field, value } = target
        if (type === 'number') {
            value = +value
        } else if (type === 'checkbox') {
            value = target.checked
        }

        setToyToEdit(prev => ({ ...prev, [field]: value }))
    }

    function onSaveEdit(ev) {
        ev.preventDefault()
        saveToy(toyToEdtit)
            .then(toy => {
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Could not save toy`)
            })

    }

    if (!toyToEdtit) return <div>Loading...</div>

    return <section className="toy-edit">
        <h3>{`${toyToEdtit._id ? 'Edit' : 'Add'} a toy`}</h3>
        <form
            onSubmit={onSaveEdit}>

            <TextField
                className="edit-item"
                id="outlined-required"
                label="Name"
                name="name"
                helperText={`${toyToEdtit._id ? 'Edit' : 'Add'} the toy name`}
                value={toyToEdtit.name}
                onChange={handleChange}
            />

            <NumberField
                className="edit-item"
                helperText={`${toyToEdtit._id ? 'Edit' : 'Add'} the toy price with a minimum of $0`}
                label="Price"
                name="price"
                min={0}
                value={toyToEdtit.price}
                onValueChange={handleChange} />

            <LabelDropdown
                className="edit-item"
                labels={labels}
                selectedLabels={toyToEdtit.labels}
                handleChange={handleChange} />

            <FormGroup>
                <FormControlLabel
                    control={<Switch
                        name="inStock"
                        checked={toyToEdtit.inStock}
                        onChange={handleChange} />}
                    label="In Stock" />
            </FormGroup>

            <input type="submit" value="Save" />
        </form>
    </section>

}