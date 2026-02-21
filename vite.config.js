import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				// здесь можно добавить дополнительные настройки для SCSS
			},
		},
	},
	server: {
		proxy: {
			// Все запросы, начинающиеся с /api...
			"/api": {
				// ...будут перенаправлены на твой json-server
				target: "http://localhost:5000",
				changeOrigin: true,
				// Убираем /api из пути, чтобы на json-server пришел чистый путь /users
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
