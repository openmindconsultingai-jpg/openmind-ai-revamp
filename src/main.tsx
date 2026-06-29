// build 2026-06-29-about-lazy — About neural iframe loads only on viewport
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
