function EditableSelect({ label, value, editing, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="form-label">
        <b>{label}</b>
      </label>

      {editing ? (
        <select
          className="form-select"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}

export default EditableSelect;
