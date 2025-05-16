import db from '../db/knex.js';

// Ottieni tutti gli utenti
export const getAllUsers = async (req, res) => {
  try {
    const users = await db('users').select('*'); // SELECT * FROM users;
    res.json(users);
  } catch (error) {
    console.error('Errore dettagliato:', error);
    res.status(500).json({ error: 'Errore nel recuperare gli utenti' });
  }
};

// Ottieni un utente specifico tramite ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db('users').where({ id }).first(); // SELECT * FROM users WHERE id = ? LIMIT 1;

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recuperare l\'utente' });
  }
};

// Crea un nuovo utente
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email sono obbligatori' });
  }

  try {
    const [id] = await db('users').insert({ name, email }); // destrutturazione: salva nella variabile [id] il primo valore dell'array restituito dalla query .insert
    res.status(201).json({ id, name, email }); // l'id si crea grazie all'auto increment che si attiva ogni volta che si aggiunge una nuova riga
  } catch (error) {
    res.status(500).json({ error: 'Errore nella creazione dell\'utente' });
  }
};

// Elimina un utente tramite ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const rowsDeleted = await db('users').where({ id }).del();

    if (rowsDeleted) {
      res.json({ message: 'Utente eliminato con successo' });
    } else {
      res.status(404).json({ error: 'Utente non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore nella cancellazione dell\'utente' });
  }
};
