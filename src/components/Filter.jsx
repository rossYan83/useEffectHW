export default function Filter({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <label className="filter">
      Find contacts by name
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
}