import { Plus, ClipboardList, Download, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Card from "../ui/Card";

function QuickActions() {
  const dispatch = useDispatch();

  const handleNewTask = () => {
    const form = document.getElementById("task-form");

    if (form) {
      form.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    toast.success("Scroll to task form");
  };

  const handleExport = () => {
    toast.success("Export feature coming soon");
  };

  const handleClear = () => {
    toast("Clear All feature coming soon");
  };

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleNewTask}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-indigo-600 p-5 text-white transition hover:bg-indigo-700"
        >
          <Plus size={28} />
          <span className="text-sm font-medium">
            New Task
          </span>
        </button>

        <button
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-600 p-5 text-white transition hover:bg-emerald-700"
        >
          <ClipboardList size={28} />
          <span className="text-sm font-medium">
            All Tasks
          </span>
        </button>

        <button
          onClick={handleExport}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-cyan-600 p-5 text-white transition hover:bg-cyan-700"
        >
          <Download size={28} />
          <span className="text-sm font-medium">
            Export
          </span>
        </button>

        <button
          onClick={handleClear}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-red-600 p-5 text-white transition hover:bg-red-700"
        >
          <Trash2 size={28} />
          <span className="text-sm font-medium">
            Clear All
          </span>
        </button>
      </div>
    </Card>
  );
}

export default QuickActions;