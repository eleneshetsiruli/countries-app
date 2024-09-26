import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;
  const componentsPath = `${srcPath}/components`;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "~": rootPath,
        "@": srcPath,
        "#": componentsPath,
      },
    },
  };
});
