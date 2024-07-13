import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from 'react-router-dom';
import { Header } from '../../HeaderFooter/header';
import { Footer } from '../../HeaderFooter/footer';
import { getViaje, postularseAViaje } from '../../../services/viajes.service';
import { getUserId } from '../../../services/usuarios.service';
import '../styles/home.css'; // Importar los estilos CSS

const ViajePage = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { id } = useParams(); // Obtener el id del viaje desde los parámetros de la URL
  const [viaje, setViaje] = useState(null);
  const [organizador, setOrganizador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViaje = async () => {
      try {
        const response = await getViaje(id); // Obtener los datos del viaje usando su id
        setViaje(response.data);
        // Obtener los datos del organizador usando el id del organizador del viaje
        const responseOrganizador = await getUserId(response.data.organizador);
        setOrganizador(responseOrganizador.data);
      } catch (error) {
        setError('Error al cargar el viaje.');
        console.error('Error al cargar el viaje:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchViaje();
  }, [id]);

  // Función para formatear la fecha y hora
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate} - ${formattedTime}`;
  };

  const handlePostularse = async () => {
    try {
      await postularseAViaje(id, user.nickname); // Usando el id del viaje y el nickname del usuario actual
      alert('Postulación realizada con éxito');
    } catch (error) {
      console.error('Error al postularse:', error);
      alert('Error al postularse. Por favor, intenta de nuevo.');
    }
  };

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      <Header />
      <div className="viaje-page">
        <main className="App">
          <section className="viaje-section">
            <h2>Detalles del Viaje</h2>
            <div className="viaje-details">
              <p><strong>Fecha y Hora:</strong> {formatDateTime(viaje.fecha_hora)}</p>
              <p><strong>Asientos Disponibles:</strong> {viaje.asientos_disponibles}</p>
              <p><strong>Costo por Asiento:</strong> ${viaje.costo_por_asiento}</p>
              <p><strong>Descripción:</strong> {viaje.descripcion}</p>
              <p><strong>Origen:</strong> {viaje.origen_direccion}</p>
              <p><strong>Destino:</strong> {viaje.destino_direccion}</p>
              <p><strong>Organizador:</strong> {organizador.nickname}</p>
            </div>
            {isAuthenticated ? (
              <button onClick={handlePostularse}>Postularme</button>
            ) : (
              <div className="login-message">
                <p>Para postularte viajes, por favor <a href="" onClick={loginWithRedirect}>inicia sesión</a>.</p>
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ViajePage;
