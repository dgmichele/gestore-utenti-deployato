import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
} from '../controllers/usersController.js';

const router = express.Router();

// Rotta per ottenere tutti gli utenti
router.get('/', getAllUsers);

// Rotta per ottenere un utente singolo (per ID)
router.get('/:id', getUserById);

// Rotta per creare un nuovo utente
router.post('/', createUser);

// Rotta per eliminare un utente (per ID)
router.delete('/:id', deleteUser);

export default router;