import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './src/routes/users';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per leggere il body delle richieste in JSON
app.use(express.json());

// Rotte principali
app.use('/api/users', usersRouter);

// Route di prova
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center">Benvenuto nel gestore utenti!</h1>');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});