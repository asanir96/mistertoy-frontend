export function ToyPreview({ toy }) {
    const isInStock = toy.inStock
    return <div className="toy-preview">
        <img src='./src/assets/img/horse-toys-icon.png' alt="" />
        <h3>{toy.name}</h3>
        <p className="toy-labels">{toy.labels?.map(label => {
            return <Chip label={label} sx={{
                fontSize: '0.7em', marginInline: '0.25em', '& .MuiChip-label': {
                    padding: '0px 6px',
                }, borderRadius: '10px', height: '2em'
            }} />
        })}</p>
        <InStockLabel inStock={toy.inStock} style={{
            fontSize: '0.7em', padding: '0 0.5px', height: '2em', '& .MuiChip-icon': {
                fontSize: '0.7rem',
            }, borderRadius: '10px', height: '2em'
        }} />
    </div>
}