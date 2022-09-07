export interface ProblemDetails {
  status: number;
  title: string;
  detail?: string;
  code?: string;
  [key: string]: any;
}

export interface ValidationError extends ProblemDetails {
  'invalid-params': { name?: string; reason: string; code: string }[];
}

export const isProblemDetailsError = (err: ProblemDetails | any): err is ProblemDetails => {
  return err?.status && err?.title;
};

export const isValidationError = (err: ValidationError | any): err is ValidationError => {
  return isProblemDetailsError(err) && err['invalid-params'];
};
