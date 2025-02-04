import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log(process.env.RAPIDAPI_KEY);
// Create proxy middleware
app.use('/', createProxyMiddleware({
  target: 'https://sky-scrapper.p.rapidapi.com',
  changeOrigin: true,
  headers: {
    'X-Rapidapi-Key': process.env.RAPIDAPI_KEY || '',
    'X-Rapidapi-Host': 'sky-scrapper.p.rapidapi.com',
  },
  logger: console,
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 