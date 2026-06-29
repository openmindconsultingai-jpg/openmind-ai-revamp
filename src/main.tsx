// build 2026-06-29-finalB — auto-load iframe after 5s + dns-prefetch + responsive home iframe
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
