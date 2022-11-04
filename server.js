import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/headers', (req, res) => {
  const headers = req.headers;
  console.log(headers);
  res.json(headers);
});

app.listen(5500);
