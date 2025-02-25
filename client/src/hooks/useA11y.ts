import { useCallback } from "react";

export function useA11y() {
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.setAttribute(
      "style",
      "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;"
    );
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const handleKeyboardNavigation = useCallback(
    (event: React.KeyboardEvent, callback: () => void) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        callback();
      }
    },
    []
  );

  return {
    announceToScreenReader,
    handleKeyboardNavigation,
  };
}
