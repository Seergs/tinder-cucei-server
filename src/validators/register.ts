import { isEmpty } from "../util/utils";
import careers from "../util/careers";

export function validateInputData(inputData: any) {
  let errors: any = {};

  if (isEmpty(inputData.description)) {
    errors.description = "Cuenta algo sobre ti, esto lo verás los demás";
  }

  if (isEmpty(inputData.fatherLastName)) {
    errors.fatherLastName = "No puede estar vacío";
  }
  if (isEmpty(inputData.motherLastName)) {
    errors.motherLastName = "No puede estar vacío";
  }
  if (isEmpty(inputData.name)) {
    errors.name = "No puede estar vacío";
  }

  if (inputData.studentCode.trim().length !== 9) {
    errors.studentCode = "Inválido, debe ser un código de estudiante de UDG";
  }

  if (isEmpty(inputData.studentNip)) {
    errors.studentNip = "No puede estar vacío";
  }

  if (!Object.keys(careers).includes(inputData.career)) {
    errors.career = "Carrera no encontrada";
  }

  if (!/\d{4}-\d{2}-\d{2}/.test(inputData.dateOfBirth)) {
    errors.dateOfBirth = "Fecha inválida (YYYY-MM-DD)";
  }

  return errors;
}
