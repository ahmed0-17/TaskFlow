
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Sparkles,
  Clock3,
  CheckCircle2,
  CircleAlert,
  Target,
} from "lucide-react";

function Hero() {
  const todos = useSelector((state) => state.todo.todos);

  const now = new Date();
  const hour = now.getHours();


  const userName = localStorage.getItem("name") || "User";
  const greeting = useMemo(() => {
    if (hour >= 5 && hour < 12) {
      return {
        title: "Good Morning",
        message:
          "Start your day with clarity, focus, and a plan.",
      };
    }

    if (hour >= 12 && hour < 17) {
      return {
        title: "Good Afternoon",
        message:
          "Keep your momentum going and make progress on your goals.",
      };
    }

    if (hour >= 17 && hour < 22) {
      return {
        title: "Good Evening",
        message:
          "Finish strong and wrap up the important tasks for today.",
      };
    }

    return {
      title: "Good Night",
      message:
        "Review your progress and prepare for a productive tomorrow.",
    };
  }, [hour]);

  /* =========================
     Date
  ========================= */

  const todayString = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  /* =========================
     Task Statistics
  ========================= */

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = todos.filter(
    (task) => task.status !== "Completed"
  ).length;

  const todayTasks = todos.filter(
    (task) =>
      task.dueDate === todayString &&
      task.status !== "Completed"
  ).length;

  const overdueTasks = todos.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < todayString &&
      task.status !== "Completed"
  ).length;

  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  /* =========================
     Smart Message
  ========================= */

  const productivityMessage = useMemo(() => {
    if (totalTasks === 0) {
      return "You have a clean slate. Create your first task and get started.";
    }

    if (overdueTasks > 0) {
      return `You have ${overdueTasks} overdue ${overdueTasks === 1 ? "task" : "tasks"
        }. Consider handling those first.`;
    }

    if (todayTasks > 0) {
      return `You have ${todayTasks} ${todayTasks === 1 ? "task" : "tasks"
        } due today. Stay focused.`;
    }

    if (pendingTasks === 0) {
      return "Everything is completed. Great job staying on top of your tasks.";
    }

    if (completionRate >= 75) {
      return "You're making excellent progress. Keep the momentum going.";
    }

    return "Stay focused and keep moving forward. Small progress adds up.";
  }, [
    totalTasks,
    overdueTasks,
    todayTasks,
    pendingTasks,
    completionRate,
  ]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">

      {/* Background Glow */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative">

        {/* Top Row */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Greeting */}

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-500">

              <Sparkles size={17} />

              <span className="text-sm font-medium">
                Personal Productivity
              </span>

            </div>

            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {`${greeting.title } ,`}<br />{userName ? `${userName}!` : ""}
            </h1>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {greeting.message}
            </p>

            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              {productivityMessage}
            </p>

            {/* Date + Time */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-4 py-2.5">

                <Clock3
                  size={16}
                  className="text-indigo-500"
                />

                <span className="text-sm font-medium text-foreground">
                  {formattedTime}
                </span>

              </div>

              <div className="rounded-xl border border-border bg-background/70 px-4 py-2.5">

                <span className="text-sm text-muted-foreground">
                  {formattedDate}
                </span>

              </div>

            </div>

          </div>

          {/* Productivity Score */}

          <div className="flex shrink-0 items-center justify-center">

            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-indigo-500/10">

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    rgb(99 102 241) ${completionRate}%,
                    transparent ${completionRate}%
                  )`,
                  mask:
                    "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
                  WebkitMask:
                    "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 0)",
                }}
              />

              <div className="text-center">

                <p className="text-3xl font-black text-foreground">
                  {completionRate}%
                </p>

                <p className="text-xs font-medium text-muted-foreground">
                  Completed
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

      
        {/* Daily Focus */}

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">

          {/* Focus Message */}

          <div className="rounded-2xl border border-border bg-background/60 p-5">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <Target size={21} />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Today's Focus
                </p>

                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {overdueTasks > 0
                    ? "Clear your overdue tasks"
                    : todayTasks > 0
                      ? "Focus on today's deadlines"
                      : pendingTasks > 0
                        ? "Make progress on your priorities"
                        : "You're all caught up"}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {overdueTasks > 0
                    ? `You have ${overdueTasks} overdue ${overdueTasks === 1 ? "task" : "tasks"
                    } that need attention.`
                    : todayTasks > 0
                      ? `${todayTasks} ${todayTasks === 1 ? "task is" : "tasks are"
                      } scheduled for today.`
                      : pendingTasks > 0
                        ? `${pendingTasks} ${pendingTasks === 1 ? "task remains" : "tasks remain"
                        } on your list.`
                        : "Take a moment to plan your next goal."}
                </p>

              </div>

            </div>

          </div>

          {/* Completion Progress */}

          <div className="min-w-[220px] rounded-2xl border border-border bg-background/60 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Daily Progress
                </p>

                <p className="mt-1 text-2xl font-black text-foreground">
                  {completionRate}%
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 size={21} />
              </div>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">

              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                style={{
                  width: `${completionRate}%`,
                }}
              />

            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>

          </div>

        </div>



      </div>

    </section>
  );
}

export default Hero;

