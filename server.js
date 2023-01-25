import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log('Hello');
  res.send('Hello')
})

app.post('/fp-canvas', async (req, res) => {
 try {
  const fpCanvas = req.body;
  console.log(fpCanvas);
  console.log('creating canvas fp');
  await fs.promises.writeFile('./db/fp-canvas.json', JSON.stringify(fpCanvas, null, 2), (err) => {console.log(err);});
  res.send('ok')
 } catch (err) {
  console.log(err);
  res.send('no ok')
 }
});

app.listen(5500);
