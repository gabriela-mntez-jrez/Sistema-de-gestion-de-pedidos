function TypeaheadSearch({ query, onChange, suggestions, onSelect }) {
  return (
    <div className="mb-3" style={{ maxWidth: "500px" }}>
      <input
        className="form-control"
        value={query}
        onChange={onChange}
        placeholder="Buscar por estatus, dirección o código de producto..."
      />

      {query.trim() && (
        <div className="border rounded bg-white mt-1">
          {suggestions.length > 0 ? (
            suggestions.map((order) => (
              <div
                key={order.id}
                className="p-2"
                style={{ cursor: "pointer" }}
                onClick={() => onSelect(order)}
              >
                {order.id} - {order.estatus}
              </div>
            ))
          ) : (
            <div className="p-2 text-muted">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TypeaheadSearch;
