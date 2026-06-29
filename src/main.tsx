// build 2026-06-29-fcp-fix — About hero renders instantly, particles restored with visibility + IO + 30fps throttle
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
