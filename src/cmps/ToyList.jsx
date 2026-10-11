import { ToyPreview } from "./ToyPreview"
import { Link, useNavigate } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy }) {
    const navigate = useNavigate()

    function onCardClick(toyId, ev) {
        const target = ev.target

        if (target.className === 'remove-btn') {
            onRemoveToy(toyId, ev)
        } else if (target.className === 'edit-btn') {
            navigate(`/toy/edit/${toyId}`)
        } else {
            navigate(`/toy/${toyId}`)
        }
    }
    if (!toys.length) return <div>No matching toys...</div>
    
    return <section>
        <ul className="toy-list">
            {toys.map(toy => {
                return <li key={`list-item-${toy._id}`}>
                    <div onClick={ev => onCardClick(toy._id, ev)} key={`toy-card-${toy._id}`} className="toy-card">
                        <ToyPreview toy={toy} />
                        <button className="remove-btn">Remove</button>
                        <button className="edit-btn">Edit</button>
                    </div>
                </li>
            })}
        </ul>
    </section>
}