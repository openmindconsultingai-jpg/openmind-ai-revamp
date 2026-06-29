// build 2026-06-29-mobile-iframe-back — restore mobile iframe + desktop top-align
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
