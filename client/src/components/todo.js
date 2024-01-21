import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
        <> <h1>To-do List</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='What is the task today?' 
                />
                <button type="submit">Add Task</button>
            </form>
            <div>
                {toDoList.map(todo => (
                    <div key={todo.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <div>
                            <button onClick={() => toggleEditing(todo.id)}>
                                {todo.isEditing ? 'Save' : 'Edit'}
                            </button>
                            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}