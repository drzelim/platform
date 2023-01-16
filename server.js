import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ip', (req, res) => {
  const headers = req.headers;
  console.log(req);
  res.json(req.ip);
});

app.listen(5500);
