import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { toggleTheme } from '../features/theme/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

function Theme() {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  return (
    <button
      type="button"
      className={`cursor-pointer inline-flex h-12 w-12 items-center justify-center rounded-full border transition ${
        theme === 'light'
          ? 'border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-100'
          : 'border-slate-700 bg-slate-800 text-slate-100 shadow-sm hover:bg-slate-700'
      }`}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default Theme
