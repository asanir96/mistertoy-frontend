
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { toyService } from "../services/toy.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveToy } from "../store/actions/toy"

export function ToyEdit() {
    const [toyToEdtit, setToyToEdit] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log('toyToEdtit',toyToEdtit)
    useEffect(() => {
        if (params.toyId) {
            toyService.getById(params.toyId)
                .then(toy => setToyToEdit(toy))
        } else {
            setToyToEdit(toyService.getEmptyToy)
        }
    }, [])

    function handleChange({ target }) {
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
            <label htmlFor="name">Toy Name:</label>
            <input
                name="name"
                type="text"
                placeholder="Enter a toy name"
                value={toyToEdtit.name}
                onChange={handleChange} />

            <label htmlFor="price">Toy Price:</label>
            <input
                name="price"
                type="number"
                value={toyToEdtit.price}
                onChange={handleChange} />

            <label htmlFor="price">In Stock</label>
            <input
                name="inStock"
                type="checkbox"
                checked={toyToEdtit.inStock}
                onChange={handleChange} />

            <input type="submit" value="Save" />
        </form>
    </section>

}