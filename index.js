import express from 'express';
import cors from 'cors';
import fileRouter from './routes/fileRouter.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/file', fileRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log('Server iniciado en el puerto: ', PORT);
});
