import { toyService } from "../services/toy.service"
import { useEffect, useState } from "react"
import { Link, useParams,useNavigate } from 'react-router-dom'
import { showErrorMsg } from "../services/event-bus.service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    async function loadToy() {
        try {
            const selectedToy = await toyService.getById(toyId)
            setToy(selectedToy)
        } catch (err) {
            showErrorMsg('Something went wrong')
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>

    return <div className="toy-preview">
        <img src='./src/assets/img/horse-toys-icon.png' alt="" />
        <h3>{toy.name}</h3>
        <p className={`toy-in-stock ${toy.inStock ? 'in-stock' : 'out-of-stock'}`}>{toy.inStock ?
            <span>
                <i className="fa-solid fa-circle-check"></i>
                In stock
            </span> :
            <span>
                <i className="fa-solid fa-circle-xmark"></i>Out of stock
            </span>}</p>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
    </div>

}