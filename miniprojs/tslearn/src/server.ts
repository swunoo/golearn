
// src/server.ts
const express = require('express')
const path = require('path')
const { travail } = require('./knightT');

const app = express();
const port = 8081;

app.use(express.static(path.join(__dirname, 'resources')));

app.get('/', (req: any, res: any) => {
  const htmlPath = path.join(__dirname, 'resources/index.html');
  res.sendFile(htmlPath);
});

app.get('/api/calc', (req:any, res: any) => {
  const { start, goal } = req.query;
  const path: string | null = travail(start, goal);
  res.json({ result: path });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
