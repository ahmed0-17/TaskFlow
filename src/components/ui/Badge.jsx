function Badge({
  children,
  color = "indigo",
}) {
  const colors = {
    indigo:
      "bg-indigo-500/15 text-indigo-400",

    emerald:
      "bg-emerald-500/15 text-emerald-400",

    red:
      "bg-red-500/15 text-red-400",

    amber:
      "bg-amber-500/15 text-amber-400",

    cyan:
      "bg-cyan-500/15 text-cyan-400",
  };

  return (
    <span
      className={`
      rounded-full
      px-3
      py-1
      text-xs
      font-semibold
      ${colors[color]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
export { Badge };
