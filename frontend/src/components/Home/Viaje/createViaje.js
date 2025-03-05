import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { crearViaje, getLugares } from "../../../services/viajes.service";
import "../styles/createViaje.css";

export const CreateViaje = ({ nickname }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [error, setError] = useState("");
  const [lugares, setLugares] = useState([]);
  const [formData, setFormData] = useState({
    fechaHora: "",
    asientosDisponibles: "",
    costoPorAsiento: "",
    descripcion: "",
    origen: "",
    destino: ""
  });
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await getLugares();
        setLugares(response.data);
      } catch (error) {
        console.error("Error al obtener los lugares:", error);
      }
    };
    fetchLugares();
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateViaje = async (e) => {
    e.preventDefault();
    try {
      const response = await crearViaje({
        fecha_hora: formData.fechaHora,
        asientos_disponibles: parseInt(formData.asientosDisponibles), 
        costo_por_asiento: parseFloat(formData.costoPorAsiento),
        descripcion: formData.descripcion,
        origen: formData.origen,
        destino: formData.destino,
        organizador_nickname: user.nickname,
      });

      console.log("Respuesta del servidor:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      alert("Error al crear el viaje. Por favor, verifica los datos e intenta de nuevo.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="create-viaje-container">
        <h2>Crear Nuevo Viaje</h2>
        <div className="login-message">
          <p>Para crear un viaje, por favor <a href="#" onClick={loginWithRedirect}>inicia sesión</a>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-viaje-container">
      <h2>Crear Nuevo Viaje</h2>
      <p className="disclaimer">
        Aviso: No incluya información personal en la publicacion del viaje, ya que será visible para todos los usuarios.
      </p>
      <form onSubmit={handleCreateViaje}>
        <label className="form-label">
          Fecha y Hora:
          <input
            type="datetime-local"
            name="fechaHora"
            value={formData.fechaHora}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Asientos Disponibles:
          <input
            type="number"
            name="asientosDisponibles"
            value={formData.asientosDisponibles}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Costo por Asiento:
          <input
            type="number"
            name="costoPorAsiento"
            value={formData.costoPorAsiento}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </label>
        <label className="form-label">
          Origen:
          <select name="origen" value={formData.origen} onChange={handleChange} required className="form-select">
            <option value="">Seleccione un origen</option>
            {lugares.map((lugar) => (
              <option key={lugar.lugar_id} value={lugar.descripcion}  className="form-option">
                {lugar.descripcion}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Destino:
          <select name="destino" value={formData.destino} onChange={handleChange} required className="form-select">
            <option value="">Seleccione un destino</option>
            {lugares.map((lugar) => (
              <option key={lugar.lugar_id} value={lugar.descripcion}  className="form-option">
                {lugar.descripcion}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="form-button">
          Crear Viaje
        </button>
      </form>
    </div>
  );
};
