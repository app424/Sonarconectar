import { useEffect } from "react";

/**
 * Casual-user content protection deterrents.
 * Note: cannot truly prevent downloads on a public website.
 */
export const useContentProtection = () => {
  useEffect(() => {
    const blockContextOnMedia = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("img, video, picture, source, [data-protected]")) {
        e.preventDefault();
      }
    };

    const blockDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest("img, video, picture, [data-protected]")) {
        e.preventDefault();
      }
    };

    const blockKeys = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }
      const k = e.key.toLowerCase();
      // Ctrl/Cmd + S, U, P
      if ((e.ctrlKey || e.metaKey) && ["s", "u", "p"].includes(k)) {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I / J / C  (devtools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(k)) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextOnMedia);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.removeEventListener("contextmenu", blockContextOnMedia);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);
};
