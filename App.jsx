import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [priority, setPriority] = useState('Medium')

  const addTask = () => {
    if (taskTitle.trim() === '') return

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: priority,
      status: 'todo'
    }

    setTasks([...tasks, newTask])
    setTaskTitle('')
    setPriority('Medium')
  }

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => task.id === taskId ? { ...task, status: newStatus } : task ))
}

  return (
    <div className="app">
      <h1>Task Management Board</h1>

      <div className="task-input">
        <input type="text" placeholder="Enter a new task..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}></input>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button onClick={addTask}>  Add Task</button>
      </div>

      <div className="board">
        {['todo', 'in-progress', 'done'].map((status) => (
          <div className="column" key={status}>
            <h2>
              {status === 'todo'? 'To Do': status === 'in-progress'? 'In Progress'  : 'Done'}
            </h2>

            { tasks.filter((task) => task.status === status).map((task) => (
              <div className="task" key={task.id}>
                <h3>{task.title}</h3>
                <span>{task.priority}</span>

                <button onClick={() => { setTasks((prevTasks) =>
                prevTasks.filter((t) => t.id !== task.id))}}>
                  Delete
                </button>
                
                {task.status==="todo" && (
                <button onClick={() => moveTask(task.id, 'in-progress')}>
                  Move to In Progress
                </button>)}

                {task.status==="in-progress" && (
                <button onClick={() => moveTask(task.id, 'done')}>
                  Move to Done
                </button>)}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  )
}

export default App