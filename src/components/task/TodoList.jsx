import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import TaskDetailsModal from "./TaskDetailsModal";
import {
  CalendarDays,
  Edit3,
  Trash2,
  Folder,
  Flag,
  Eye,
  ArrowUpDown,
} from "lucide-react";

import {
  deleteTodo,
  changeStatus,
  setEditingTodo,
} from "../../features/todo/todoSlices";



function TodoList({ todos = [] ,scrollToTaskId}) {




  const dispatch = useDispatch();

  // Task selected for View Details
  const [selectedTask, setSelectedTask] = useState(null);
const [editMode, setEditMode] = useState(false);
  // Task selected for Edit
  const editingTodo = useSelector(
    (state) => state.todo.editingTodo
  );
  // Task selected for Delete
  const [deleteTask, setDeleteTask] = useState(null);

  

  // Sorting
  const [sortBy, setSortBy] = useState("newest");

  const sortedTodos = useMemo(() => {

    const list = [...todos];

    if (sortBy === "newest") {
      return list.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    if (sortBy === "oldest") {
      return list.sort(
        (a, b) =>
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
      );
    }

    if (sortBy === "dueDate") {
      return list.sort((a, b) => {

        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return a.dueDate.localeCompare(
          b.dueDate
        );
      });
    }

    if (sortBy === "priority") {

      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return list.sort(
        (a, b) =>
          (priorityOrder[a.priority] || 4) -
          (priorityOrder[b.priority] || 4)
      );
    }

    return list;

  }, [todos, sortBy]);


  
useEffect(() => {
  if (!scrollToTaskId) return;

  const timer = setTimeout(() => {
    const element = document.getElementById(
      `task-${scrollToTaskId}`
    );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, 100);

  return () => clearTimeout(timer);
}, [scrollToTaskId, sortedTodos]);


  const priorityStyle = (priority) => {

    if (priority === "High") {
      return "bg-red-500/10 text-red-500 border-red-500/30";
    }

    if (priority === "Medium") {
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
    }

    return "bg-green-500/10 text-green-500 border-green-500/30";
  };

  const statusStyle = (status) => {

    if (status === "Completed") {
      return "bg-emerald-500/10 text-emerald-500";
    }

    if (status === "In Progress") {
      return "bg-blue-500/10 text-blue-500";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <section>

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            My Tasks
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage your daily productivity.
          </p>

        </div>

        {/* Sort + Count */}

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">

            <ArrowUpDown
              size={16}
              className="text-muted-foreground"
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="h-10 bg-background text-sm text-foreground outline-none"
            >

              <option value="newest">
                Newest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="dueDate">
                Due Date
              </option>

              <option value="priority">
                Priority
              </option>

            </select>

          </div>

          <Badge className="rounded-xl px-4 py-2">
            {todos.length} Tasks
          </Badge>

        </div>

      </div>

      {/* Empty */}

      {sortedTodos.length === 0 ? (

        <Card className="flex h-60 items-center justify-center border-dashed">

          <div className="text-center">

            <h3 className="text-xl font-semibold text-foreground">
              No Tasks Found
            </h3>

            <p className="text-muted-foreground">
              Create your first task.
            </p>

          </div>

        </Card>

      ) : (

        <div className="grid gap-5" >

          {sortedTodos.map((todo, index) => (

            <motion.div 
            id={`task-${todo.id}`}
              key={todo.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
            >

              <Card className="rounded-3xl p-6">

                <div className="flex flex-col gap-5">

                  {/* Header */}

                  <div className="flex flex-wrap justify-between gap-4">

                    <div>

                      <h3 className="text-xl font-bold text-foreground">
                        {todo.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {todo.description ||
                          "No description"}
                      </p>

                    </div>

                    {/* Status */}

                    <select
                      value={todo.status}
                      onChange={(e) =>
                        dispatch(
                          changeStatus({
                            id: todo.id,
                            status: e.target.value,
                          })
                        )
                      }
                      className="rounded-xl border border-border bg-background px-4 py-2 text-foreground outline-none"
                    >

                      <option value="Todo">
                        Todo
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                    </select>

                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-2">

                    {/* Priority */}
                    <div
                      className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium ${priorityStyle(
                        todo.priority
                      )}`}
                    >
                      <Flag size={12} />
                      <span>{todo.priority}</span>
                    </div>

                    {/* Category */}
                    <div className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-2.5 text-xs font-medium text-foreground">
                      <Folder size={12} />
                      <span>{todo.category}</span>
                    </div>

                    {/* Status */}
                    <div
                      className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium ${statusStyle(
                        todo.status
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      <span>{todo.status}</span>
                    </div>

                    {/* Due Date */}
                    <div className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-2.5 text-xs font-medium text-foreground">
                      <CalendarDays size={12} />
                      <span>{todo.dueDate || "No Date"}</span>
                    </div>

                  </div>

                  {/* Actions */}

                  <div className="flex flex-wrap gap-3">

                    {/* View Details */}

                    <Button
                      variant="outline"
                      onClick={() =>{
                        setSelectedTask(todo)
                        setEditMode(false)
                      }}
                      className="rounded-xl"
                    >
                      <Eye size={16} />
                      View Details
                    </Button>

                    {/* Edit */}

                    <Button
                      onClick={() =>{

                        dispatch(

                          setEditingTodo(todo)
                          
                        );
                           setSelectedTask(todo);
                            setEditMode(true);
                      }}
                      className="rounded-xl"
                    >
                      <Edit3 size={16} />
                      Edit
                    </Button>

                    {/* Delete */}

                    <Button
                      variant="destructive"
                      onClick={() => setDeleteTask(todo)}
                      className="rounded-xl"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>


                  </div>

                </div>

              </Card>

            </motion.div>

          ))}

        </div>

      )}

    {/* TASK MODAL */}

{selectedTask && (
  <TaskDetailsModal
    task={selectedTask}
    editMode={editMode}
    onClose={() => {
      setSelectedTask(null);
      setEditMode(false);
      dispatch(setEditingTodo(null));
    }}
  />
)}
      <ConfirmModal
        open={!!deleteTask}
        title="Delete Task?"
        description={
          deleteTask
            ? `Are you sure you want to delete "${deleteTask.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Task"
        cancelText="Cancel"
        danger
        onCancel={() => setDeleteTask(null)}
        onConfirm={() => {
          dispatch(deleteTodo(deleteTask.id));

          toast.success("Task deleted successfully");

          setDeleteTask(null);
        }}
      />

    </section>
  );
}

export default TodoList;