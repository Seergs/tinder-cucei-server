import { isEmpty } from "../util/utils";

export function validateLoginInputData(inputData: any) {
  let errors: any = {};
  if (inputData.studentCode.trim().length !== 9) {
    errors.studentCode = "Inválido, debe ser un código de estudiante de UDG";
  }

  if (isEmpty(inputData.studentNip)) {
    errors.studentNip = "No puede estar vacío";
  }

  return errors;
}
