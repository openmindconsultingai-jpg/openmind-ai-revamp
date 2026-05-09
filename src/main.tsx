// Force rebuild: 2026-05-09 deploy v2 (sitemap cache bust)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
