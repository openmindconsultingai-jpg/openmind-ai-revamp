import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 300,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "radix-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-toast",
            "@radix-ui/react-popover",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-select",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-slot",
            "@radix-ui/react-label",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-switch",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
          ],
          "icons-vendor": ["lucide-react"],
          "animation-vendor": ["gsap", "lenis"],
          "query-vendor": ["@tanstack/react-query"],
          "form-vendor": ["react-hook-form", "zod", "@hookform/resolvers"],
          "utils-vendor": ["date-fns", "clsx", "tailwind-merge", "class-variance-authority"],
          "supabase-vendor": ["@supabase/supabase-js"],
          "markdown-vendor": ["react-markdown", "dompurify"],
          "pdf-vendor": ["jspdf"],
          "carousel-vendor": ["embla-carousel-react"],
          "chart-vendor": ["recharts"],
          "calendar-vendor": ["react-day-picker"],
        },
      },
    },
  },
}));
// build-id: 2026-06-29-js-split
