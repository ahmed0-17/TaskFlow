import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  ListTodo,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

function AnalyticsPage() {
  const todos = useSelector((state) => state.todo.todos);

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = todos.filter(
    (task) => task.status === "In Progress"
  ).length;

  const todoTasks = todos.filter(
    (task) => task.status === "Todo"
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  /* ---------------- Priority Data ---------------- */

  const priorityData = useMemo(() => {
    return [
      {
        name: "High",
        value: todos.filter(
          (task) => task.priority === "High"
        ).length,
      },
      {
        name: "Medium",
        value: todos.filter(
          (task) => task.priority === "Medium"
        ).length,
      },
      {
        name: "Low",
        value: todos.filter(
          (task) => task.priority === "Low"
        ).length,
      },
    ];
  }, [todos]);

  /* ---------------- Category Data ---------------- */

  const categoryData = useMemo(() => {
    const categories = {};

    todos.forEach((task) => {
      const category = task.category || "Other";

      categories[category] =
        (categories[category] || 0) + 1;
    });

    return Object.entries(categories).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [todos]);

  /* ---------------- Status Data ---------------- */

  const statusData = [
    {
      name: "Todo",
      tasks: todoTasks,
    },
    {
      name: "In Progress",
      tasks: inProgressTasks,
    },
    {
      name: "Completed",
      tasks: completedTasks,
    },
  ];

  /* ---------------- Stats ---------------- */

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      subtitle: "All created tasks",
      icon: ListTodo,
      bg: "bg-indigo-500/10",
      color: "text-indigo-500",
    },
    {
      title: "Completed",
      value: completedTasks,
      subtitle: `${completionRate}% completion rate`,
      icon: CheckCircle2,
      bg: "bg-emerald-500/10",
      color: "text-emerald-500",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      subtitle: "Currently working",
      icon: Clock3,
      bg: "bg-cyan-500/10",
      color: "text-cyan-500",
    },
    {
      title: "Pending",
      value: todoTasks,
      subtitle: "Waiting to start",
      icon: Target,
      bg: "bg-amber-500/10",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">

            <BarChart3 size={25} />

          </div>

          <div>

            <h1 className="text-3xl font-black">
              Analytics
            </h1>

            <p className="text-sm text-muted-foreground">
              Track your productivity and task performance.
            </p>

          </div>

        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-xl px-4 py-2"
        >

          <TrendingUp
            size={15}
            className="mr-2"
          />

          {completionRate}% Complete

        </Badge>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-black">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>

                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}
                >

                  <Icon
                    size={23}
                    className={stat.color}
                  />

                </div>

              </div>

            </Card>
          );
        })}

      </div>

      {/* ================= OVERALL PROGRESS ================= */}

      <Card className="rounded-3xl p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Overall Progress
            </h2>

            <p className="text-sm text-muted-foreground">
              Your completed tasks compared with all tasks.
            </p>

          </div>

          <span className="text-2xl font-black text-indigo-500">
            {completionRate}%
          </span>

        </div>

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-linear-to-r from-indigo-500 via-cyan-500 to-emerald-500 transition-all duration-700"
            style={{
              width: `${completionRate}%`,
            }}
          />

        </div>

        <div className="mt-3 flex justify-between text-xs text-muted-foreground">

          <span>
            {completedTasks} completed
          </span>

          <span>
            {totalTasks} total
          </span>

        </div>

      </Card>

      {/* ================= CHARTS ================= */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* -------- TASK STATUS BAR CHART -------- */}

        <Card className="rounded-3xl p-6">

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              Task Status
            </h2>

            <p className="text-sm text-muted-foreground">
              Distribution of your current tasks.
            </p>

          </div>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={statusData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                />

                <XAxis dataKey="name" />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  name="Tasks"
                  radius={[8, 8, 0, 0]}
                  fill="#6366F1"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </Card>

        {/* -------- PRIORITY AREA CHART -------- */}

        <Card className="rounded-3xl p-6">

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              Priority Overview
            </h2>

            <p className="text-sm text-muted-foreground">
              Task distribution across priority levels.
            </p>

          </div>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={priorityData}>

                <defs>

                  <linearGradient
                    id="priorityGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#8B5CF6"
                      stopOpacity={0.7}
                    />

                    <stop
                      offset="95%"
                      stopColor="#8B5CF6"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                />

                <XAxis dataKey="name" />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  name="Tasks"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fill="url(#priorityGradient)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </Card>

      </div>

      {/* ================= CATEGORY ================= */}

      <Card className="rounded-3xl p-6">

        <div className="mb-5">

          <h2 className="text-xl font-bold">
            Tasks by Category
          </h2>

          <p className="text-sm text-muted-foreground">
            Understand where your work is focused.
          </p>

        </div>

        {categoryData.length === 0 ? (

          <div className="py-10 text-center text-muted-foreground">
            No category data available yet.
          </div>

        ) : (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {categoryData.map(
              (category, index) => {

                const categoryColors = [
                  "text-indigo-500",
                  "text-cyan-500",
                  "text-emerald-500",
                  "text-pink-500",
                ];

                const categoryBg = [
                  "bg-indigo-500/10",
                  "bg-cyan-500/10",
                  "bg-emerald-500/10",
                  "bg-pink-500/10",
                ];

                return (
                  <div
                    key={category.name}
                    className="rounded-2xl border bg-background p-5"
                  >

                    <div className="flex items-center justify-between">

                      <span className="font-semibold">
                        {category.name}
                      </span>

                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                          categoryBg[
                            index %
                              categoryBg.length
                          ]
                        } ${
                          categoryColors[
                            index %
                              categoryColors.length
                          ]
                        }`}
                      >

                        {category.value}

                      </span>

                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">

                      {category.value === 1
                        ? "1 task"
                        : `${category.value} tasks`}

                    </p>

                  </div>
                );
              }
            )}

          </div>

        )}

      </Card>

    </div>
  );
}

export default AnalyticsPage;