function EditableField({ label, value, editing, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label className="form-label">
        <b>{label}</b>
      </label>

      {editing ? (
        <input
          className="form-control"
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}

export default EditableField;
