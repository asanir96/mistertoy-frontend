
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import NumberField from '../cmps/NumberField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { useFormik } from 'formik';
import * as Yup from 'yup';

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
                .then(toy => {
                    setToyToEdit(toy)
                    formik.setValues({
                        name: toy.name,
                        price: toy.price,
                        labels: toy.labels,
                        inStock: toy.inStock
                    })
                })
        } else {
            setToyToEdit(toyService.getEmptyToy)
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            labels: [],
            inStock: false
        },
        validationSchema: Yup.object({
            name: Yup.string().trim()
                .min(0, 'Must be at least 1 character')
                .required('Required'),
            price: Yup.number()
                .required('Required'),
            labels: Yup.array()
                .max(3, 'Choose up to 3 labels ')
                .required(),
            inStock: Yup.boolean()
        }),
        onSubmit: values => {
            console.log('changedValues')
            alert(JSON.stringify(values, null, 2));
            saveToy({ ...toyToEdtit, ...values })
                .then(toy => {
                    showSuccessMsg('Toy saved!')
                    navigate('/toy')
                })
                .catch(err => {
                    console.log(err)
                    showErrorMsg(`Could not save toy`)
                })
        },
    });


    if (!toyToEdtit) return <div>Loading...</div>

    return <section className="toy-edit">
        <h3>{`${toyToEdtit._id ? 'Edit' : 'Add'} a toy`}</h3>
        <form
            onSubmit={formik.handleSubmit}>

            <TextField
                className="edit-item"
                id="name"
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name || `${toyToEdtit._id ? 'Edit' : 'Add'} the toy name`}

            />

            <NumberField
                className="edit-item"
                helperText={`${toyToEdtit._id ? 'Edit' : 'Add'} the toy price with a minimum of $0`}
                label="Price"
                name="price"
                min={0}
                value={formik.values.price}
                onValueChange={value => {
                    formik.setFieldValue('price', value)
                }}
            />

            <LabelDropdown
                className="edit-item"
                labels={labels}
                selectedLabels={formik.values.labels}
                handleChange={formik.handleChange}
                formik={formik}
            />

            <FormGroup>
                <FormControlLabel
                    control={<Switch
                        name="inStock"
                        checked={formik.values.inStock}
                        onChange={formik.handleChange} />}
                    label="In Stock" />
            </FormGroup>

            <input disabled={Object.keys(formik.errors).length > 0} type="submit" value="Save" />
        </form>
    </section>

}