import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

function getAllFiles(folder, nameOnly = false){
  function *walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        yield* walkSync(path.join(dir, file.name));
      } else {
        if (nameOnly) {
          yield file.name;
        } else {
          yield path.join(dir, file.name);
        }
      }
    }
  }
  const allFiles = []
  for (const filePath of walkSync(folder)) {
    allFiles.push(filePath);
  }
  return allFiles;
}

app.post('/fp-canvas', async (req, res) => {
 try {
  const dirrectory = './db/';
  const fpCanvas = req.body;
  console.log('creating canvas fp');

  await fs.promises.writeFile(`${dirrectory}fp-canvas-${uuidv4()}.json`, JSON.stringify(fpCanvas, null, 2), (err) => {console.log(err);});
  res.send('ok')
 } catch (err) {
  console.log(err);
  res.send(err.message)
 }
});

app.listen(5555);
