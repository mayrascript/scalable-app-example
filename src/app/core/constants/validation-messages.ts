const required = { required: 'Este campo es requerido.' };

const email = { email: 'Este formato de correo no es válido.' };

// tslint:disable-next-line:no-shadowed-variable
function minLength(minLength: number) {
  return { minLength: `Este campo contiene menos de ${minLength} caracteres.` };
}

export const ValidationMsg = {
  required,
  email,
  minLength,
};
