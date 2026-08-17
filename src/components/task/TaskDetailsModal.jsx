import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Flag,
  Tag,
  X,
  Save,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast  from "react-hot-toast";
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

  /*
  =========================
  LOAD TASK INTO FORM
  =========================
  */

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

  /*
  =========================
  HANDLE CHANGE
  =========================
  */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
  =========================
  SAVE CHANGES
  =========================
  */

  const handleSave = () => {
    dispatch(
      updateTodo({
        id: task.id,

        ...formData,
         title: formData.title || task.title,
        description:formData.description || task.description,
        createdAt: task.createdAt,

        updatedAt: new Date().toISOString(),
      })
    );
          toast.success("Task updated successfully!");
    onClose();
  };

  /*
  =========================
  STYLES
  =========================
  */

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
      "border-cyan-500/30 bg-cyan-500/10 text-cyan-500",

    Completed:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  };

  /*
  ==================================================
  EDIT MODE
  ==================================================
  */

  if (editMode) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">

          {/* HEADER */}

          <div className="flex shrink-0 items-center justify-between border-b p-6">

            <div>
              <p className="text-sm text-muted-foreground">
                Edit Task
              </p>

              <h2 className="text-2xl font-black text-foreground">
                Update your task
              </h2>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-xl"
            >
              <X size={20} />
            </Button>

          </div>

          {/* FORM */}

          <div className="min-h-0 flex-1 overflow-y-auto">

            <div className="space-y-6 p-6">

              {/* TITLE */}

              <div className="space-y-2">

                <label className="text-sm font-medium">
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
                />

              </div>

              {/* DESCRIPTION */}

              <div className="space-y-2">

                <label className="text-sm font-medium">
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
                  className="min-h-28"
                />

              </div>

              {/* STATUS + PRIORITY */}

              <div className="grid gap-5 md:grid-cols-2">

                {/* STATUS */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
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
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
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

                {/* PRIORITY */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
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
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
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

              <div className="grid gap-5 md:grid-cols-2">

                {/* CATEGORY */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
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
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
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

                {/* DATE */}

                <div className="space-y-2">

                  <label className="flex items-center gap-2 text-sm font-medium">
                    <CalendarDays size={16} />
                    Due Date
                  </label>

                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      handleChange(
                        "dueDate",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="flex shrink-0 justify-end gap-3 border-t p-5">

            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              className="rounded-xl"
            >
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>

          </div>

        </div>

      </div>
    );
  }

  /*
  ==================================================
  VIEW MODE
  ==================================================
  */

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between border-b p-6">

          <div className="min-w-0">

            <p className="mb-2 text-sm text-muted-foreground">
              Task Details
            </p>

            <h2 className="truncate text-2xl font-black text-foreground">
              {task.title}
            </h2>

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

          <div className="space-y-6 p-6">

            {/* DESCRIPTION */}

            <div>

              <h3 className="mb-2 text-sm font-semibold">
                Description
              </h3>

              <div className="rounded-2xl border bg-muted/30 p-4 text-sm leading-6 text-muted-foreground">
                {task.description ||
                  "No description provided."}
              </div>

            </div>

            {/* DETAILS */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* STATUS */}

              <div className="rounded-2xl border p-4">

                <div className="mb-2 flex items-center gap-2 text-muted-foreground">

                  <CircleCheck size={17} />

                  <span className="text-sm">
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
                  {task.status}
                </Badge>

              </div>

              {/* PRIORITY */}

              <div className="rounded-2xl border p-4">

                <div className="mb-2 flex items-center gap-2 text-muted-foreground">

                  <Flag size={17} />

                  <span className="text-sm">
                    Priority
                  </span>

                </div>

                <Badge
                  variant="outline"
                  className={
                    priorityStyle[task.priority] ||
                    priorityStyle.Low
                  }
                >
                  {task.priority || "Low"}
                </Badge>

              </div>

              {/* CATEGORY */}

              <div className="rounded-2xl border p-4">

                <div className="mb-2 flex items-center gap-2 text-muted-foreground">

                  <Tag size={17} />

                  <span className="text-sm">
                    Category
                  </span>

                </div>

                <p className="font-semibold">
                  {task.category || "Other"}
                </p>

              </div>

              {/* DATE */}

              <div className="rounded-2xl border p-4">

                <div className="mb-2 flex items-center gap-2 text-muted-foreground">

                  <CalendarDays size={17} />

                  <span className="text-sm">
                    Due Date
                  </span>

                </div>

                <p className="font-semibold">
                  {task.dueDate || "No due date"}
                </p>

              </div>

            </div>

            {/* CREATED */}

            <div className="flex flex-wrap gap-6 border-t pt-5 text-xs text-muted-foreground">

              <div className="flex items-center gap-2">

                <Clock3 size={14} />

                <span>
                  Created:{" "}
                  {task.createdAt
                    ? new Date(
                        task.createdAt
                      ).toLocaleDateString()
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
                    ).toLocaleDateString()}
                  </span>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex shrink-0 justify-end border-t p-5">

          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl"
          >
            Close
          </Button>

        </div>

      </div>

    </div>
  );
}

export default TaskDetailsModal;