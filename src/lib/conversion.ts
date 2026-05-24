import pako from "pako";

// Texto -> Base64 (UTF-8 safe)
export function toBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

// Base64 -> Texto
export function fromBase64(base64: string): string {
  return decodeURIComponent(escape(atob(base64)));
}

// Compressão + Base64
export function compressToBase64(text: string): string {
  const compressed = pako.deflate(text);
  let binary = "";
  compressed.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

// Base64 -> descompressão
export function decompressFromBase64(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
  return pako.inflate(bytes, { to: "string" });
}