// build 2026-07-06-ai-only + iframe-bigger + loading-text
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initSignal } from "./components/fx/signal";

const root = document.getElementById("root");
if (root) {
  initSignal();
  createRoot(root).render(<App />);
}
