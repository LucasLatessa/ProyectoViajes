import axios from "./axios";

// const apiServerUrl = "http://127.0.0.1:8000"
//const apiServerUrl = process.env.REACT_APP_DJANGO_BACKEND

const viajesAPI = axios.create({
  baseURL: `${axios.defaults.baseURL}/viajes/Viaje`,
  withCredentials: true,
})
export const getAllViajes = () => viajesAPI.get(`/`);

export const getViajesByCliente = (nickname) => viajesAPI.get(`/viajes_por_organizador/${nickname}/`);

export const getPostulacionesByViaje = (id) => viajesAPI.get(`/postulaciones_por_viaje/${id}/`);

export const deleteViaje = (id) => viajesAPI.delete(`/${id}/`);

export const getViaje = (id) => viajesAPI.get(`/${id}/`);

export const crearViaje = (viaje) => viajesAPI.post('/create',viaje);

export const changeStatePostu = (postu_id, estado) => viajesAPI.put(`/cambiar_estado_postu/${postu_id}/`, { estado });
export const postularseAViaje = (viajeId, nickname) => viajesAPI.post('/postularse', {
  viaje_id: viajeId,
  nickname: nickname
});
/* export const postularseAViaje = (viajeId, nickname) => {
  const csrftoken = getCookie('csrftoken');  // Función para obtener el token CSRF
  
  return viajesAPI.post(`/postularse/${viajeId}/`, {
    nickname: nickname,
  }, {
    headers: {
      'X-CSRFToken': csrftoken,  // Incluye el token CSRF en los encabezados
      'Content-Type': 'application/json',
    },
  });
};
 */
// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}