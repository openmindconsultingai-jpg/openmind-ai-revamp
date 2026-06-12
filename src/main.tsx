// build 2026-06-12-rollback — extensionless leaf files removed (CDN served them as octet-stream)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
