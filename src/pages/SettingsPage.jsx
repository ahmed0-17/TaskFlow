import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bell,
  Moon,
  Save,
  User,
  Settings,
  Check,
} from "lucide-react";

import { toggleTheme } from "../features/theme/themeSlice";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function SettingsPage() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const [name, setName] = useState(localStorage.getItem("name") || "Ahmed Ali Malik");
  const [email, setEmail] = useState(localStorage.getItem("email") || "abc123@gmail.com");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    localStorage.setItem("name", name || "Ahmed Ali Malik");
    localStorage.setItem("email", email || "abc123@gmail.com");

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your TaskFlow preferences.
        </p>
      </div>


      {/* Profile */}

      <Card className="rounded-3xl p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
            <User size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Profile
            </h2>

            <p className="text-sm text-muted-foreground">
              Update your personal information.
            </p>
          </div>

        </div>


        <div className="grid gap-5 md:grid-cols-2">

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Name
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

          </div>


          <div className="space-y-2">

            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />

          </div>

        </div>

      </Card>


      {/* Appearance */}

      <Card className="rounded-3xl p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
            <Moon size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Appearance
            </h2>

            <p className="text-sm text-muted-foreground">
              Customize the appearance of TaskFlow.
            </p>
          </div>

        </div>


        <div className="flex items-center justify-between rounded-2xl border p-4">

          <div>

            <h3 className="font-medium">
              Dark Mode
            </h3>

            <p className="text-sm text-muted-foreground">
              Switch between light and dark theme.
            </p>

          </div>


          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className={`relative h-7 w-12 rounded-full transition ${
              theme === "dark"
                ? "bg-indigo-600"
                : "bg-slate-300"
            }`}
          >

            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                theme === "dark"
                  ? "left-6"
                  : "left-1"
              }`}
            />

          </button>

        </div>

      </Card>


      {/* Notifications */}

      <Card className="rounded-3xl p-6">

        <div className="mb-6 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
            <Bell size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Notifications
            </h2>

            <p className="text-sm text-muted-foreground">
              Control your notification preferences.
            </p>
          </div>

        </div>


        <div className="space-y-4">

          {/* Notifications */}

          <div className="flex items-center justify-between rounded-2xl border p-4">

            <div>

              <h3 className="font-medium">
                Task Notifications
              </h3>

              <p className="text-sm text-muted-foreground">
                Receive reminders about your tasks.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`relative h-7 w-12 rounded-full transition ${
                notifications
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </button>

          </div>


          {/* Auto Save */}

          <div className="flex items-center justify-between rounded-2xl border p-4">

            <div>

              <h3 className="font-medium">
                Auto Save
              </h3>

              <p className="text-sm text-muted-foreground">
                Automatically save your task changes.
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                setAutoSave(!autoSave)
              }
              className={`relative h-7 w-12 rounded-full transition ${
                autoSave
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  autoSave
                    ? "left-6"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        </div>

      </Card>


      {/* Save */}

      <div className="flex justify-end">

        <Button
          onClick={handleSave}
          className="rounded-xl px-6"
        >

          {saved ? (
            <>
              <Check className="mr-2" size={18} />
              Saved
            </>
          ) : (
            <>
              <Save className="mr-2" size={18} />
              Save Settings
            </>
          )}

        </Button>

      </div>

    </div>
  );
}

export default SettingsPage;