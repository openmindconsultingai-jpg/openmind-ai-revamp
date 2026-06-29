// build 2026-06-29-mobile-noiframe — mobile gets static SVG, desktop keeps lazy iframe
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
