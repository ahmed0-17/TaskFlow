import React from 'react'
import { deleteTodo, completetodo } from '../features/todo/todoSlices'
import { useDispatch, useSelector } from 'react-redux'
import { setEditingTodo } from '../features/todo/todoSlices'

function TodoList() {
  const todos = useSelector((state) => state.todo.todos)
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)

  return (
    <div className={`rounded-[1.75rem] border p-5 ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-900'}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Tasks</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage your current work and keep progress visible.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {todos.length} {todos.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <ol className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`grid gap-4 rounded-3xl border p-4 ${
              todo.isCompleted
                ? 'border-slate-200 bg-green-200 text-slate-800 dark:border-slate-70 '
                : 'border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
            }`}
          >
            <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}>
              <p className={`text-sm font-medium ${todo.isCompleted ? 'line-through  opacity-80' : ''}`}>
                {todo.value}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-full border hover:cursor-pointer border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  onClick={() => dispatch(completetodo(todo.id))}
                >
                  {todo.isCompleted ? 'Undo' : 'Complete'}
                </button>
                <button
                  disabled={todo.isCompleted}
                  type="button"
                  className={`hover:cursor-pointer ${todo.isCompleted ? 'bg-slate-800 text-slate-300  dark:text-slate-400' : 'bg-transparent text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'} rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold transition`}
                  onClick={() => dispatch(setEditingTodo(todo))}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="hover:cursor-pointer rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950/70 dark:text-red-300 dark:hover:bg-red-900/80"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default TodoList
