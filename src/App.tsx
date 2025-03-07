import { useState } from "react";
import "./App.css";
import { config } from './config/congis';
import { usePostRequest } from "./hooks/usePostRequest";

function App() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState("");
    const { httpPost } = usePostRequest();

    const addTask = async () => {
        if (newTask.trim()) {
            const task = newTask.trim();
            const result = await httpPost(config.http.url + '/save', { task });
            if (result.success) {
                setTasks([...tasks, task]);
                setNewTask("");
            }
        }
    };

    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (<>
        <div className="app">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                <li key={index}>
                    {task}
                    <button onClick={() => removeTask(index)}>Remove</button>
                </li>
                ))}
            </ul>
        </div>
    </>);
}

export default App;
