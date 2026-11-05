import { toyService } from "../services/toy.service"
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { showErrorMsg } from "../services/event-bus.service"
import { ToyMsgs } from "../cmps/ToyMsgs"
import { AddMsg } from "../cmps/AddMsg"
import { useSelector } from "react-redux"
import { InStockLabel } from "../cmps/InStockChip"
import Chip from '@mui/material/Chip';
const PLACEHOLDER_URL = '../src/assets/img/horse-toys-icon.png'


export function ToyDetails() {
    const user = useSelector(storedState => storedState.authModule.user)
    const toys = useSelector(storedState => storedState.toyModule.toys)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toys])

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

    return <section className="toy-details details-layout">
        {toy.imgUrl ?
            <img src={toy.imgUrl} alt="" /> :
            <img src={PLACEHOLDER_URL} alt="" />}
        <section className="details-info">

            <h3>{toy.name}</h3>

            <p className="toy-price"> <span>${toy.price.toLocaleString()}</span></p>

            <InStockLabel inStock={toy.inStock} style={{ fontSize: '0.7em', padding: '0 1px' }} />

            {toy.labels && <div>Categories: {toy.labels.map(label => {
                return <Chip label={label} sx={{ marginInline: '0.25em' }} />
            })}</div>}
        </section>


        <section className="toy-msgs">
            <h3>Toy Messages</h3>
            <ToyMsgs msgs={toy.msgs || []} />
            {user && user.isAdmin && <AddMsg toy={toy} />}
        </section>
    </section>

}