"use client";

import { useCallback, useSyncExternalStore } from "react";

const DISMISS_EVENT = "af-notice-dismissed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DISMISS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DISMISS_EVENT, callback);
  };
}

/**
 * CMS-driven dismissible site notice ("hours may vary" announcements).
 * Dismissal is stored per notice id, so publishing a new notice in the
 * CMS makes the banner reappear. Hidden during SSR, appears after
 * hydration unless previously dismissed.
 */
export function NoticeBanner({ id, message }: { id: string; message: string }) {
  const storageKey = `af-notice-${id}`;

  const dismissed = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(storageKey) === "dismissed";
      } catch {
        return false;
      }
    },
    () => true // server: render nothing, avoid hydration flash
  );

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "dismissed");
    } catch {
      // storage unavailable — banner simply reappears next visit
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  }, [storageKey]);

  if (dismissed) return null;

  return (
    <div role="status" className="bg-warning text-ink-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <p className="text-caption font-medium">{message}</p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded p-1 hover:bg-black/10"
        >
          <span className="sr-only">Dismiss notice</span>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
