import type { HistoryItem } from "../../hooks/useHistory";

type Props = {
  items: HistoryItem[];
};

export function HistoryPanel({ items }: Props) {
  return (
    <div className="w-full bg-zinc-900 text-white p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-3">Histórico</h2>

      {items.length === 0 ? (
        <p className="text-zinc-400 text-sm">Sem histórico ainda</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="p-2 bg-zinc-800 rounded border border-zinc-700"
            >
              <div className="text-xs text-zinc-400">
                {new Date(item.createdAt).toLocaleString()}
              </div>

              <div className="text-sm break-words">
                <strong className="text-zinc-300">IN:</strong>{" "}
                {item.input}
              </div>

              <div className="text-sm break-words">
                <strong className="text-zinc-300">OUT:</strong>{" "}
                {item.output}
              </div>

              <div className="text-xs text-cyan-400">
                {item.mode}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}