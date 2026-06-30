// build 2026-06-30-remove-si — usunięto "SI" z tekstów (AI/SI → AI, "AI i SI" → AI)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
