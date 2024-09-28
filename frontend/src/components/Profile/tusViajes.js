import React, { useState, useEffect } from 'react';
import { getViajesByCliente } from '../../services/viajes.service';
import { Link } from "react-router-dom";
import './styles/Profile.css';

const TusViajes = ({ nickname }) => {
    const [viajes, setViajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchViajes = async () => {
        try {
          const response = await getViajesByCliente(nickname);
          setViajes(response.data);
        } catch (error) {
          setError('Error al cargar los viajes.');
          console.error('Error al cargar los viajes:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchViajes();
    }, [nickname]);
  
   
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div className="mis-viajes">
        <h2>Mis Viajes</h2>
        <div className="viajes-list">
          {viajes.map((viaje) => (
            <div key={viaje.id} className="viaje-item">
              <h3>{viaje.destino_direccion}</h3>
              <p><strong>Fecha:</strong> {new Date(viaje.fecha_hora).toLocaleDateString()}</p>
              <p><strong>Costo por Asiento:</strong> ${viaje.costo_por_asiento}</p>
              <p><strong>Origen:</strong> {viaje.origen_direccion}</p>
              <p><strong>Destino:</strong> {viaje.destino_direccion}</p>
              <Link to={`/viaje/${viaje.viaje_id}/postulaciones`}>
                <button>Ver Postulaciones</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TusViajes;