import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getOrderById, updateOrder } from "../services/ordersApi";
import EditableField from "../components/EditableField";
import EditableSelect from "../components/EditableSelect";
import BackButton from "../components/BackButton";
import StatusBadge from "../components/StatusBadge";

function OrderDetailPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    setLoading(true);
    const data = await getOrderById(id);
    setOrder(data);
    setForm(structuredClone(data));
    setLoading(false);
  }

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleItemChange(index, field, value) {
    setForm((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      return {
        ...prev,
        items: updatedItems,
      };
    });
  }

  function recalculateTotal(updatedForm) {
    return updatedForm.items.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio) || 0;
      return acc + cantidad * precio;
    }, 0);
  }

  async function handleSave() {
    const total = recalculateTotal(form);

    const updatedOrder = {
      ...form,
      total,
    };

    const saved = await updateOrder(id, updatedOrder);
    setOrder(saved);
    setForm(structuredClone(saved));
    setEditing(false);
  }

  function handleCancel() {
    setForm(structuredClone(order));
    setEditing(false);
  }

  if (loading) {
    return (
      <Layout title="Detalle del Pedido">
        <p>Cargando...</p>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout title="Detalle del Pedido">
        <p>No encontrado</p>
      </Layout>
    );
  }

  return (
    <Layout title="Detalle del Pedido">
      <div className="card shadow-sm p-4">
        <p>
          <b>ID:</b> {order.id}
        </p>

        <EditableField
          label="User ID"
          value={form.userId}
          editing={editing}
          onChange={(value) => handleChange("userId", value)}
        />

        <EditableField
          label="Dirección de Envío"
          value={form.direccionEnvio}
          editing={editing}
          onChange={(value) => handleChange("direccionEnvio", value)}
        />

        {editing ? (
            <EditableSelect
                label="Estatus"
                value={form.estatus}
                editing={editing}
                onChange={(value) => handleChange("estatus", value)}
                options={[
                { value: "CREADO", label: "CREADO" },
                { value: "ENVIADO", label: "ENVIADO" },
                { value: "ENTREGADO", label: "ENTREGADO" },
                { value: "CANCELADO", label: "CANCELADO" },
                ]}
            />
            ) : (
            <div className="mb-3">
                <label className="form-label">
                <b>Estatus</b>
                </label>
                <div>
                <StatusBadge status={form.estatus} />
                </div>
            </div>
        )}

        <h4 className="mt-4">Items</h4>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Código Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {form.items?.map((item, index) => (
              <tr key={index}>
                <td>{item.codigoProducto}</td>

                <td>
                  {editing ? (
                    <input
                      type="number"
                      className="form-control"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleItemChange(index, "cantidad", e.target.value)
                      }
                    />
                  ) : (
                    item.cantidad
                  )}
                </td>

                <td>
                  {editing ? (
                    <input
                      type="number"
                      className="form-control"
                      value={item.precio}
                      onChange={(e) =>
                        handleItemChange(index, "precio", e.target.value)
                      }
                    />
                  ) : (
                    `$${item.precio}`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <b>Total:</b> ${editing ? recalculateTotal(form) : order.total}
        </p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <BackButton to="/" label="Volver" />

          {!editing ? (
            <button className="btn btn-warning" onClick={() => setEditing(true)}>
              Editar
            </button>
          ) : (
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleSave}>
                Guardar
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetailPage;
