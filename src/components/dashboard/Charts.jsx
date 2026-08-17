import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { useSelector } from "react-redux";

import { Card } from "@/components/ui/Card";

function Charts() {
  const todos = useSelector(
    (state) => state.todo.todos
  );

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const today = new Date();

  const weeklyData = days.map((day, index) => {
    const date = new Date(today);

    const currentDay = today.getDay();

    const difference = index - currentDay;

    date.setDate(today.getDate() + difference);

    const dateString =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    const tasks = todos.filter((task) => {
      if (!task.createdAt) return false;

      const createdDate = new Date(task.createdAt);

      const createdString =
        createdDate.getFullYear() +
        "-" +
        String(
          createdDate.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
          createdDate.getDate()
        ).padStart(2, "0");

      return createdString === dateString;
    }).length;

    return {
      day,
      tasks,
    };
  });

  return (
    <section className="mb-6 grid gap-6 lg:grid-cols-2">

      {/* Weekly Productivity */}

      <Card className="rounded-3xl border border-border bg-card p-6">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-foreground">
            Weekly Productivity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Tasks created throughout this week.
          </p>

        </div>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={weeklyData}>

              <defs>

                <linearGradient
                  id="productivityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#6366F1"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#6366F1"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="day"
                stroke="#94A3B8"
              />

              <YAxis
                allowDecimals={false}
                stroke="#94A3B8"
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#6366F1"
                strokeWidth={3}
                fill="url(#productivityGradient)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </Card>

      {/* Task Status */}

      <Card className="rounded-3xl border border-border bg-card p-6">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-foreground">
            Task Status
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Current distribution of your tasks.
          </p>

        </div>

        <div className="space-y-5">

          {[
            {
              name: "Todo",
              value: todos.filter(
                (task) =>
                  task.status === "Todo"
              ).length,
              color: "bg-amber-500",
            },

            {
              name: "In Progress",
              value: todos.filter(
                (task) =>
                  task.status === "In Progress"
              ).length,
              color: "bg-cyan-500",
            },

            {
              name: "Completed",
              value: todos.filter(
                (task) =>
                  task.status === "Completed"
              ).length,
              color: "bg-emerald-500",
            },
          ].map((item) => {

            const total = todos.length || 1;

            const percentage = Math.round(
              (item.value / total) * 100
            );

            return (
              <div key={item.name}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <span
                      className={`h-3 w-3 rounded-full ${item.color}`}
                    />

                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>

                  </div>

                  <span className="text-sm text-muted-foreground">
                    {item.value} ({percentage}%)
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">

                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

        <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">

          <p className="text-sm text-muted-foreground">
            Total Tasks
          </p>

          <p className="mt-1 text-3xl font-black text-foreground">
            {todos.length}
          </p>

        </div>

      </Card>

    </section>
  );
}

export default Charts;