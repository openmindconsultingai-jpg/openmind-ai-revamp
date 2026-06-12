// build 2026-06-12-rollback-v2 — confirm: no extensionless leaf files in dist (only {slug}.html + {slug}/index.html)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
