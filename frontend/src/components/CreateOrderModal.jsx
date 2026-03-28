import { useEffect, useState } from "react";
import { createOrder } from "../services/ordersApi";
import { getUsers } from "../services/usersApi";

function CreateOrderModal({ onCreated }) {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [userId, setUserId] = useState("");
  const [direccionEnvio, setDireccionEnvio] = useState("");
  const [estatus, setEstatus] = useState("CREADO");

  const [items, setItems] = useState([
    { codigoProducto: "", cantidad: 1, precio: 0 },
  ]);

  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoadingUsers(true);
      const data = await getUsers();
      setUsers(data);

      if (data.length > 0) {
        setUserId(data[0].id); // default: primer usuario
      }

      setLoadingUsers(false);
    } catch (err) {
      setError("Error cargando usuarios: " + err.message);
      setLoadingUsers(false);
    }
  }

  function handleItemChange(index, field, value) {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]:
          field === "cantidad" || field === "precio" ? Number(value) : value,
      };
      return updated;
    });
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { codigoProducto: "", cantidad: 1, precio: 0 },
    ]);
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function calculateTotal() {
    return items.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio) || 0;
      return acc + cantidad * precio;
    }, 0);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!userId) {
      setError("Debes seleccionar un usuario.");
      return;
    }

    if (items.length === 0) {
      setError("Debes agregar al menos un item.");
      return;
    }

    for (const item of items) {
      if (!item.codigoProducto.trim()) {
        setError("Todos los items deben tener código de producto.");
        return;
      }
    }

    try {
      const total = calculateTotal();

      const newOrder = {
        userId,
        direccionEnvio,
        estatus,
        items,
        total,
      };

      await createOrder(newOrder);

      // limpiar
      setDireccionEnvio("");
      setEstatus("CREADO");
      setItems([{ codigoProducto: "", cantidad: 1, precio: 0 }]);

      onCreated();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      className="modal fade"
      id="createOrderModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Pedido</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Usuario */}
              <div className="mb-3">
                <label className="form-label">
                  <b>Usuario</b>
                </label>

                {loadingUsers ? (
                  <p>Cargando usuarios...</p>
                ) : (
                  <select
                    className="form-select"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nombre} {u.apellidoPaterno} ({u.email})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Dirección */}
              <div className="mb-3">
                <label className="form-label">
                  <b>Dirección de Envío</b>
                </label>
                <input
                  className="form-control"
                  value={direccionEnvio}
                  onChange={(e) => setDireccionEnvio(e.target.value)}
                  required
                />
              </div>

              {/* Estatus */}
              <div className="mb-3">
                <label className="form-label">
                  <b>Estatus</b>
                </label>
                <select
                  className="form-select"
                  value={estatus}
                  onChange={(e) => setEstatus(e.target.value)}
                >
                  <option value="CREADO">CREADO</option>
                  <option value="ENVIADO">ENVIADO</option>
                  <option value="ENTREGADO">ENTREGADO</option>
                  <option value="CANCELADO">CANCELADO</option>
                </select>
              </div>

              <hr />

              {/* Items */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">Items</h5>

                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={addItem}
                >
                  + Agregar Item
                </button>
              </div>

              <div className="mt-3">
                {items.map((item, index) => (
                  <div key={index} className="card p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="m-0">Item #{index + 1}</h6>

                      {items.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeItem(index)}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>

                    <div className="mt-3">
                      <label className="form-label">
                        <b>Código Producto</b>
                      </label>
                      <input
                        className="form-control"
                        value={item.codigoProducto}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "codigoProducto",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label className="form-label">
                          <b>Cantidad</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={item.cantidad}
                          min="1"
                          onChange={(e) =>
                            handleItemChange(index, "cantidad", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">
                          <b>Precio</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          value={item.precio}
                          min="0"
                          onChange={(e) =>
                            handleItemChange(index, "precio", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3">
                <b>Total:</b> ${calculateTotal()}
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss={error ? undefined : "modal"}
              >
                Crear Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrderModal;
