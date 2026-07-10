export default function Contact({ name, number, onDelete }) {
  return (
    <li className="contact-item">
      <p>
        {name}: {number}
      </p>
      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}