import { toyService } from "../services/toy.service.local"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)
    },[])
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
                <i className="fa-solid fa-circle-xmark"></i>                Out of stock
            </span>}</p>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
    </div>

}