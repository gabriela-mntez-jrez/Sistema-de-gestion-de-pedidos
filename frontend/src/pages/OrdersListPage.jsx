import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";
import CreateOrderModal from "../components/CreateOrderModal";
import { getOrders, searchOrders, deleteOrder } from "../services/ordersApi";

function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const data = await getOrders();
    setOrders(data);
  }

  async function handleSearch(value) {
    setQuery(value);

    if (!value.trim()) {
      loadOrders();
      return;
    }

    const results = await searchOrders(value);
    setOrders(results);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este pedido?");
    if (!confirmDelete) return;

    await deleteOrder(id);
    loadOrders();
  }

  return (
    <Layout title="Lista de Pedidos">
      {/* Search */}
      <div className="card shadow-sm p-4 mb-4">
        <h4>Buscar pedidos</h4>
        <input
          className="form-control"
          placeholder="Buscar por dirección..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0">Pedidos</h4>

          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createOrderModal"
          >
            + Crear Pedido
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Dirección</th>
                <th>Estatus</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>{order.direccionEnvio}</td>
                  <td>
                    <StatusBadge status={order.estatus} />
                  </td>
                  <td>${order.total}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        className="btn btn-outline-primary btn-sm"
                        to={`/orders/${order.id}`}
                      >
                        Ver
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(order.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && <p>No hay pedidos.</p>}
      </div>

      {/* Modal */}
      <CreateOrderModal onCreated={loadOrders} />
    </Layout>
  );
}

export default OrdersListPage;
