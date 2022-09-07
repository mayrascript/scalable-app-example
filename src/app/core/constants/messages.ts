export const Messages = {
  Error: 'Por favor, intente nuevamente o contacte al administrador del sistema',
  InvalidForm: 'Existen campos inválidos. Por favor revise e intente nuevamente.',
  LoginExpired: 'Tiempo expirado, por favor inicie sesión nuevamente.',
  LoginWelcome: 'Usuario autenticado exitosamente, bienvenido.',
  InvalidCredentials: 'Usuario o contraseña inválida.',
  EmailNotVerified: 'El email no se encuentra activo, por favor verifique su correo electrónico.',
  UserExistsError: 'El usuario ingresado ya existe, por favor ingrese uno diferente.',
  LoginUserSuccessfullCreated: 'Usuario creado exitosamente.',
  Remove:
    '¿Está seguro que desea remover el elemento seleccionado?<br>Esta es una acción permanente.',
  Removed: 'Elemento removido correctamente.',
  SuccessfulRequest: 'Solicitud enviada exitosamente',
  Saving: 'Guardando, por favor espere...',
  Saved: 'Información guardada correctamente.',
  SavedWithErrors:
    'Guardado con errores, intente nuevamente o contacte a un administrador del sistema.',
  Updated: 'Información actualizada correctamente.',
  Downloading: 'Descargando, por favor espere...',
  ConfirmationMessage: 'Mensaje de confirmación',
};

export const DynamicMessages = {
  changeUserStatusConfirmation: (currentStatus: string, newStatus: string) =>
    `Está seguro que desea cambiar el estado del usuario <b>${currentStatus}</b> a <b>${newStatus}</b>'`,
};
