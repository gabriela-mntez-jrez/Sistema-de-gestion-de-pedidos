import { Link } from "react-router-dom";

function OrdersTable({ orders, onDelete }) {
  return (
    <table className="table table-striped table-hover bg-white shadow-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Estatus</th>
          <th>Dirección</th>
          <th>Total</th>
          {onDelete && <th></th>}
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>
              <Link to={`/orders/${order.id}`}>{order.id}</Link>
            </td>
            <td>{order.estatus}</td>
            <td>{order.direccionEnvio}</td>
            <td>${order.total}</td>

            {onDelete && (
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(order.id)}
                >
                  Eliminar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
