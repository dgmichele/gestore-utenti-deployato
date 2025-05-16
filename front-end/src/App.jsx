import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Funzione per ottenere tutti gli utenti dal back-end
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Errore nel recuperare gli utenti:', error);
    }
  };

  // Funzione per creare un nuovo utente
  const addUser = async () => {
    if (!newUser.name || !newUser.email) return; // se non inserisci tutti i dati, il submit non parte

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setNewUser({ name: '', email: '' }); // resetta l'input dopo il submit
        fetchUsers(); // aggiorna la lista
      }
    } catch (error) {
      console.error('Errore nel creare l\'utente:', error);
    }
  };

  // Funzione per eliminare un utente
  const deleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      fetchUsers(); // aggiorna la lista
    } catch (error) {
      console.error('Errore nel cancellare l\'utente:', error);
    }
  };

  // Carica gli utenti al primo caricamento della pagina
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Gestore Utenti</h1>

      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Nome"
          value={newUser.name} // facciamo gestire l'input dallo stato di React: ogni volta che l'utente digita, lo stato viene aggiornato
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} // ...newUser serve per sovrascrivere i dati vecchi con i nuovi nello stato di React
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} // ...newUser serve per sovrascrivere i dati vecchi con i nuovi nello stato di React
        />
        <button type='submit'>Aggiungi Utente</button>
      </form>

      <h2>Lista Utenti</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => deleteUser(user.id)}>Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
