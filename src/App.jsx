import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const LOCAL_STORAGE_KEY = 'phonebook-contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}