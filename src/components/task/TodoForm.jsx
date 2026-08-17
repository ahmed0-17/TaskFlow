import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/Card";
import {
  Plus,
  Save,
  CalendarDays,
  Flag,
  Folder,
  FileText,
  Type,
} from "lucide-react";

import {
  addTodo,
  updateTodo,
  setEditingTodo,
} from "../../features/todo/todoSlices";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



function TodoForm({ defaultDueDate = "", onSuccess }) {
  const dispatch = useDispatch();

  const editingTodo = useSelector(
    (state) => state.todo.editingTodo
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Todo",
    category: "Personal",
    dueDate: defaultDueDate || "",
  });

  /* =========================
     Edit Existing Task
  ========================= */

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        priority: editingTodo.priority || "Low",
        status: editingTodo.status || "Todo",
        category: editingTodo.category || "Personal",
        dueDate: editingTodo.dueDate || "",
      });

      return;
    }

    // New task from Calendar
    if (defaultDueDate) {
      setFormData((prev) => ({
        ...prev,
        dueDate: defaultDueDate,
      }));
    }
  }, [editingTodo, defaultDueDate]);

  /* =========================
     Change Field
  ========================= */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================
     Reset
  ========================= */

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "Low",
      status: "Todo",
      category: "Personal",
      dueDate: "",
    });

    dispatch(setEditingTodo(null));
  };

  /* =========================
     Submit
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

const today = new Date().toISOString().split("T")[0];

if (formData.dueDate < today) {
  toast.error("Due date cannot be before today");
  return;
}

    if (!formData.title.trim()) return;

    const task = {
      ...formData,
      title: formData.title.trim(),
      createdAt: editingTodo
        ? editingTodo.createdAt
        : new Date().toISOString(),
      updatedAt: editingTodo
        ? new Date().toISOString()
        : undefined,
    };

    if (editingTodo) {
      dispatch(
        updateTodo({
          id: editingTodo.id,
          ...task,
        })
      );

      toast.success("Task updated successfully");
    } else {
      dispatch(addTodo(task));
      toast.success("Task created successfully");
    }

    resetForm();

    // Close Calendar modal after successful save
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-1 p-3 bg-transparent shadow-none">

        {/* Header */}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {editingTodo
              ? "Update Task"
              : "Create New Task"}
          </h2>

          <p className="text-sm text-muted-foreground">
            Organize your work and stay productive.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}

          <div className="space-y-2">
            <Label>Task Title</Label>

            <div className="relative">
              <Type
                size={18}
                className="absolute left-3 top-3 text-muted-foreground"
              />

              <Input
                value={formData.title}
                onChange={(e) =>
                  handleChange(
                    "title",
                    e.target.value
                  )
                }
                placeholder="Enter task title"
                className="h-12 pl-10"
              />
            </div>
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label>Description</Label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-3 text-muted-foreground"
              />

              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe your task..."
                className="min-h-30 pl-10"
              />
            </div>
          </div>

          {/* Priority + Status */}

          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <Label>Priority</Label>

              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  handleChange(
                    "priority",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <Flag size={16} />
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Low">
                    Low
                  </SelectItem>

                  <SelectItem value="Medium">
                    Medium
                  </SelectItem>

                  <SelectItem value="High">
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleChange(
                    "status",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Todo">
                    Todo
                  </SelectItem>

                  <SelectItem value="In Progress">
                    In Progress
                  </SelectItem>

                  <SelectItem value="Completed">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Category + Date */}

          <div className="grid gap-5 md:grid-cols-2">

            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                value={formData.category}
                onValueChange={(value) =>
                  handleChange(
                    "category",
                    value
                  )
                }
              >
                <SelectTrigger>
                  <Folder size={16} />
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Personal">
                    Personal
                  </SelectItem>

                  <SelectItem value="Work">
                    Work
                  </SelectItem>

                  <SelectItem value="Study">
                    Study
                  </SelectItem>

                  <SelectItem value="Shopping">
                    Shopping
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}

            <div className="space-y-2">
              <Label>Due Date</Label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-3 top-3 text-muted-foreground"
                />

                <Input
                  type="date"
                  value={formData.dueDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleChange(
                      "dueDate",
                      e.target.value
                    )
                  }
                  className="pl-10"
                />
            </div>
            </div>

          </div>

          {/* Submit */}

          <Button
            type="submit"
            className="h-12 w-full rounded-xl text-base"
          >
            {editingTodo ? (
              <>
                <Save className="mr-2" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="mr-2" />
                Add Task
              </>
            )}
          </Button>

        </form>

      </Card>
    </motion.div>
  );
}

export default TodoForm;

