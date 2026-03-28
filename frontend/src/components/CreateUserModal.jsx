import { useState } from "react";
import { createUser } from "../services/usersApi";

function CreateUserModal({ onCreated }) {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const newUser = {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
      };

      await createUser(newUser);

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setEmail("");

      onCreated();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      className="modal fade"
      id="createUserModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Usuario</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label className="form-label">
                  <b>Nombre</b>
                </label>
                <input
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Apellido Paterno</b>
                </label>
                <input
                  className="form-control"
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Apellido Materno</b>
                </label>
                <input
                  className="form-control"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUserModal;
