// build 2026-06-29-js-split — manualChunks split monolithic bundle, terser drop_console, iframe IntersectionObserver lazy
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
