import Contact from './Contact';

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul className="contact-list">
      {contacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          name={name}
          number={number}
          onDelete={() => onDelete(id)}
        />
      ))}
    </ul>
  );
}