import { useSelector } from "react-redux";
import { useEffect } from "react";
import { loadToys,removeToy } from "../store/actions/toy";
import { ToyList } from "../cmps/ToyList";
import { showErrorMsg,showSuccessMsg } from "../services/event-bus.service";
export function ToyIndex() {
    const toys = useSelector(storedState => storedState.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function onRemoveToy(toyId){
        removeToy(toyId)
        .then(()=>showSuccessMsg('Toy was remove successfully'))
        .catch(()=>showErrorMsg('Unable to remove'))
    }

    if (!toys || !toys.length) return <div>Loading...</div>

    return <main>
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy} />
    </main>
}