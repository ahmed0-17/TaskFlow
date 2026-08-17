import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setPriority("all");
  };

  const hasFilters =
    search ||
    status !== "all" ||
    priority !== "all";

  return (
    <Card className="mb-6 rounded-3xl border border-border p-5">

      <div className="flex flex-col gap-4 lg:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search tasks by title or description..."
            className="h-12 rounded-xl pl-11"
          />

        </div>

        {/* Status */}

        <Select
          value={status}
          onValueChange={setStatus}
        >

          <SelectTrigger className="h-12 w-full rounded-xl lg:w-[180px]">

            <SelectValue placeholder="Status" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Status
            </SelectItem>

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

        {/* Priority */}

        <Select
          value={priority}
          onValueChange={setPriority}
        >

          <SelectTrigger className="h-12 w-full rounded-xl lg:w-[180px]">

            <div className="flex items-center gap-2">

              <SlidersHorizontal size={16} />

              <SelectValue placeholder="Priority" />

            </div>

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              All Priority
            </SelectItem>

            <SelectItem value="High">
              High
            </SelectItem>

            <SelectItem value="Medium">
              Medium
            </SelectItem>

            <SelectItem value="Low">
              Low
            </SelectItem>

          </SelectContent>

        </Select>

        {/* Clear */}

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X size={16} />
            Clear
          </button>
        )}

      </div>

      {/* Active filter info */}

      {hasFilters && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">

          <span>
            Filters applied
          </span>

          {search && (
            <span className="rounded-lg bg-muted px-2 py-1">
              Search: {search}
            </span>
          )}

          {status !== "all" && (
            <span className="rounded-lg bg-muted px-2 py-1">
              {status}
            </span>
          )}

          {priority !== "all" && (
            <span className="rounded-lg bg-muted px-2 py-1">
              {priority}
            </span>
          )}

        </div>
      )}

    </Card>
  );
}

export default SearchFilter;