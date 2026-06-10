import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
const githubPagesFallback = () => ({
  name: "github-pages-spa-fallback",
  closeBundle() {
    const indexPath = resolve(__dirname, "out/index.html");
    const fallbackPath = resolve(__dirname, "out/404.html");
    const globalRoutePath = resolve(__dirname, "out/global/index.html");
    if (!existsSync(indexPath)) return;
    copyFileSync(indexPath, fallbackPath);
    mkdirSync(resolve(__dirname, "out/global"), { recursive: true });
    copyFileSync(indexPath, globalRoutePath);
  },
});

// https://vite.dev/config/
export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
    __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
    __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
    __READDY_AI_DOMAIN__: JSON.stringify(process.env.READDY_AI_DOMAIN || ""),
  },
  plugins: [
    react(),
    githubPagesFallback(),
    AutoImport({
      imports: [
        {
          react: [
            "React",
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        // React i18n
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    sourcemap: false,
    outDir: "out",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
