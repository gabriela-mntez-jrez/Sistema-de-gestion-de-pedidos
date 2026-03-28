function TypeaheadSearch({
  query,
  onQueryChange,
  suggestions,
  showSuggestions,
  loading,
  onSelect,
  onFocus,
  onClickInside,
}) {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por dirección..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={onFocus}
        onClick={onClickInside}
      />

      {showSuggestions && (
        <div
          className="list-group position-absolute w-100 shadow-sm mt-1"
          style={{ zIndex: 1000 }}
          onClick={onClickInside}
        >
          {loading ? (
            <div className="list-group-item">Buscando...</div>
          ) : suggestions.length === 0 ? (
            <div className="list-group-item text-muted">
              No hay resultados que coincidan con tu búsqueda
            </div>
          ) : (
            suggestions.map((order) => (
              <button
                key={order.id}
                className="list-group-item list-group-item-action"
                onClick={() => onSelect(order)}
              >
                <b>{order.direccionEnvio}</b> — {order.estatus}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default TypeaheadSearch;
