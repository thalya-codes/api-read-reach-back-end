import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database/connect';
import routes from './routes';

dotenv.config();
connectToDatabase();

const PORT = 3003;
const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log('servidor rodando na porta: ', PORT);
});
