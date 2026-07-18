import { createContext } from 'react';

const ContactsContext = createContext({
  addContact: () => {},
  deleteContact: () => {},
});

export default ContactsContext;
