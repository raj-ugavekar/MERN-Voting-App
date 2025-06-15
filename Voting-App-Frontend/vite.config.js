import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/user": "https://mern-voting-app-xtn5.onrender.com/",
      "/candidate": "https://mern-voting-app-xtn5.onrender.com/",
    },
  },
  plugins: [react()],
});
