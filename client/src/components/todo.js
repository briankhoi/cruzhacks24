import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './todo.css';

export default function ToDo() {
    const [value, setValue] = useState(""); 
    const [toDoList, setToDoList] = useState([]);

    const handleSubmit = event => { 
        event.preventDefault();
        if (!value) return; 
        addToDo(value);
        setValue('');
    };
    /* add tasks to to-do list */
    const addToDo = todo => {
        setToDoList([...toDoList, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };

    /* Toggles between the completed state of To-do */
    const toggleComplete = id => {
        setToDoList(toDoList.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed } : todo));
    }

    /* Toggles between the edited state of To-do */
    const toggleEditing = id => {
        setToDoList(toDoList.map(todo => 
            todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo));
    };

    /*Discards edits*/
    const discardEdits = id => {
        setToDoList(toDoList.map(todo => 
            todo.id === id ? {...todo, isEditing: false, task: todo.originalTask } : todo));
    };

    /* To edit */
    const handleEditChange = (id, newTask) => {
        setToDoList(toDoList.map(todo => 
            todo.id === id ? {...todo, task: newTask} : todo));
    };
    /* To delete */
    const deleteToDo = id => {
        setToDoList(toDoList.filter(todo => todo.id !== id));
    };

    return (
        <><div class='container'>
            <h2>To-do List</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='What&#39;s on your to-do list today?'
                />
                <div className="button">
                    <button type="submit" id="submit">Add Task</button>
                </div>
            </form>
            <div>
                {toDoList.map(todo => (
                    <div key={todo.id} style={{ display: 'flex'}}>
                        {todo.isEditing ? (
                            <input 
                                type="text" 
                                value={todo.task} 
                                onChange={(e) => handleEditChange(todo.id, e.target.value)}
                            />
                        ) : (
                            <span 
                                onClick={() => toggleComplete(todo.id)}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}> 
                                {todo.task}
                            </span>
                        )}
                        <div className="button2">
                                {todo.isEditing ? (
                                    <div>
                                    <img
                                        src="save-icon.png"
                                        alt="Save"
                                        id="save"
                                        onClick={() => toggleEditing(todo.id)}
                                    />
                                    <img
                                        src="x.png"
                                        alt="Discard"
                                        id="discard"
                                        onClick={() => discardEdits(todo.id)}
                                    />
                                    </div>
                                ) : (
                                    <div>
                                    <img src="edit2.png" alt="Edit" width="24" onClick={() => toggleEditing(todo.id)}/>
                                    <img src="trash.png" alt="Delete" width="24" onClick={() => deleteToDo(todo.id)}/>
                                    </div>
                                )}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}