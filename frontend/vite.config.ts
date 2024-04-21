import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['chunk-XWIUS3W6'], // Исключаемые зависимости
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
    },
});
