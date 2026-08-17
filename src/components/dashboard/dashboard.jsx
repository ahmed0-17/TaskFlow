import { useMemo, useState ,useEffect } from "react";
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
  const scrollToTaskId =  location.state?.scrollToTaskId;
  const todos = useSelector(
    (state) => state.todo.todos
  );

  useEffect(() => {
  if (!scrollToTaskId) return;

  // Search/filter clear karo
  setSearch("");
  setStatus("all");
  setPriority("all");
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

      <TodoList
        todos={filteredTodos}
        scrollToTaskId={scrollToTaskId}
      />

    </div>
  );
}

export default Dashboard;