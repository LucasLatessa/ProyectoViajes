import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Places from "../../places";
import { crearViaje } from "../../../services/viajes.service";
import "../styles/createViaje.css";

export const CreateViaje = ({ nickname }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fechaHora: "",
    asientosDisponibles: "",
    costoPorAsiento: "",
    descripcion: "",
    origenDireccion: "",
    origenLatitud: null,
    origenLongitud: null,
    destinoDireccion: "",
    destinoLatitud: null,
    destinoLongitud: null,
  });

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

    if (!formData.origenDireccion || !formData.destinoDireccion) {
      alert("Por favor, selecciona una dirección de origen y destino.");
      return;
    }

    try {
      const response = await crearViaje({
        fecha_hora: formData.fechaHora,
        asientos_disponibles: parseInt(formData.asientosDisponibles), 
        costo_por_asiento: parseFloat(formData.costoPorAsiento),
        descripcion: formData.descripcion,
        origen_direccion: formData.origenDireccion,
        origen_latitud: parseFloat(formData.origenLatitud),
        origen_longitud: parseFloat(formData.origenLongitud),
        destino_direccion: formData.destinoDireccion,
        destino_latitud: parseFloat(formData.destinoLatitud),
        destino_longitud: parseFloat(formData.destinoLongitud),
        organizador_nickname: user.nickname,
      });

      console.log("Respuesta del servidor:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      alert("Error al crear el viaje. Por favor, verifica los datos e intenta de nuevo.");
    }
  };

  const handleOrigenSelect = (location) => {
    setFormData((prevData) => ({
      ...prevData,
      origenDireccion: location.address,
      origenLatitud: location.lat,
      origenLongitud: location.lng,
    }));
  };

  const handleDestinoSelect = (location) => {
    setFormData((prevData) => ({
      ...prevData,
      destinoDireccion: location.address,
      destinoLatitud: location.lat,
      destinoLongitud: location.lng,
    }));
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
          <Places setSelectedLocation={handleOrigenSelect} />
        </label>
        <label className="form-label">
          Destino:
          <Places setSelectedLocation={handleDestinoSelect} />
        </label>
        <button type="submit" className="form-button">
          Crear Viaje
        </button>
      </form>
    </div>
  );
};
