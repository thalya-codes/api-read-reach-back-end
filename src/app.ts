import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './database/connect';
import routes from './routes';
dotenv.config();

const PORT = 3001;
const app = express();

connectToDatabase();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log('servidor rodando na porta: ', PORT);
});
