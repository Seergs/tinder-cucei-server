import { isEmpty } from "../util/utils";
import careers from "../util/careers";

export function validateInputData(inputData: any) {
  let errors: any = {};

  if (isEmpty(inputData.description)) {
    errors.description = "Cuenta algo sobre ti, esto lo verán los demás";
  }

  if (isEmpty(inputData.firstName)) {
    errors.firstName = "No puede estar vacío";
  }
  if (isEmpty(inputData.lastName)) {
    errors.lastName = "No puede estar vacío";
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

  if (!/\d{4}-\d{2}-\d{2}/.test(inputData.birthday)) {
    errors.birthday = "Fecha inválida (YYYY-MM-DD)";
  }

  if (!["m", "f"].includes(inputData.gender)) {
    errors.gender = "Género inválido, debe ser 'm' o 'f'";
  }

  if (isEmpty(inputData.primaryImageUrl)) {
    errors.primaryImageUrl = "No puede estar vacía";
  } else if (
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(
      inputData.primaryImageUrl
    )
  ) {
    errors.primaryImageUrl = "Url inválido";
  }
  if (isEmpty(inputData.studentNip)) {
    errors.studentNip = "No puede estar vacío";
  }

  return errors;
}
