import { useState, useCallback } from "react";

const STORAGE_KEY = "insights:unlocked";

export function useUnlock() {
  const [unlocked, setUnlocked] = useState<boolean>(
    () => sessionStorage.getItem(STORAGE_KEY) === "1"
  );

  const unlock = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setUnlocked(true);
  }, []);

  return { unlocked, unlock };
}
