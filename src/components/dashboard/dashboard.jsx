import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import StatsCards from "./StatsCards";
import Charts from "./Charts";
import SearchFilter from "../task/SearchFilter";
import TodoList from "../task/TodoList";
import UpcomingTasks from "./UpcomingTasks";
import RecentActivity from "./RecentActivity";

function Dashboard() {

  const location = useLocation();
  const scrollToTaskId = location.state?.scrollToTaskId;
  const todos = useSelector(
    (state) => state.todo.todos
  );

 useEffect(() => {
  if (!scrollToTaskId) return;

  setSearch("");
  setStatus("all");
  setPriority("all");

  const timer = setTimeout(() => {
    const target =
      scrollToTaskId === "all"
        ? document.getElementById("dashboard-tasks")
        : document.querySelector(
            `[data-task-id="${scrollToTaskId}"]`
          );

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 150);

  return () => clearTimeout(timer);
}, [scrollToTaskId]);


  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");



  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {

      const title = todo.title || "";
      const description = todo.description || "";

      const matchSearch =
        title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === "all" ||
        todo.status === status;

      const matchPriority =
        priority === "all" ||
        todo.priority === priority;

      return (
        matchSearch &&
        matchStatus &&
        matchPriority
      );
    });
  }, [todos, search, status, priority]);

  return (
    <div className="space-y-8">

      {/* Hero */}

      <Hero />

      {/* Statistics */}

      <StatsCards />

      {/* Charts */}

      <Charts />

      {/* Upcoming + Recent */}

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingTasks />
        <RecentActivity />
      </div>

      {/* Search + Filter */}

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      {/* Tasks */}
      <div id="dashboard-tasks" className="scroll-mt-24">
        <TodoList
          todos={filteredTodos}
          scrollToTaskId={scrollToTaskId}
        />
      </div>

    </div>
  );
}

export default Dashboard;