import express from 'express';
import fs from 'node:fs/promises';

const router = express.Router();
const filePath = 'file.txt';

router.get('/', async (req, res) => {
  try {
    await fs.access(filePath);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    if (fileContent === '') {
      return res.json({
        msg: 'El archivo existe pero aun no tiene contenido',
      });
    }

    res.json({
      msg: 'El archivo existe',
      content: fileContent,
    });
  } catch (error) {
    res.json({
      msg: 'El archivo no existe, agrega contenido para crear uno nuevo',
    });
  }
});

router.post('/', async (req, res) => {
  const { newInfo } = req.body;

  try {
    await fs.access(filePath);
    await fs.appendFile(filePath, `${newInfo}\n`);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    res.json({
      msg: 'Archivo actualizado correctamente',
      content: fileContent,
    });
  } catch (error) {
    await fs.writeFile(filePath, `${newInfo}\n`);
    const fileContent = await fs.readFile(filePath, 'utf-8');

    res.json({
      msg: 'Creando archivo nuevo...',
      content: fileContent,
    });
  }
});

export default router;
