// build 2026-06-01 — bare-URL prerender (extensionless leaf files)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
