export function ToyPreview({ toy }) {
    const isInStock = toy.inStock
    return <div className="toy-preview">
        <img src='./src/assets/img/horse-toys-icon.png' alt="" />
        <h3>{toy.name}</h3>
        <p className="toy-labels">{toy.labels?.map(label => {
            return <span className={`label-${label}`}>{label}</span>
        })}</p>
        <InStockLabel inStock={toy.inStock} style={{
            fontSize: '0.7em', padding: '0 0.5px', height: '2em', '& .MuiChip-icon': {
                fontSize: '0.7rem',
            }, borderRadius: '10px', height: '2em'
        }} />
    </div>
}