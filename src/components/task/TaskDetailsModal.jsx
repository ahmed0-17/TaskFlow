import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Flag,
  Tag,
  X,
  Save,
  Pencil,
  FileText,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import { updateTodo } from "../../features/todo/todoSlices";

function TaskDetailsModal({
  task,
  onClose,
  editMode = false,
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Todo",
    category: "Personal",
    dueDate: "",
  });

  /* =========================
     LOAD TASK
  ========================= */

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Low",
        status: task.status || "Todo",
        category: task.category || "Personal",
        dueDate: task.dueDate || "",
      });
    }
  }, [task]);

  if (!task) return null;

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================
     SAVE
  ========================= */

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    if (
      formData.dueDate &&
      formData.dueDate < today
    ) {
      toast.error("Due date cannot be before today");
      return;
    }

    dispatch(
      updateTodo({
        id: task.id,
        ...formData,
        title: formData.title.trim(),
        createdAt: task.createdAt,
        updatedAt: new Date().toISOString(),
      })
    );

    toast.success("Task updated successfully");
    onClose();
  };

  /* =========================
     STYLES
  ========================= */

  const priorityStyle = {
    High:
      "border-red-500/30 bg-red-500/10 text-red-500",

    Medium:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",

    Low:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  };

  const statusStyle = {
    Todo:
      "border-slate-500/30 bg-slate-500/10 text-slate-500",

    "In Progress":
      "border-blue-500/30 bg-blue-500/10 text-blue-500",

    Completed:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  };

  const statusIcon = {
    Todo: (
      <CircleCheck
        size={17}
        className="text-slate-500"
      />
    ),

    "In Progress": (
      <Clock3
        size={17}
        className="text-blue-500"
      />
    ),

    Completed: (
      <CircleCheck
        size={17}
        className="text-emerald-500"
      />
    ),
  };

  /* ==================================================
     EDIT MODE
  ================================================== */

  if (editMode) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">

        <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">

          {/* HEADER */}

          <div className="flex shrink-0 items-center justify-between border-b border-border p-5 sm:p-6">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                <Pencil size={20} />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Edit Task
                </p>

                <h2 className="truncate text-xl font-black text-foreground sm:text-2xl">
                  Update your task
                </h2>

              </div>

            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0 rounded-xl"
            >
              <X size={20} />
            </Button>

          </div>

          {/* FORM */}

          <div className="min-h-0 flex-1 overflow-y-auto">

            <div className="space-y-5 p-5 sm:space-y-6 sm:p-6">

              {/* TITLE */}

              <div className="space-y-2">

                <label className="flex items-center gap-2 text-sm font-semibold">
                  <FileText size={16} />
                  Task Title
                </label>

                <Input
                  value={formData.title}
                  onChange={(e) =>
                    handleChange(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Enter task title"
                  className="h-11 rounded-xl"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="space-y-2">

                <label className="flex items-center gap-2 text-sm font-semibold">
                  <FileText size={16} />
                  Description
                </label>

                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your task..."
                  className="min-h-28 rounded-xl resize-none"
                />

              </div>

              {/* STATUS + PRIORITY */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <CircleCheck size={16} />
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target.value
                      )
                    }
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-indigo-500"
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

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <Flag size={16} />
                    Priority
                  </label>

                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      handleChange(
                        "priority",
                        e.target.value
                      )
                    }
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>

                </div>

              </div>

              {/* CATEGORY + DATE */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <Tag size={16} />
                    Category
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleChange(
                        "category",
                        e.target.value
                      )
                    }
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Personal">
                      Personal
                    </option>

                    <option value="Work">
                      Work
                    </option>

                    <option value="Study">
                      Study
                    </option>

                    <option value="Shopping">
                      Shopping
                    </option>
                  </select>

                </div>

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays size={16} />
                    Due Date
                  </label>

                  <Input
                    type="date"
                    value={formData.dueDate}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      handleChange(
                        "dueDate",
                        e.target.value
                      )
                    }
                    className="h-11 rounded-xl"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-border p-4 sm:flex-row sm:justify-end sm:p-5">

            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-xl sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="w-full rounded-xl sm:w-auto"
            >
              <Save
                size={16}
                className="mr-2"
              />
              Save Changes
            </Button>

          </div>

        </div>

      </div>
    );
  }

  /* ==================================================
     VIEW MODE
  ================================================== */

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">

      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-5 sm:p-6">

          <div className="flex min-w-0 items-start gap-3">

            <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
              {statusIcon[task.status] || (
                <CircleCheck size={20} />
              )}
            </div>

            <div className="min-w-0">

              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-500">
                Task Details
              </p>

              <h2 className="break-words text-xl font-black leading-tight text-foreground sm:text-2xl">
                {task.title}
              </h2>

            </div>

          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 rounded-xl"
          >
            <X size={20} />
          </Button>

        </div>

        {/* CONTENT */}

        <div className="min-h-0 flex-1 overflow-y-auto">

          <div className="space-y-5 p-5 sm:space-y-6 sm:p-6">

            {/* DESCRIPTION */}

            <div>

              <div className="mb-2 flex items-center gap-2">

                <FileText
                  size={16}
                  className="text-muted-foreground"
                />

                <h3 className="text-sm font-semibold">
                  Description
                </h3>

              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-4">

                <p className="text-sm leading-6 text-muted-foreground">
                  {task.description ||
                    "No description provided."}
                </p>

              </div>

            </div>

            {/* STATUS + PRIORITY */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* STATUS */}

              <div className="rounded-2xl border border-border bg-background/50 p-4">

                <div className="mb-3 flex items-center gap-2 text-muted-foreground">

                  <CircleCheck size={16} />

                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Status
                  </span>

                </div>

                <Badge
                  variant="outline"
                  className={
                    statusStyle[task.status] ||
                    statusStyle.Todo
                  }
                >
                  {task.status || "Todo"}
                </Badge>

              </div>

              {/* PRIORITY */}

              <div className="rounded-2xl border border-border bg-background/50 p-4">

                <div className="mb-3 flex items-center gap-2 text-muted-foreground">

                  <Flag size={16} />

                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Priority
                  </span>

                </div>

                <Badge
                  variant="outline"
                  className={
                    priorityStyle[
                      task.priority
                    ] || priorityStyle.Low
                  }
                >
                  <Flag
                    size={12}
                    className="mr-1"
                  />

                  {task.priority || "Low"}
                </Badge>

              </div>

              {/* CATEGORY */}

              <div className="rounded-2xl border border-border bg-background/50 p-4">

                <div className="mb-3 flex items-center gap-2 text-muted-foreground">

                  <Tag size={16} />

                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Category
                  </span>

                </div>

                <p className="font-semibold text-foreground">
                  {task.category || "Other"}
                </p>

              </div>

              {/* DUE DATE */}

              <div className="rounded-2xl border border-border bg-background/50 p-4">

                <div className="mb-3 flex items-center gap-2 text-muted-foreground">

                  <CalendarDays size={16} />

                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Due Date
                  </span>

                </div>

                <p className="font-semibold text-foreground">
                  {task.dueDate || "No due date"}
                </p>

              </div>

            </div>

            {/* TIMELINE */}

            <div className="rounded-2xl border border-border bg-background/50 p-4">

              <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">

                <div className="flex items-center gap-2">

                  <Clock3 size={14} />

                  <span>
                    Created:{" "}
                    {task.createdAt
                      ? new Date(
                          task.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </span>

                </div>

                {task.updatedAt && (
                  <div className="flex items-center gap-2">

                    <Clock3 size={14} />

                    <span>
                      Updated:{" "}
                      {new Date(
                        task.updatedAt
                      ).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex shrink-0 justify-end border-t border-border p-4 sm:p-5">

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full rounded-xl sm:w-auto"
          >
            Close
          </Button>

        </div>

      </div>

    </div>
  );
}

export default TaskDetailsModal;