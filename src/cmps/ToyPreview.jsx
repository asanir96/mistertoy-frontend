export function ToyPreview({ toy }) {
    const isInStock = toy.inStock
    return <div className="toy-preview">
        <img src='./src/assets/img/horse-toys-icon.png' alt="" />
        <h3>{toy.name}</h3>
        <p className="toy-labels">{toy.labels?.map(label => {
            return <span className={`label-${label}`}>{label}</span>
        })}</p>
        <p className={`toy-in-stock ${isInStock ? 'in-stock' : 'out-of-stock'}`}>{isInStock ?
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