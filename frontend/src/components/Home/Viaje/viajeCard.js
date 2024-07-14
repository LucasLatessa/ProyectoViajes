import React from 'react';
import { Link } from 'react-router-dom';

const ViajeCard = ({ viaje }) => {
  return (
    <div className="viaje-card">
      <h3>{viaje.destino_direccion}</h3>
      <p>
        <strong>Fecha:</strong> {new Date(viaje.fecha_hora).toLocaleDateString()}
      </p>
      {/* <p>
        <strong>Asientos Disponibles:</strong> {viaje.asientos_disponibles}
      </p> */}
      <p>
        <strong>Costo por Asiento:</strong> ${viaje.costo_por_asiento}
      </p>
      {/* <p>
        <strong>Descripción:</strong> {viaje.descripcion}
      </p> */}
      <p>
        <strong>Origen:</strong> {viaje.origen_direccion}
      </p>
      <p>
        <strong>Destino:</strong> {viaje.destino_direccion}
      </p>
      <Link to={`/viaje/${viaje.viaje_id}`} className="ver-mas-link">
        Ver detalles del viaje
      </Link>
    </div>
  );
};

export default ViajeCard;
