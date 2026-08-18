import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import TodoForm from "../components/task/TodoForm";
import TaskDetailsModal from "../components/task/TaskDetailsModal";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  Flag,
  CheckCircle2,
  CircleDashed,
  Plus,
  X,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function CalendarPage() {
  const todos = useSelector((state) => state.todo.todos);
  const theme = useSelector((state) => state.theme.theme);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  /* =========================
     DATE HELPERS
  ========================= */

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  const today = new Date();
  const todayString = formatDate(today);
  const selectedDateString = formatDate(selectedDate);

  /*
    IMPORTANT:
    Past date = date before today
  */
  const isSelectedDatePast =
    selectedDateString < todayString;

  /* =========================
     CALENDAR DAYS
  ========================= */

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0
    ).getDate();

    const days = [];

    // Previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(
        year,
        month - 1,
        previousMonthDays - i
      );

      days.push({
        date,
        currentMonth: false,
      });
    }

    // Current month
    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push({
        date: new Date(
          year,
          month,
          day
        ),
        currentMonth: true,
      });
    }

    // Next month
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(
          year,
          month + 1,
          nextDay
        ),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }, [month, year]);

  /* =========================
     NAVIGATION
  ========================= */

  const previousMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  };

  const goToday = () => {
    const now = new Date();

    setCurrentDate(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );

    setSelectedDate(now);
  };

  /* =========================
     SELECT DATE
  ========================= */

  const selectDate = (date) => {
    setSelectedDate(date);

    setCurrentDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      )
    );
  };

  /* =========================
     ADD TASK
  ========================= */

  const openAddTask = (date = selectedDate) => {
    const dateString = formatDate(date);

    /*
      IMPORTANT:
      Never allow task creation for
      dates before today.
    */
    if (dateString < todayString) {
      return;
    }

    setSelectedDate(date);

    setCurrentDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      )
    );

    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
  };

  /* =========================
     SELECTED TASKS
  ========================= */

  const selectedTasks = todos.filter(
    (task) =>
      task.dueDate === selectedDateString
  );

  /* =========================
     STYLES
  ========================= */

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-500/10 text-red-500 border-red-500/30";
    }

    if (priority === "Medium") {
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
    }

    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
  };

  const getStatusIcon = (status) => {
    if (status === "Completed") {
      return (
        <CheckCircle2
          size={17}
          className="text-emerald-500"
        />
      );
    }

    if (status === "In Progress") {
      return (
        <Clock3
          size={17}
          className="text-blue-500"
        />
      );
    }

    return (
      <CircleDashed
        size={17}
        className="text-amber-500"
      />
    );
  };

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
              <CalendarDays size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Calendar
              </h1>

              <p className="text-sm text-muted-foreground">
                Manage and track your scheduled tasks.
              </p>
            </div>

          </div>
        </div>

        <div className="flex flex-wrap gap-2">

          {/* TODAY */}

          <Button
            onClick={goToday}
            variant="outline"
            className="rounded-xl"
          >
            <CalendarDays
              size={17}
              className="mr-2"
            />

            Today
          </Button>

          {/* ADD TASK */}

          <Button
            onClick={() =>
              openAddTask(selectedDate)
            }
            disabled={isSelectedDatePast}
            className="rounded-xl"
          >
            <Plus
              size={17}
              className="mr-2"
            />

            Add Task
          </Button>

        </div>

      </div>

      {/* =========================
          CALENDAR
      ========================= */}

      <Card
        className={`overflow-hidden rounded-3xl ${
          theme === "light"
            ? "bg-white"
            : "bg-slate-900"
        }`}
      >

        {/* CALENDAR HEADER */}

        <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {monthName}
            </h2>

            <p className="text-sm text-muted-foreground">
              {
                todos.filter(
                  (task) => task.dueDate
                ).length
              }{" "}
              scheduled tasks
            </p>
          </div>

          <div className="flex items-center gap-2">

            <Button
              variant="outline"
              size="icon"
              onClick={previousMonth}
              className="rounded-xl"
            >
              <ChevronLeft size={19} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="rounded-xl"
            >
              <ChevronRight size={19} />
            </Button>

          </div>

        </div>

        {/* WEEKDAYS */}

        <div className="grid grid-cols-7 border-b">

          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {day}
            </div>
          ))}

        </div>

        {/* CALENDAR GRID */}

        <div className="grid grid-cols-7">

          {calendarDays.map(
            ({ date, currentMonth }, index) => {

              const dateString =
                formatDate(date);

              const dayTasks =
                todos.filter(
                  (task) =>
                    task.dueDate ===
                    dateString
                );

              const isToday =
                dateString ===
                todayString;

              const isSelected =
                dateString ===
                selectedDateString;

              const isPastDate =
                dateString <
                todayString;

              return (
                <div
                  key={index}
                  onClick={() =>
                    selectDate(date)
                  }
                  className={`group/date relative min-h-28 cursor-pointer border-b border-r p-2 text-left transition-all hover:bg-indigo-500/5 sm:min-h-32 ${
                    !currentMonth
                      ? "opacity-40"
                      : ""
                  } ${
                    isSelected
                      ? "bg-indigo-500/10 ring-2 ring-inset ring-indigo-500"
                      : ""
                  }`}
                >

                  {/* DATE HEADER */}

                  <div className="flex items-center justify-between">

                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        isToday
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "text-foreground"
                      }`}
                    >
                      {date.getDate()}
                    </span>

                    {/* ADD BUTTON */}

                    {!isPastDate && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          openAddTask(date);
                        }}
                        className="flex h-8 items-center gap-1 rounded-lg bg-indigo-500 px-2.5 text-xs font-semibold text-white opacity-0 shadow-sm transition-all duration-200 group-hover/date:opacity-100 hover:bg-indigo-600"
                      >
                        <Plus size={14} />
                        Add
                      </button>
                    )}

                  </div>

                  {/* TASKS */}

                  <div className="mt-2 space-y-1">

                    {dayTasks
                      .slice(0, 3)
                      .map((task) => (
                        <span
                          key={task.id}
                          onClick={(e) => {
                            e.stopPropagation();

                            setSelectedTask(
                              task
                            );
                          }}
                          className={`block w-full cursor-pointer truncate rounded-lg px-2 py-1 text-[11px] font-medium transition hover:scale-[1.02] ${
                            task.priority ===
                            "High"
                              ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              : task.priority ===
                                "Medium"
                              ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                              : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                          }`}
                        >
                          {task.title}
                        </span>
                      ))}

                    {dayTasks.length >
                      3 && (
                      <div className="px-2 text-[11px] text-muted-foreground">
                        +
                        {dayTasks.length -
                          3}{" "}
                        more
                      </div>
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* LEGEND */}

        <div className="flex flex-wrap items-center gap-5 border-t p-4">

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            High Priority
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            Medium Priority
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Low Priority
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            Today
          </div>

        </div>

      </Card>

      {/* =========================
          SELECTED DAY
      ========================= */}

      <Card className="rounded-3xl p-6">

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold">
              {selectedDate.toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </h2>

            <p className="text-sm text-muted-foreground">
              Existing tasks scheduled for this day
            </p>
          </div>

          <Badge variant="outline">
            {selectedTasks.length}{" "}
            {selectedTasks.length === 1
              ? "Task"
              : "Tasks"}
          </Badge>

        </div>

        {/* EXISTING TASKS */}

        {selectedTasks.length === 0 ? (

          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">

            <CalendarDays
              size={40}
              className="mb-3 text-muted-foreground"
            />

            <h3 className="font-semibold">
              No tasks scheduled
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              There are no existing tasks for this date.
            </p>

          </div>

        ) : (

          <div className="grid gap-4 md:grid-cols-2">

            {selectedTasks.map((task) => (

              <button
                key={task.id}
                type="button"
                onClick={() =>
                  setSelectedTask(task)
                }
                className="w-full rounded-2xl border bg-background p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* TASK HEADER */}

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-start gap-3">

                    <div className="mt-1">
                      {getStatusIcon(
                        task.status
                      )}
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate font-bold">
                        {task.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {task.description ||
                          "No description"}
                      </p>

                    </div>

                  </div>

                  <Badge
                    variant="outline"
                    className={getPriorityStyle(
                      task.priority
                    )}
                  >
                    <Flag
                      size={13}
                      className="mr-1"
                    />

                    {task.priority}
                  </Badge>

                </div>

                {/* TASK DETAILS */}

                <div className="mt-4 flex flex-wrap items-center gap-2">

                  {task.category && (
                    <Badge variant="secondary">
                      {task.category}
                    </Badge>
                  )}

                  <Badge variant="outline">
                    {task.status}
                  </Badge>

                  <Badge variant="outline">
                    <CalendarDays
                      size={13}
                      className="mr-1"
                    />

                    {task.dueDate}
                  </Badge>

                </div>

              </button>

            ))}

          </div>

        )}

      </Card>

      {/* =========================
          ADD TASK MODAL
      ========================= */}

      {showTaskForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl">

            <button
              type="button"
              onClick={closeTaskForm}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X size={19} />
            </button>

            <div className="mb-6 pr-10">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <Plus size={22} />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Add New Task
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Scheduled for{" "}
                    {selectedDate.toLocaleDateString(
                      "en-US",
                      {
                        weekday:
                          "long",
                        day: "numeric",
                        month:
                          "long",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

              </div>

            </div>

            <TodoForm
              defaultDueDate={
                selectedDateString
              }
              onSuccess={
                closeTaskForm
              }
            />

          </div>

        </div>

      )}

      {/* =========================
          TASK DETAILS MODAL
      ========================= */}

      {selectedTask && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <TaskDetailsModal
            task={selectedTask}
            onClose={() =>
              setSelectedTask(null)
            }
          />

        </div>

      )}

    </div>
  );
}

export default CalendarPage;