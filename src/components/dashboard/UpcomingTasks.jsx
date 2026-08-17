import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  CalendarClock,
  AlertTriangle,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

function UpcomingTasks() {
  const todos = useSelector((state) => state.todo.todos);


  const today = new Date();
  const todayString =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  // Upcoming tasks
  const upcomingTasks = [...todos].filter((task) => {
      if (!task.dueDate) return false;
      if (task.status === "Completed") return false;
      return task.dueDate >= todayString;
    }).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5);

  const badgeColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-500 border-red-500/30";
      case "Medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      default: return "bg-green-500/10 text-green-500 border-green-500/30";
    }
  };

  const remainingDays = (date) => {
    const [year, month, day] = date
      .split("-")
      .map(Number);

    const dueDate = new Date(
      year,
      month - 1,
      day
    );

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    const diff = dueDate - currentDate;

    return Math.round(
      diff / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <Card className="rounded-3xl p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-foreground">
          Upcoming Tasks
        </h2>

        <CalendarClock
          className="text-muted-foreground"
          size={20}
        />

      </div>

      {/* Tasks */}

      {upcomingTasks.length === 0 ? (

        <div className="py-10 text-center">

          <CalendarClock
            size={35}
            className="mx-auto mb-3 text-muted-foreground"
          />

          <p className="text-muted-foreground">
            No upcoming tasks.
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Add a task with today's or a future due date.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {upcomingTasks.map((task, index) => {

            const days = remainingDays(
              task.dueDate
            );

            return (
              <motion.div
                key={task.id}

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * 0.08,
                }}

                className="rounded-2xl border border-border bg-background p-4"
              >

                {/* Task Header */}

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="truncate font-semibold text-foreground">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.category}
                    </p>

                  </div>

                  <Badge
                    variant="outline"
                    className={badgeColor(
                      task.priority
                    )}
                  >
                    {task.priority}
                  </Badge>

                </div>

                {/* Date */}

                <div className="mt-4 flex items-center justify-between gap-3">

                  <span className=" text-sm text-muted-foreground">
                    📅 {task.dueDate}
                  </span>

                  <span
                    className={`flex items-center gap-1 text-sm ${
                      days <= 1
                        ? "text-red-500"
                        : "text-cyan-500"
                    }`}
                  >

                    <AlertTriangle size={15} />

                    {days === 0
                      ? "Today"
                      : `${days} day${
                          days > 1
                            ? "s"
                            : ""
                        } left`}

                  </span>

                </div>

              </motion.div>
            );
          })}

        </div>
      )}

    </Card>
  );
}

export default UpcomingTasks;