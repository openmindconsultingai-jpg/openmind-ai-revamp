// build 2026-06-29-fix-iframe-size — restored full-size responsive desktop neural iframe
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
