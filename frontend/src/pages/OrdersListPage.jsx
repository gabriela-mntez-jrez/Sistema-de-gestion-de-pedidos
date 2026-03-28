import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import StatusBadge from "../components/StatusBadge";
import CreateOrderModal from "../components/CreateOrderModal";
import { getOrders, searchOrders, deleteOrder } from "../services/ordersApi";
import TypeaheadSearch from "../components/TypeaheadSearch";
import CreateUserModal from "../components/CreateUserModal";

function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    function handleClickOutside() {
      setShowSuggestions(false);
    }

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  async function loadOrders() {
    const data = await getOrders();
    setOrders(data);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este pedido?");
    if (!confirmDelete) return;

    await deleteOrder(id);
    loadOrders();
  }

  async function loadSuggestions(text) {
    if (!text.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoadingSuggestions(true);

    try {
      const results = await searchOrders(text);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSuggestions(false);
    }
  }

  return (
    <Layout title="Lista de Pedidos">
      {/* Search */}
      <div className="card shadow-sm p-4 mb-4">
        <h4>Buscar pedidos</h4>
        <TypeaheadSearch
          query={query}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          loading={loadingSuggestions}
          onQueryChange={(value) => {
            setQuery(value);

            //clear debounce timer
            if(debounceTimer){
              clearTimeout(debounceTimer);
            }

            //if value is empty, we reset everything
            if (!value.trim()) {
              setSuggestions([]);
              setShowSuggestions(false);
              loadOrders();
              return;
            }

            //set new debounce timer
            const timer = setTimeout(() => {
              loadSuggestions(value);
            }, 500);

            setDebounceTimer(timer);
          }}
          onSelect={(order) => {
            setOrders([order]);
            setShowSuggestions(false);
            setSuggestions([]);
            setQuery(order.direccionEnvio);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onClickInside={(e) => e.stopPropagation()}
        />
      </div>

      {/* Table */}
      <div className="card shadow-sm p-4">
        <div className="p-2">
          <h4>Pedidos</h4>
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

        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#createUserModal"
          >
            + Crear Usuario
          </button>
          <CreateUserModal onCreated={() => window.alert("Usuario creado")} />
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createOrderModal"
          >
            + Crear Pedido
          </button>
        </div>

        {orders.length === 0 && <p>No hay pedidos.</p>}
      </div>

      {/* Modal */}
      <CreateOrderModal onCreated={loadOrders} />
    </Layout>
  );
}

export default OrdersListPage;
