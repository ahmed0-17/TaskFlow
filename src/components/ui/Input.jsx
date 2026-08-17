function Input({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={`
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-900
      px-5
      py-3
      text-slate-100
      placeholder:text-slate-500
      outline-none

      transition-all

      focus:border-indigo-500
      focus:ring-4
      focus:ring-indigo-500/20

      ${className}
      `}
    />
  );
}



export { Input };
export default Input;