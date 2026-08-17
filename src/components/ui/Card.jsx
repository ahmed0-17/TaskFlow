import { motion } from "framer-motion";

function Card({
  children,
  className = "",
  hover = true,
  glass = false,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              transition: {
                duration: 0.25,
              },
            }
          : {}
      }
      className={`
        relative overflow-hidden rounded-[28px]
        border border-border
        bg-card text-card-foreground
        shadow-[0_20px_50px_rgba(0,0,0,0.15)]
        transition-all duration-300

        ${
          glass
            ? "bg-background/60 backdrop-blur-2xl"
            : ""
        }

        ${className}
      `}
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-opacity duration-300
          hover:opacity-100
          bg-gradient-to-br
          from-indigo-500/10
          via-transparent
          to-cyan-500/10
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default Card;
export { Card };