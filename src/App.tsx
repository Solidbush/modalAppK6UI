import {useEffect, useState} from 'react'
import './App.css'
import {Button, useModal} from "k6-ui/v2";
import {IFormData} from "./components/modalForm/form/form.tsx";
import Modal from "./components/modalForm/modal/modal.tsx";

function App() {
    useEffect(() => {
        const modalRoot = document.createElement('div')
        modalRoot.setAttribute('id', 'modal-id')
        document.body.appendChild(modalRoot)
        sessionStorage.clear()
        return () => {
            modalRoot.remove()
        }
    }, [])
    const [data, setData] = useState<IFormData>({title: '', description: '', actionTypes: [], results: []})
    const [isShow, toggleShow] = useModal()
    const handleSubmit = (values: object): Promise<boolean> => {
        return new Promise((resolve) => {
            setData(values as IFormData);
            toggleShow();

            console.log("Фильтр применён с данными:", values);

            resolve(true);
        });
    };
    return (
        <div>
            <Button label={"Открыть модальное окно"} onClick={() => toggleShow()} />
            <Modal data={data} toggleShow={toggleShow} isShow={isShow} onSubmit={handleSubmit}/>
        </div>
    )
}

export default App
