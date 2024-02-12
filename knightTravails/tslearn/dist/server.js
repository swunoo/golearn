// src/server.ts
import * as express from 'express';
import * as path from 'path';
const app = express();
const port = 8081;
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'resources/index.html');
    res.sendFile(htmlPath);
});
app.get('/api/calc', (req, res) => {
    const { start, goal } = req.query;
    console.log(start, goal);
    res.json({ result: "e1 -> e2" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
