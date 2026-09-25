import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function staticStandalonePlugin() {
  return {
    name: 'static-standalone-bundler',
    apply: 'build',
    closeBundle() {
      try {
        const rootDir = process.cwd();
        const distDir = path.resolve(rootDir, 'dist');
        const distIndexPath = path.resolve(distDir, 'index.html');
        const dist404Path = path.resolve(distDir, '404.html');
        const distNoJekyllPath = path.resolve(distDir, '.nojekyll');
        const distAssetsDir = path.resolve(distDir, 'assets');
        const rootAssetsDir = path.resolve(rootDir, 'assets');

        // 1. Pastikan dist/index.html dapat dibuka via klik dua kali (file://), GitHub Pages, & Live Server
        // Ganti <script type="module" crossorigin src="..."> menjadi <script src="...">
        if (fs.existsSync(distIndexPath)) {
          let html = fs.readFileSync(distIndexPath, 'utf8');
          html = html.replace(/<script\s+type="module"\s+crossorigin\s+src="(\.\/assets\/[^"]+)"\s*><\/script>/g, '<script src="$1"></script>');
          html = html.replace(/<link\s+rel="stylesheet"\s+crossorigin\s+href="(\.\/assets\/[^"]+)"\s*>/g, '<link rel="stylesheet" href="$1">');
          fs.writeFileSync(distIndexPath, html);
          fs.writeFileSync(dist404Path, html);
          fs.writeFileSync(distNoJekyllPath, '');
          console.log('✓ dist/index.html, dist/404.html & dist/.nojekyll dikonfigurasi untuk static & file:// protocol');
        }

        // 2. Salin bundle dari dist/assets ke root /assets agar root index.html juga dapat langsung dibuka
        if (!fs.existsSync(rootAssetsDir)) {
          fs.mkdirSync(rootAssetsDir, { recursive: true });
        }
        if (fs.existsSync(distAssetsDir)) {
          const files = fs.readdirSync(distAssetsDir);
          for (const file of files) {
            fs.copyFileSync(path.join(distAssetsDir, file), path.join(rootAssetsDir, file));
          }
          console.log('✓ Bundle berhasil disinkronisasi ke /assets untuk eksekusi langsung dari root');
        }
      } catch (err) {
        console.warn('Peringatan saat post-processing build:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      staticStandalonePlugin(),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          format: 'iife',
          name: 'FasiReportApp',
          entryFileNames: 'assets/app.js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

