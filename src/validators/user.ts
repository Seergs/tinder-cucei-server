import { isEmpty } from "../util/utils";

export function validatePreferences(preferences: any) {
  let errors: any = {};

  if (isEmpty(preferences.preferedGender)) {
    errors.preferedGender = "No puede estar vacío";
  } else if (!["m", "f", "b"].includes(preferences.preferedGender)) {
    errors.preferedGender = "No es un género válido";
  }

  if (preferences.ageRange < 15 || preferences.ageRange > 50) {
    errors.ageRange = "Fuera de rango";
  }

  if (!preferences.interests.length) {
    errors.interests = "Debes elegir al menos un interés";
  }

  return errors;
}
