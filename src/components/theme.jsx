import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

function Theme() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
console.log(theme);
  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Theme"
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 ${
        theme === "light"
          ? "border-slate-300 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
          : "border-slate-700 bg-slate-800 text-yellow-400 shadow-sm hover:bg-slate-700"
      }`}
    >
      {theme === "light" ? (
        <FaMoon size={18} />
      ) : (
        <FaSun size={18} />
      )}
    </button>
  );
}

export default Theme;