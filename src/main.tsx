// build 2026-06-30-voivodeship-pages — 16 wojewódzkich stron listingu (fix 404)
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
