import TodoForm from "../components/task/TodoForm";
import TodoList from "../components/task/TodoList";
import { useSelector } from "react-redux";
function TasksPage() {
  const todos = useSelector(
    (state) => state.todo.todos
  );
  return (
    <div className="space-y-8">

      <TodoForm />

      <TodoList todos={todos} />

    </div>
  );
}

export default TasksPage;