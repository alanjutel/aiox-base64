import { useEffect, useState } from "react";

export type HistoryItem = {
  id: string;
  input: string;
  output: string;
  mode: "encode" | "decode" | "compress" | "decompress";
  createdAt: number;
};

const STORAGE_KEY = "aiox_history";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory(JSON.parse(stored));
    }
  }, []);

  const save = (item: Omit<HistoryItem, "id" | "createdAt">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clear = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    save,
    clear,
  };
}