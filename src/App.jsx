import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import ContactsContext from './context/ContactsContext';
import useContacts from './hooks/useContacts';

export default function App() {
  const { filter, setFilter, addContact, deleteContact, visibleContacts } =
    useContacts();

  return (
    <ContactsContext.Provider value={{ addContact, deleteContact }}>
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={setFilter} />
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
    </ContactsContext.Provider>
  );
}