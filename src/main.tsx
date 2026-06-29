// build 2026-06-29-canvas-perf — ParticleBackground throttled to 30 FPS + skipped on /about & /contact
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
