import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserNick, actualizarUsuario, crearUsuario } from "../../services/usuarios.service";
import "./styles/Profile.css"; 
import { Header } from "../HeaderFooter/header";
import { Footer } from "../HeaderFooter/footer";
import TusViajes from "./tusViajes";
export const Profile = () => {
  const { user, isAuthenticated, isLoading, logout,loginWithRedirect  } = useAuth0();
  const [usuario, setUsuario] = useState(null); 
  const [editingUserData, setEditingUserData] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUserNick(user.nickname);
        setUsuario(response.data.usuario); 
      } catch (error) {
        if (error.response && error.response.status === 404) {
          try {
            const nuevoUsuario = {
              nickname: user.nickname,
              nombre: user.given_name && user.given_name.trim() !== "" ? user.given_name : user.nickname, 
              apellido: user.family_name && user.family_name.trim() !== "" ? user.family_name : user.nickname,
              email: user.email,
            };
            // Crear el usuario si no existe
            const crearResponse = await crearUsuario(nuevoUsuario);
            // Ahora cargar el nuevo usuario
            if (crearResponse.data ) {
              setUsuario(crearResponse.data); // Asignar el nuevo usuario al estado
            } else {
              console.error("Error: No se encontró el usuario en la respuesta después de crearlo");
            }
          } catch (errorCrear) {
            console.error("Error al crear el usuario:", errorCrear);
          }
        } else {
          console.error("Error al obtener usuario:", error);
        }
      }
    };
  
    if (isAuthenticated && user) {
      fetchUsuario();
    }
  }, [isAuthenticated, user]);
  

  const handleUpdateProfile = async () => {
    try {
      const response = await actualizarUsuario(editingUserData); 
      const updatedUser = response.data;
      setUsuario(updatedUser);
      setEditingUserData(null); 
      setError(null); 
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setError("Error al actualizar el perfil");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogoutClick = () => {
    logout({ returnTo: window.location.origin });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Header /> 
      
        {isAuthenticated ? (
          
          <div className="profile-container">
            <h2>Perfil de Usuario</h2>
            {usuario && (
              <>
                <img src={user.picture} alt={user.name} className="avatar" />
                
                <p className="info">Nickname: {usuario.nickname}</p>
                <p className="info">Correo: {usuario.email}</p>
                {error && <p className="error-message">{error}</p>}
                {editingUserData ? (
                  <div className="edit-profile-form">
                    <h3>Editar perfil</h3>
                    <label className="edit-label">
                      Nombre
                      <input
                        type="text"
                        name="nombre"
                        value={editingUserData.nombre || ""}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </label>
                    <label className="edit-label">
                      Apellido
                      <input
                        type="text"
                        name="apellido"
                        value={editingUserData.apellido || ""}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </label>
                    <label className="edit-label">
                      DNI
                      <input
                        type="number"
                        name="dni"
                        value={editingUserData.dni || ""}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </label>
                    <button onClick={handleUpdateProfile} className="edit-button">Guardar cambios</button>
                  </div>
                ) : (
                  <>
                    <p className="info">Nombre: {usuario.nombre}</p>
                    <p className="info">Apellido: {usuario.apellido}</p>
                    <p className="info">DNI: {usuario.dni}</p>
                    <button onClick={() => setEditingUserData({ ...usuario })} className="edit-button">
                      Editar perfil
                    </button>
                  </>
                )}
                <TusViajes nickname={user.nickname} />
              </>
            )}
            <button onClick={handleLogoutClick} className="logout-button">Logout</button>
            </div>
        ) : (
          <div className="login-message">
            <p>Para acceder a tu perfil, por favor <a href="#" onClick={loginWithRedirect}>inicia sesión</a>.</p>
          </div>
        )}
      
      <Footer />
    </>
  );
};