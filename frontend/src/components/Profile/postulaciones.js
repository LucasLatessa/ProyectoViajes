import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostulacionesByViaje, changeStatePostu, getViaje } from '../../services/viajes.service';
import { Header } from "../HeaderFooter/header";
import { Footer } from "../HeaderFooter/footer";
import './styles/Profile.css'; 

const Postulaciones = () => {
  const { id } = useParams();
  const [postulaciones, setPostulaciones] = useState([]);
  const [viaje, setViaje] = useState(null); // Cambiado a null para que sea un objeto cuando se establezca
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostulaciones = async () => {
      try {
        const response = await getPostulacionesByViaje(id);
        setPostulaciones(response.data);
      } catch (error) {
        setError('Error al cargar las postulaciones.');
        console.error('Error al cargar las postulaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchViaje = async () => {
      try {
        const response = await getViaje(id);
        setViaje(response.data);
      } catch (error) {
        setError('Error al cargar el viaje.');
        console.error('Error al cargar el viaje:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostulaciones();
    fetchViaje();
  }, [id]);

  const handleConfirmarPostulacion = async (postulacionId, newState) => {
    try {
      // Llama a la función para cambiar el estado de la postulación y actualizar los asientos disponibles
      const response = await changeStatePostu(postulacionId, newState);

      // Actualiza el estado local de las postulaciones con el nuevo estado
      const updatedPostulaciones = postulaciones.map((postulacion) => {
        if (postulacion.id === postulacionId) {
          return { ...postulacion, estado: newState };
        }
        return postulacion;
      });
      setPostulaciones(updatedPostulaciones);

      window.location.reload()
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Muestra el mensaje de error en un alert o similar
      }
      console.error('Error al actualizar estado de postulación:', error);
    }
  };

  if (loading) {
    return <div>Cargando postulaciones...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <><Header /> 
    <div className="postulaciones-container">
      <h2>Postulaciones al viaje con:</h2>
      {viaje && (
        <>
          <h4>Origen: {viaje.origen_direccion}</h4>
          <h4>Destino: {viaje.destino_direccion}</h4>
          <h4>Asientos disponibles: {viaje.asientos_disponibles}</h4>
        </>
      )}
      <div className="postulaciones-list">
        {postulaciones.map((postulacion) => (
          <div key={postulacion.id} className="postulacion-item">
            <p>Fecha de postulación: {postulacion.fecha_hora_postulacion}</p>
            <p>Datos del usuario: {postulacion.usuario.nickname} - {postulacion.usuario.nombre} {postulacion.usuario.apellido}</p>
            <p>Estado: {postulacion.estado}</p>
            {/* Botones para confirmar o rechazar postulación */}
            {postulacion.estado === 'pendiente' && (
              <>
                <button onClick={() => handleConfirmarPostulacion(postulacion.id, 'aceptada')}>
                  Confirmar
                </button>
                <button onClick={() => handleConfirmarPostulacion(postulacion.id, 'rechazada')}>
                  Rechazar
                </button>
              </>
            )}
            {postulacion.estado === 'aceptada' && (
              <button onClick={() => handleConfirmarPostulacion(postulacion.id, 'rechazada')}>
                Rechazar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer /> 
    </>
  );
};

export default Postulaciones;
