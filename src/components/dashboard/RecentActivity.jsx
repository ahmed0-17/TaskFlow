import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Clock3,
  CheckCircle2,
  Edit3,
  CircleDashed,
} from "lucide-react";

import { Card } from "@/components/ui/Card";

function RecentActivity() {
  const todos = useSelector((state) => state.todo.todos);

  const recentTasks = [...todos]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  const getIcon = (status) => {
    switch (status) {
      case "Completed":
        return (
          <CheckCircle2
            className="text-emerald-500"
            size={20}
          />
        );

      case "In Progress":
        return (
          <Edit3
            className="text-blue-500"
            size={20}
          />
        );

      default:
        return (
          <CircleDashed
            className="text-amber-500"
            size={20}
          />
        );
    }
  };

  return (
    <Card className="rounded-3xl p-6">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">
          Recent Activity
        </h2>

        <Clock3
          className="text-muted-foreground"
          size={20}
        />
      </div>

      {recentTasks.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">
          No activity yet.
        </div>
      ) : (
        <div className="space-y-4">
          {recentTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4"
            >
              <div>
                {getIcon(task.status)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="truncate font-semibold text-foreground">
                  {task.title}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {task.status}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {new Date(
                  task.updatedAt || task.createdAt
                ).toLocaleDateString()}
              </span>
            </motion.div>
          ))}
        </div>
      )}

    </Card>
  );
}

export default RecentActivity;