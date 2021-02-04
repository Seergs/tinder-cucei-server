import careers from "../util/careers";
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

export function validateProfile(profile: any) {
  let errors: any = {};

  if (isEmpty(profile.primaryImageUrl)) {
    errors.primaryImageUrl = "No puede estar vacía";
  } else if (
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(
      profile.primaryImageUrl
    )
  ) {
    errors.primaryImageUrl = "Url inválido";
  }
  if (isEmpty(profile.firstName)) {
    errors.firstName = "No puede estar vacío";
  }
  if (isEmpty(profile.lastName)) {
    errors.lastName = "No puede estar vacío";
  }
  if (!careers.includes(profile.career)) {
    errors.career = "Carrera no encontrada";
  }
  if (isEmpty(profile.description)) {
    errors.description = "Cuenta algo sobre ti, esto lo verán los demás";
  }

  return errors;
}
