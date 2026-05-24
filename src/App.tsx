import { useHistory } from "./hooks/useHistory";
import { HistoryPanel } from "./components/History/HistoryPanel";
import { useState, useEffect, useMemo } from "react";
import {
  Clipboard,
  Trash2,
  History as HistoryIcon,
  Zap,
  Check,
  AlertCircle,
} from "lucide-react";

import {
  toBase64,
  fromBase64,
  compressToBase64,
  decompressFromBase64,
} from "./lib/conversion";

type Mode = "encode" | "decode";

function App() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [isCompressed, setIsCompressed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { history, save } = useHistory();

  // Valores derivados para evitar setState no useEffect
  const { output, error } = useMemo(() => {
    if (!input) return { output: "", error: null };
    try {
      let result = "";
      if (mode === "encode") {
        result = isCompressed ? compressToBase64(input) : toBase64(input);
      } else {
        result = isCompressed ? decompressFromBase64(input) : fromBase64(input);
      }
      return { output: result, error: null };
    } catch {
      return { output: "", error: "Erro ao processar dados. Verifique o formato de entrada." };
    }
  }, [input, mode, isCompressed]);

  // Efeito apenas para o histórico (com debounce)
  useEffect(() => {
    if (!input || !output || error) return;

    const timer = setTimeout(() => {
      save({
        input,
        output,
        mode: isCompressed
          ? mode === "encode"
            ? "compress"
            : "decompress"
          : mode,
      });
    }, 1000); // 1s de debounce para o histórico

    return () => clearTimeout(timer);
  }, [input, output, error, mode, isCompressed, save]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AIOX Compressor</h1>
              <p className="text-slate-500 text-sm">
                Base64 Converter & Compression Tool
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-md border border-slate-800 text-sm"
          >
            <HistoryIcon className="w-4 h-4" />
            Histórico
          </button>
        </header>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center gap-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">Modo:</span>

            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setMode("encode")}
                className={`px-4 py-1.5 text-sm rounded ${
                  mode === "encode"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400"
                }`}
              >
                Encode
              </button>

              <button
                onClick={() => setMode("decode")}
                className={`px-4 py-1.5 text-sm rounded ${
                  mode === "decode"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400"
                }`}
              >
                Decode
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsCompressed(!isCompressed)}
            className={`px-3 py-1 text-sm rounded ${
              isCompressed ? "bg-indigo-600 text-white" : "bg-slate-800"
            }`}
          >
            Compressão
          </button>

          <button
            onClick={clearAll}
            className="ml-auto text-slate-500 hover:text-red-400"
          >
            <Trash2 />
          </button>
        </div>

        {/* WORKSPACE */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* INPUT */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Entrada..."
            className="h-80 p-4 bg-slate-900 rounded border border-slate-800 font-mono"
          />

          {/* OUTPUT */}
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Saída..."
              className="h-80 w-full p-4 bg-slate-900 rounded border border-slate-800 font-mono"
            />

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-red-400">
                <AlertCircle />
                <span className="ml-2">{error}</span>
              </div>
            )}

            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 text-xs px-2 py-1 bg-indigo-600 rounded"
            >
              {copied ? <Check /> : <Clipboard />}
            </button>
          </div>
        </main>

        {/* HISTORY PANEL */}
        {showHistory && (
          <div className="fixed right-0 top-0 h-full w-96 bg-slate-950 border-l border-slate-800 p-4 z-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
              <h2 className="font-bold text-lg">Histórico</h2>
              <button 
                onClick={() => setShowHistory(false)}
                className="p-1 hover:bg-slate-800 rounded"
              >
                <Trash2 className="w-4 h-4 rotate-45" /> {/* Use Trash2 rotated as a close icon or similar */}
              </button>
            </div>
            <HistoryPanel items={history} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;