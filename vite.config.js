import { defineConfig } from "vite";
import { resolve } from "path";

const root = "./src";

export default defineConfig({
  root: root,
  build: {
    rollupOptions: {
      input: {
        login: resolve(root, "/login/index.html"),
        account: resolve(root, "/account/index.html"),
        register: resolve(root, "/register/index.html"),
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: "./home/index.html",
  },
  optimizeDeps: {
    include: ["./home/index.html"],
  },
});
