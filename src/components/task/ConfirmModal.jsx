import { AlertTriangle, X } from "lucide-react";

import { Button } from "@/components/ui/button";

function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-start gap-4">

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                danger
                  ? "bg-red-500/10 text-red-500"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <AlertTriangle size={22} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-foreground">
                {title}
              </h2>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {description}
              </p>

            </div>

          </div>

          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          >
            <X size={18} />
          </button>

        </div>

        {/* Buttons */}

        <div className="mt-6 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onCancel}
            className="rounded-xl"
          >
            {cancelText}
          </Button>

          <Button
            variant={danger ? "destructive" : "default"}
            onClick={onConfirm}
            className="rounded-xl"
          >
            {confirmText}
          </Button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;