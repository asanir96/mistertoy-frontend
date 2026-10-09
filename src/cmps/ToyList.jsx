import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {

    return <section>
        <ul className="toy-list">
            {toys.map(toy => {
                return <li key={`list-item-${toy._id}`}>
                    <div key={`toy-card-${toy._id}`} className="toy-card">
                        <ToyPreview toy={toy}/>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                    </div>
                </li>
            })}
        </ul>
    </section>
}