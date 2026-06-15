// build 2026-06-15-links-fix — internal links now end with .html to match sitemap/canonical (prevent Google canonical-mismatch de-indexing)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
