import { isEmpty } from "../util/utils";

export function validatePreferences(preferences: any) {
  let errors: any = {};

  if (isEmpty(preferences.preferedGender)) {
    errors.preferedGender = "No puede estar vacío";
  } else if (!["m", "f", "b"].includes(preferences.preferedGender)) {
    errors.preferedGender = "No es un género válido";
  }

  if (preferences.minAge < 15) {
    errors.minAge = "Fuera de rango";
  }

  if (preferences.maxAge > 50) {
    errors.maxAge = "Fuera de rango";
  }

  if (!preferences.interests.length) {
    errors.interests = "Debes elegir al menos un interés";
  }

  return errors;
}
