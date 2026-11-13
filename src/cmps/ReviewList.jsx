import { useSelector } from "react-redux"
import { ToyPreview } from "./ToyPreview"
import { Link, useNavigate } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy }) {
    const user = useSelector(storedState => storedState.authModule.user)
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
    if (!toys.length) return <div className="empty-state-msg">No matching toys...</div>

    return <section className="toys">
        <ul className="review-list">
            {toys.map(toy => {
                return <li key={`list-item-${toy._id}`}>

                    <div onClick={ev => onCardClick(toy._id, ev)} key={`toy-card-${toy._id}`} className="toy-card">

                        <ToyPreview toy={toy} />

                        {user && user.isAdmin &&
                            <div className="toy-actions">
                                <button className="remove-btn">Remove</button>
                                <button className="edit-btn">Edit</button>
                            </div>}

                    </div>
                </li>
            })}
        </ul>
    </section>
}