import React from "react";
import { useState, useEffect } from "react";
//include images into your bundle

//create your first component


const Home = () => {
    const [newTask, setNewTask] = useState([])
	// Se agregó el estado para el valor del input
	const [taskValue, setTaskValue] = useState("");
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const getTasks = async ()=>{
            try {
                const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/manuelv85")
                if(!response.ok) {
                    throw new Error(response.status) 
                }
                const obj = await response.json()
                console.log(obj)
                setTasks(obj)
            }
            catch(error) {
             console.log(error)
            }
        }
        getTasks()
    },[]) 
    
    const validate = async (e) => {
        if(e.key ==='Enter'){
			// Se cambió el valor que se le da a la tarea por el valor del estado
            const obj = [ ...tasks,{"label": e.target.value, "done": false}]
            const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/manuelv85", {
                method: "PUT", body: JSON.stringify(obj), mode: "cors", 
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
            })
            setNewTask(current => [...current, taskValue])
            setTasks(current=> [...obj])
            e.target.value = "";
			setTaskValue("")
        }
    }
const deleteTask = async (index) => {
	//Obtenemos el índice a traves del botón de eliminar, eliminamos ese espacio del array
	//y retornamos el nuevo array sin ese elemento
    const tmp = tasks
    tmp.splice(index, 1)
    const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/manuelv85", {
        method: "PUT", body: JSON.stringify(tmp), mode: "cors", 
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
       
    )
    setTasks([...tmp])
	 setNewTask(current =>[
        ...current.slice(0, index),
        ...current.slice(index + 1, current.length)
        ]);
}
  return (
    <div className="container">
        <div className="card">
        <div className="card-body">
            <h5> TODO LIST</h5>
            <input  type="text" value={taskValue} className="form-control" placeholder="Add New Task ..." onChange={(e) => setTaskValue(e.target.value)} onKeyDown={(e) => validate(e)}/>
			<p></p>
			<ul className="list-group">
            {tasks && tasks?.map ((item, index) => {
                return <li key={index} onClick ={() => deleteTask(index)}  className="list-group-item">{item.label} <button  type="button" className="btn-close" aria-label="Close"></button></li>
            })
            }
	     	</ul>
			<p></p>
			<ul className="list-group" >
                <li id="first" className="list-group-item"> Added tasks:  {newTask.length<1? "No Tasks, add task": newTask.length}</li>
            </ul>
        </div>
        </div>
    </div>
  );
};

export default Home;
