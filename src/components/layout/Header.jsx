import { useMemo, useState } from "react";
import {
  Bell,
  Search,
  Sun,
  Moon,
  CheckCheck,
  CircleCheck,
  Clock3,
  Flag,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSearchQuery } from "../../features/search/searchSlice";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { toggleTheme } from "../../features/theme/themeSlice";

function Header({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchQuery = useSelector(
    (state) => state.search.query
  );

  const theme = useSelector(
    (state) => state.theme.theme
  );

  const todos = useSelector(
    (state) => state.todo.todos
  );

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showSearchResults, setShowSearchResults] =
    useState(false);

  const [readNotifications, setReadNotifications] =
    useState([]);

  const userName =
    localStorage.getItem("name") || "User";

  const initials = userName
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  const today = new Date();

  const todayString =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  /* =========================
     SEARCH
  ========================= */

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return todos
      .filter((task) => {
        const title =
          task.title?.toLowerCase() || "";

        const description =
          task.description?.toLowerCase() || "";

        const category =
          task.category?.toLowerCase() || "";

        const priority =
          task.priority?.toLowerCase() || "";

        const status =
          task.status?.toLowerCase() || "";

        return (
          title.includes(query) ||
          description.includes(query) ||
          category.includes(query) ||
          priority.includes(query) ||
          status.includes(query)
        );
      })
      .slice(0, 6);
  }, [searchQuery, todos]);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    dispatch(setSearchQuery(value));

    setShowSearchResults(
      value.trim().length > 0
    );
  };

  const openTask = (task) => {
    setShowSearchResults(false);
    dispatch(setSearchQuery(""));

    navigate("/", {
      state: {
        scrollToTaskId: task.id,
      },
    });
  };

  /* =========================
     NOTIFICATIONS
  ========================= */

  const notifications = useMemo(() => {
    const list = [];

    todos.forEach((task) => {
      if (!task.dueDate) return;

      if (task.status === "Completed") return;

      if (task.dueDate < todayString) {
        list.push({
          id: `overdue-${task.id}`,
          title: task.title,
          message: "This task is overdue.",
          type: "overdue",
        });
      } else if (task.dueDate === todayString) {
        list.push({
          id: `today-${task.id}`,
          title: task.title,
          message: "This task is due today.",
          type: "today",
        });
      }
    });

    todos.forEach((task) => {
      if (
        task.priority === "High" &&
        task.status !== "Completed"
      ) {
        list.push({
          id: `priority-${task.id}`,
          title: task.title,
          message:
            "High priority task needs attention.",
          type: "priority",
        });
      }
    });

    return list.slice(0, 8);
  }, [todos, todayString]);

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        !readNotifications.includes(
          notification.id
        )
    ).length;

  const markAsRead = (id) => {
    setReadNotifications((prev) =>
      prev.includes(id)
        ? prev
        : [...prev, id]
    );
  };

  const markAllAsRead = () => {
    setReadNotifications(
      notifications.map(
        (notification) => notification.id
      )
    );
  };

  return (
    <header
      className={`
    fixed left-0 right-0 top-0 z-40
    h-16 sm:h-20
    border-b
    backdrop-blur-xl
    ${theme === "light"
          ? "border-slate-200 bg-white/80"
          : "border-slate-800 bg-slate-950/80"
        }
    lg:left-72
  `}
    >
      <div
        className="
    flex h-full w-full min-w-0
    items-center justify-between
    gap-2 px-4
    sm:px-6
    lg:px-8
  "
      >
        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="shrink-0 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </Button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl lg:text-2xl">
              Dashboard
            </h1>

            <p className="truncate text-xs text-muted-foreground sm:text-sm">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">

          {/* SEARCH */}

          <div className="relative hidden md:block">
            <Search
              size={18}
              className="
                absolute left-3 top-1/2
                z-10 -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowSearchResults(true);
                }
              }}
              placeholder="Search tasks..."
              className="w-56 pl-10 lg:w-72"
            />

            {/* SEARCH RESULTS */}

            {showSearchResults &&
              searchQuery.trim() && (
                <div
                  className={`
                    absolute right-0 top-14 z-[100]
                    w-[calc(100vw-2rem)]
                    max-w-96
                    overflow-hidden
                    rounded-2xl
                    border
                    shadow-2xl
                    ${theme === "light"
                      ? "border-slate-200 bg-white"
                      : "border-slate-800 bg-slate-900"
                    }
                  `}
                >
                  <div className="border-b px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Search Results
                    </p>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                      <Search
                        size={28}
                        className="mx-auto mb-3 text-muted-foreground"
                      />

                      <p className="font-medium">
                        No tasks found
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Try another task title or keyword.
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() =>
                            openTask(task)
                          }
                          className="
                            flex w-full gap-3
                            border-b p-4
                            text-left transition
                            last:border-b-0
                            hover:bg-muted/50
                          "
                        >
                          <div className="mt-1 shrink-0">
                            {task.status ===
                              "Completed" ? (
                              <CircleCheck
                                size={18}
                                className="text-emerald-500"
                              />
                            ) : task.status ===
                              "In Progress" ? (
                              <Clock3
                                size={18}
                                className="text-blue-500"
                              />
                            ) : (
                              <CircleCheck
                                size={18}
                                className="text-muted-foreground"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {task.title}
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              {task.category && (
                                <span className="text-xs text-muted-foreground">
                                  {task.category}
                                </span>
                              )}

                              {task.priority && (
                                <span
                                  className={`
                                    flex items-center gap-1
                                    text-xs
                                    ${task.priority ===
                                      "High"
                                      ? "text-red-500"
                                      : task.priority ===
                                        "Medium"
                                        ? "text-yellow-500"
                                        : "text-emerald-500"
                                    }
                                  `}
                                >
                                  <Flag size={11} />
                                  {task.priority}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="border-t px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSearchResults(false);
                          dispatch(setSearchQuery(""));

                          navigate("/", {
                            state: {
                              scrollToTaskId: "all",
                            },
                          });
                        }}
                        className="text-xs font-medium text-indigo-500 hover:text-indigo-400"
                      >
                        View all tasks →
                      </button>
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* NOTIFICATIONS */}

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative shrink-0"
            >
              <Bell size={18} />

              {unreadNotifications > 0 && (
                <span
                  className="
                    absolute -right-1 -top-1
                    flex h-5 min-w-5
                    items-center justify-center
                    rounded-full bg-red-500
                    px-1 text-[10px]
                    font-bold text-white
                  "
                >
                  {unreadNotifications}
                </span>
              )}
            </Button>
            {/* NOTIFICATION DROPDOWN */}
            {showNotifications && (
              <div
                className={`
      fixed left-3 right-3 top-[4.5rem] z-[100]
      w-auto
      overflow-hidden
      rounded-2xl
      border
      shadow-2xl
      sm:absolute sm:left-auto sm:right-0 sm:top-14
      sm:w-[380px]
      ${theme === "light"
                    ? "border-slate-200 bg-white"
                    : "border-slate-800 bg-slate-900"
                  }
    `}
              >
                {/* HEADER */}
                <div className="flex items-center justify-between gap-3 border-b p-3 sm:p-4">
                  <div className="min-w-0">
                    <h3 className="font-bold">
                      Notifications
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {unreadNotifications} unread
                    </p>
                  </div>

                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="
            flex shrink-0 items-center gap-1
            text-xs font-medium
            text-indigo-500
            hover:text-indigo-400
          "
                    >
                      <CheckCheck size={15} />
                      <span className="hidden xs:inline sm:inline">
                        Mark all read
                      </span>
                      <span className="sm:hidden">
                        Read all
                      </span>
                    </button>
                  )}
                </div>

                {/* NOTIFICATIONS LIST */}
                <div className="max-h-[60vh] overflow-y-auto sm:max-h-96">
                  {notifications.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <Bell
                        size={30}
                        className="mx-auto mb-3 text-muted-foreground"
                      />

                      <p className="font-medium">
                        No notifications
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        You're all caught up.
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const isRead =
                        readNotifications.includes(
                          notification.id
                        );

                      return (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className={`
                flex w-full items-start gap-3
                border-b p-3
                text-left transition
                last:border-b-0
                sm:p-4
                ${isRead
                              ? "opacity-50"
                              : "hover:bg-muted/50"
                            }
              `}
                        >
                          {/* STATUS DOT */}
                          <div
                            className={`
                  mt-1.5 h-2.5 w-2.5
                  shrink-0 rounded-full
                  ${notification.type === "overdue"
                                ? "bg-red-500"
                                : notification.type === "today"
                                  ? "bg-amber-500"
                                  : "bg-indigo-500"
                              }
                `}
                          />

                          {/* CONTENT */}
                          <div className="min-w-0 flex-1">
                            <p className="break-words text-sm font-semibold leading-5">
                              {notification.title}
                            </p>

                            <p className="mt-1 break-words text-xs leading-5 text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>

                          {/* UNREAD DOT */}
                          {!isRead && (
                            <span
                              className="
                    mt-1.5 h-2 w-2
                    shrink-0 rounded-full
                    bg-indigo-500
                  "
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

        

         
          {/* AVATAR */}

          <Avatar className="h-9 w-9 shrink-0 sm:h-10 sm:w-10">
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;