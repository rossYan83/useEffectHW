import { useEffect, useReducer, useState } from 'react';

const LOCAL_STORAGE_KEY = 'phonebook-contacts';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function contactsReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'delete':
      return state.filter((contact) => contact.id !== action.payload);
    default:
      return state;
  }
}

export default function useContacts() {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts, () => {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    dispatch({ type: 'add', payload: newContact });
  };

  const deleteContact = (id) => {
    dispatch({ type: 'delete', payload: id });
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return { contacts, filter, setFilter, addContact, deleteContact, visibleContacts };
}
