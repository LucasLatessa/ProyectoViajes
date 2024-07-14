import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserNick, actualizarUsuario, crearUsuario } from "../../services/usuarios.service";
import "./styles/Profile.css"; 
import { Header } from "../HeaderFooter/header";
import { Footer } from "../HeaderFooter/footer";
import TusViajes from "./tusViajes";
export const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [usuario, setUsuario] = useState(null); 
  const [editingUserData, setEditingUserData] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUserNick(user.nickname);
        if (response.data.usuario) {
          setUsuario(response.data.usuario); 
        } else {
          // Si el usuario no existe, crearlo
          const nuevoUsuario = {
            nickname: user.nickname,
            nombre: user.given_name || "",
            apellido: user.family_name || "",
            email: user.email,
            // Otros campos necesarios según tu modelo
          };
          const crearResponse = await crearUsuario(nuevoUsuario);
          setUsuario(crearResponse.data.usuario);
        }
      } catch (error) {
        console.error("Error al obtener/crear usuario:", error);
      }
    };

    if (isAuthenticated && user) {
      fetchUsuario();
    }
  }, [isAuthenticated, user]);

  // Actualizar perfil del usuario
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
    isAuthenticated && (
      <>
      <Header /> 
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
            <TusViajes nickname={user.nickname}/>
          </>
        )}
        <button onClick={handleLogoutClick} className="logout-button">Logout</button>
      </div>
      <Footer />
      </>
    )
  );
};
