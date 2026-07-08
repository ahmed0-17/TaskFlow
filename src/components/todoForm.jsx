import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updatetodo, setEditingTodo } from '../features/todo/todoSlices'

function TodoForm() {
  const theme = useSelector((state) => state.theme.theme)
  const editingTodo = useSelector((state) => state.todo.editingTodo)
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.value)
    }
  }, [editingTodo])

  function handleSubmit(e) {
    e.preventDefault()

    if (!inputValue.trim()) return

    if (editingTodo) {
      dispatch(
        updatetodo({
          id: editingTodo.id,
          value: inputValue.trim(),
        }
      ),
      setInputValue('')
      )
      dispatch(setEditingTodo(null))
    } else {
      dispatch(addTodo(inputValue.trim()))
    }

    setInputValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 rounded-[1.75rem] border p-5 ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-900'}`}
    >
      <label className="sr-only" htmlFor="todo-input">
        Add a new task
      </label>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          id="todo-input"
          type="text"
          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
            theme === 'light'
              ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-500'
              : 'border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:border-slate-400'
          }`}   
          placeholder="Add a new task..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          type="submit"
          className={`inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition ${
            theme === 'light'
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-slate-100 text-slate-950 hover:bg-slate-200'
          }`}
        >
          {editingTodo ? 'Update task' : 'Add task'}
        </button>
      </div>
    </form>
  )
}

export default TodoForm
