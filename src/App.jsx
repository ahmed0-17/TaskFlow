import { useSelector } from 'react-redux'
import TodoForm from './components/todoForm'
import TodoList from './components/todoList'
import './App.css'
import Theme from './components/theme'

function App() {
  const theme = useSelector((state) => state.theme.theme)

  return (
    <div className={`min-h-screen px-4 py-8 ${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-xl shadow-slate-500/10 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/95">
        <header className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Task manager</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Todo Professional</h1>
            </div>
            <Theme />
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            A polished, calm workspace for tracking tasks, editing smoothly, and completing the day with clarity.
          </p>
        </header>

        <section className="grid gap-6">
          <TodoForm />
          <TodoList />
        </section>
      </div>
    </div>
  )
}

export default App
