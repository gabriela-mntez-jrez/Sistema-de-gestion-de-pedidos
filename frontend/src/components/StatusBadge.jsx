function StatusBadge({ status }) {
  const normalized = (status || "").toUpperCase();

  let className = "badge bg-secondary";

  if (normalized === "CREADO") className = "badge bg-primary";
  if (normalized === "ENVIADO") className = "badge bg-warning text-dark";
  if (normalized === "ENTREGADO") className = "badge bg-success";
  if (normalized === "CANCELADO") className = "badge bg-danger";

  return <span className={className}>{normalized}</span>;
}

export default StatusBadge;
