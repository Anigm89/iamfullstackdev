import { useState } from "react";

function InputCreate ({updateData}) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState('')
    const urlApi = 'http://localhost:3000/create'

    const send = async (e) => {
        e.preventDefault();
        try{
            if(title.trim() !== ''){
                const response = await fetch(urlApi, {
                    method: 'POST', // Método HTTP
                    headers: {
                    'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                    },
                    body: JSON.stringify({title}), // Convertimos el payload de JS a JSON
                });
                if(response.ok){
                    const tarea = await response.json()    
                    setNewTask(tarea.title);
                    setTitle('')
                    setError(null)
                    updateData();
                }
                else{
                    setError('algo ha fallado')
                }
            }
            else{
                setError('introduce una tarea')
            }

        }
        catch(err){
            console.log(err)
        }
    }
    
    return (
        <>
            <form onSubmit={send}>
                <input type="text" placeholder="añade una tarea" value={title} onChange={e => setTitle(e.target.value)} />
                <button type="submit">Añadir</button>
            </form>
            <p>{newTask} </p>
        </>
    )
}

export default InputCreate;