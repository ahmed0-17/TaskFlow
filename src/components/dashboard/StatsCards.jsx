import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  CheckCircle2,
  CircleDashed,
  Clock3,
  ListTodo,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

function StatsCards() {
  const todos = useSelector((state) => state.todo.todos);

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    (task) => task.status === "Completed"
  ).length;

  const todoTasks = todos.filter(
    (task) => task.status === "Todo"
  ).length;

  const inProgressTasks = todos.filter(
    (task) => task.status === "In Progress"
  ).length;

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      subtitle: "All created tasks",
      icon: ListTodo,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Completed",
      value: completedTasks,
      subtitle: "Finished work",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Todo",
      value: todoTasks,
      subtitle: "Waiting to start",
      icon: CircleDashed,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      subtitle: "Currently working",
      icon: Clock3,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
          >
            <Card
              className="
                group
                rounded-3xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-indigo-500/40
                hover:shadow-xl
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {card.title}
                  </p>

                  <h2 className="mt-4 text-4xl font-black text-foreground">
                    {card.value}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.subtitle}
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
                >
                  <Icon
                    className={card.color}
                    size={28}
                  />
                </div>
              </div>

              <div className="mt-6 h-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "100%",
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.3,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                />
              </div>
            </Card>
          </motion.div>
        );
      })}
    </section>
  );
}

export default StatsCards;