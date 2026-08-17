import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function UserSettings() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">Settings</h2>
        <p className="mt-1 text-sm text-brand-gray">Manage your preferences</p>
      </div>

      <div className="rounded-2xl bg-white shadow-md p-8">
        <h3 className="text-lg font-heading text-brand-navy">Account</h3>
        <p className="mt-1 text-sm text-brand-gray">Signed in as {user?.email}</p>

        <div className="mt-8 space-y-5">
          <div className="flex items-center justify-between rounded-xl border border-gray-100 p-5">
            <div>
              <p className="text-sm font-semibold text-brand-navy">Email Notifications</p>
              <p className="text-xs text-brand-gray mt-0.5">Receive updates about your appointments</p>
            </div>
            <button
              onClick={() => setEmailUpdates((v) => !v)}
              className={`w-12 h-7 rounded-full transition-colors ${emailUpdates ? "bg-brand-green" : "bg-gray-300"}`}
              aria-label="Toggle email notifications"
            >
              <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${emailUpdates ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-100 p-5">
            <div>
              <p className="text-sm font-semibold text-brand-navy">Push Notifications</p>
              <p className="text-xs text-brand-gray mt-0.5">Get instant alerts on your device</p>
            </div>
            <button
              onClick={() => setNotifications((v) => !v)}
              className={`w-12 h-7 rounded-full transition-colors ${notifications ? "bg-brand-green" : "bg-gray-300"}`}
              aria-label="Toggle push notifications"
            >
              <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${notifications ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}