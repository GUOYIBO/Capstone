const ItemDetail = ({entry, setShowModal}) =>{
    console.log('Item detail entry', entry)
    return (
        <h1>{entry.entry.item.name}</h1>
    )
}

export default ItemDetail