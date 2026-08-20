import { useEffect, useRef, useState } from "react";
import { api } from "../api";

const formatTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
};

export default function NotificationBell({ role }) {
  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`medcare-notifications-read-${role}`) || "[]");
    } catch (_) {
      return [];
    }
  });
  const [dismissedIds, setDismissedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`medcare-notifications-dismissed-${role}`) || "[]");
    } catch (_) {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const visibleNotifications = notifications.filter((notification) => !dismissedIds.includes(notification.id));
  const unreadCount = visibleNotifications.filter((notification) => !readIds.includes(notification.id)).length;

  const markNotificationsRead = () => {
    const ids = [...new Set([...readIds, ...visibleNotifications.map((notification) => notification.id)])];
    setReadIds(ids);
    localStorage.setItem(`medcare-notifications-read-${role}`, JSON.stringify(ids));
  };

  const dismissNotification = (notificationId) => {
    const ids = [...new Set([...dismissedIds, notificationId])];
    setDismissedIds(ids);
    localStorage.setItem(`medcare-notifications-dismissed-${role}`, JSON.stringify(ids));
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await api.getNotifications();
        if (active) setNotifications(data.notifications || []);
      } catch (_) {
        // Notifications should not interrupt dashboard usage when unavailable.
      }
    };
    load();
    const interval = window.setInterval(load, 30000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const close = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          markNotificationsRead();
        }}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-brand-navy hover:bg-cream transition-colors"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold font-heading text-brand-navy">Notifications</h2>
            <span className="text-xs text-brand-gray">{visibleNotifications.length} total</span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {visibleNotifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-brand-gray">No notifications yet.</p>
            ) : (
              visibleNotifications.map((notification) => (
                <div key={notification.id} className="px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-cream/50">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-brand-navy">{notification.title}</p>
                    <button
                      type="button"
                      onClick={() => dismissNotification(notification.id)}
                      className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete notification"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-brand-gray leading-relaxed">{notification.message}</p>
                  <p className="mt-1.5 text-[10px] text-brand-green">{formatTime(notification.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
