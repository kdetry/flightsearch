import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

// API proxy middleware
app.use('/api', createProxyMiddleware({
  target: 'https://sky-scrapper.p.rapidapi.com',
  changeOrigin: true,
  pathRewrite: (path, req) => `/api${path}`,
  headers: {
    'X-Rapidapi-Key': process.env.RAPIDAPI_KEY || '',
    'X-Rapidapi-Host': 'sky-scrapper.p.rapidapi.com',
  },
}));

if (isProd) {
  // Serve static files from the React app in production
  app.use(express.static(join(__dirname, '../dist')));

  // Handle React routing in production
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${isProd ? 'production' : 'development'} mode`);
}); 