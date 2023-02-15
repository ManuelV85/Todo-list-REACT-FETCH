import React from "react";
import { useState } from "react";
//include images into your bundle

//create your first component


const Home = () => {
    const [newTask, setNewTask] = useState([])
	// Se agregó el estado para el valor del input
	const [taskValue, setTaskValue] = useState("");
    const validate = (e) => {
        if(e.key ==='Enter'){
			// Se cambió el valor que se le da a la tarea por el valor del estado
            setNewTask(current => [...current, taskValue])
            e.target.value = "";
			setTaskValue("")
        }
    }
const deleteTask = (index) => {
	//Obtenemos el índice a traves del botón de eliminar, eliminamos ese espacio del array
	//y retornamos el nuevo array sin ese elemento
	 setNewTask(current =>[
        ...current.slice(0, index),
        ...current.slice(index + 1, current.length)
        ]);
}
  return (
    <div className="container">
        <div className="card">
        <div className="card-body">
            <h5> Task List.</h5>
            <input  type="text" value={taskValue} className="form-control" placeholder="Enter task" onChange={(e) => setTaskValue(e.target.value)} onKeyDown={(e) => validate(e)}/>
			<p></p>
			<ul className="list-group">
            {newTask && newTask?.map ((item, index) => {
                return <li key={index} onClick ={() => deleteTask(index)}  className="list-group-item">{item} <button  type="button" className="btn-close" aria-label="Close"></button></li>
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
