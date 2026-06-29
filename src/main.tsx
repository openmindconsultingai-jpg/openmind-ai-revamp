// build 2026-06-29-hotfix-iframe — guarantee LazyNeuralIframe load (100ms timeout)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
