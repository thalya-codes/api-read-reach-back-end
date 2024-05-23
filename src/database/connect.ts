import { createConnection } from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  insecureAuth: true,
});

export function connectToDatabase() {
  connection.connect((err: any) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
  });
}
