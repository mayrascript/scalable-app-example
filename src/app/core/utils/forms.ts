import { CustomForm } from "src/app/shared/models/custom-form";

export function isValidForm(form: CustomForm) {
  form.updateValueAndValidity();
  return form.isValid();
}
