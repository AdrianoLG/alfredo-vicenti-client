export async function handleResponse(response) {
  if (response.ok) return response.json();
  switch (response.status) {
    case 400:
      const error = await response.json();
      throw new Error(error.message);
    case 401:
      throw new Error('Fallo de autentificación.');
    case 500:
      throw new Error('No hay conexión con la base de datos.');
    default:
      throw new Error('La respuesta de la red no fue la esperada.');
  }
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error('Falló la llamada a la API. ' + error);
  throw error;
}
