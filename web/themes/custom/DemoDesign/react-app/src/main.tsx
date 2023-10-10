import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const entrypoint = document.getElementById('todo-app')!

const tasks = entrypoint.getAttribute('items')!.split('/').map((item, index) => ({
  id: index,
  title: item.trim(),
  completed: false,
}))

ReactDOM.createRoot(entrypoint).render(
  <React.StrictMode>
    <App tasks={tasks}/>
  </React.StrictMode>,
)
