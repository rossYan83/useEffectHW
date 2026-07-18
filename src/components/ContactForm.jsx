import { useRef, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import ContactsContext from '../context/ContactsContext';

export default function ContactForm() {
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const { addContact } = useContext(ContactsContext);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameRef.current.value.trim();
    const number = numberRef.current.value.trim();
    if (!name || !number) return;

    addContact({ id: nanoid(), name, number });

    nameRef.current.value = '';
    numberRef.current.value = '';
    nameRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          ref={nameRef}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number
        <input
          ref={numberRef}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
}