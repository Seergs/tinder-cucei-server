import { Resolver, Mutation, Query, Arg, Ctx } from "type-graphql";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { sign } from "jsonwebtoken";
import {
  UserRegisterInput,
  UserRegisterResult,
  UserRegisterInvalidInputError,
  UserRegisterResultSuccess,
} from "../types/graphql/registerTypes";
import {
  UserLoginResult,
  UserLoginInput,
  UserLoginInvalidInputError,
  UserLoginResultSuccess,
} from "../types/graphql/loginTypes";

import {
  MeResultError,
  MeResult,
  MeResultSuccess,
  UpdatePreferencesInput,
  UpdatePreferencesResult,
  UpdatePreferencesInputError,
  UpdatePreferencesSuccess,
  UpdateProfileInput,
  UpdateProfileInputError,
  UpdateProfileResult,
  UpdateProfileSuccess,
} from "../types/graphql/userTypes";

import { validateSignupInputData } from "../validators/register";
import { validateLoginInputData } from "../validators/login";
import { validatePreferences, validateProfile } from "../validators/user";
import User from "../entities/User";
import { parseCookies, parseDate } from "../util/utils";

@Resolver()
export default class UserResolver {
  @Query(() => MeResult)
  async me(@Ctx("user") user: Partial<User> | null) {
    if (!user) {
      return new MeResultError("No has iniciado sesión");
    }
    const userDb = await User.findOne(user.id);

    return new MeResultSuccess({ ...user, preferences: userDb?.preferences });
  }

  @Mutation(() => UserRegisterResult)
  async register(
    @Arg("registerInputData") inputData: UserRegisterInput
  ): Promise<typeof UserRegisterResult> {
    // User input validation
    const errors = validateSignupInputData(inputData);
    if (Object.keys(errors).length)
      return new UserRegisterInvalidInputError(errors);

    // Validate user registered already
    if (await User.count({ studentCode: inputData.studentCode })) {
      return new UserRegisterInvalidInputError({
        studentCode:
          "Ya existe una cuenta asociada a este código, intenta iniciar sesión",
      });
    }

    // Credentials validation
    /*
    const {
      campus: campusError,
      credentials: credentialsError,
    } = await loginToSiiau(inputData.studentCode, inputData.studentNip);

    if (campusError) errors.campus = campusError;
    if (credentialsError) errors.credentials = credentialsError;

    if (Object.keys(errors).length) {
      return new UserRegisterInvalidInputError(errors);
    }*/

    const newUser = new User({
      ...inputData,
      birthday: parseDate(inputData.birthday),
    });
    const user = await newUser.save();

    return new UserRegisterResultSuccess(user);
  }

  @Mutation(() => UserLoginResult)
  async login(
    @Arg("loginInputData") inputData: UserLoginInput
  ): Promise<typeof UserLoginResult> {
    // inpout validation
    const errors = validateLoginInputData(inputData);
    if (Object.keys(errors).length)
      return new UserLoginInvalidInputError(errors);

    // user exists validation
    const user = await User.findOne({ studentCode: inputData.studentCode });
    if (!user) {
      return new UserLoginInvalidInputError({
        studentCode: "No se encontró una cuenta asociada a este código",
      });
    }

    /*
    // credentials validation
    const { credentials: credentialsError } = await loginToSiiau(
      inputData.studentCode,
      inputData.studentNip
    );

    if (credentialsError)
      return new UserLoginInvalidInputError({ credentials: credentialsError });
      */

    const payload = {
      id: user.id,
      studentCode: user.studentCode,
      name: user.firstName,
    };

    const jwt = sign(payload, process.env.JWT_SECRET!);

    return new UserLoginResultSuccess({
      jwt,
      firstName: user.firstName,
      id: user.id,
      preferences: user.preferences,
      studentCode: user.studentCode,
    });
  }

  @Mutation(() => UpdatePreferencesResult)
  async updatePreferences(
    @Arg("preferences") preferences: UpdatePreferencesInput,
    @Ctx("user") user: Partial<User> | null
  ): Promise<typeof UpdatePreferencesResult> {
    if (!user) {
      return new MeResultError("No has iniciado sesión");
    }
    const errors = validatePreferences(preferences);
    if (Object.keys(errors).length) {
      return new UpdatePreferencesInputError(errors);
    }

    const userDb = await User.findOne(user.id);
    if (userDb) {
      userDb.preferences = preferences;
      await userDb.save();
    }
    return new UpdatePreferencesSuccess(preferences);
  }

  @Mutation(() => UpdateProfileResult)
  async updateProfile(
    @Arg("inputData") inputData: UpdateProfileInput,
    @Ctx("user") user: User
  ): Promise<typeof UpdateProfileResult> {
    if (!user) return new MeResultError("No autenticado");

    const errors = validateProfile(inputData);
    if (Object.keys(errors).length) return new UpdateProfileInputError(errors);

    // Saving current images to local file to later removal
    const pathToFile = path.join(__dirname, "../imagesToRemove.txt");

    const images = [user.primaryImageUrl, ...user.secondaryImagesUrl];

    images.forEach((image) => {
      fs.appendFileSync(pathToFile, `${image}\n`);
    });

    await User.update(user.id, inputData);

    return new UpdateProfileSuccess();
  }
}

type loginToSiiauErrors = {
  credentials: string | null;
  campus: string | null;
};

async function loginToSiiau(
  studentCode: string,
  studentNip: string
): Promise<loginToSiiauErrors> {
  let errors: loginToSiiauErrors = {
    campus: null,
    credentials: null,
  };

  const credentials = new FormData();
  credentials.append("p_codigo_c", studentCode);
  credentials.append("p_clave_c", studentNip);

  const response = await fetch(
    `http://siiauescolar.siiau.udg.mx/wus/gupprincipal.valida_inicio`,
    { body: credentials, method: "POST" }
  );

  const pageText = await response.text();

  if (pageText.includes('class="error"')) {
    errors.credentials = "Credenciales incorrectas";
    return errors;
  }

  const cookiesUnparsed = response.headers.get("set-cookie");
  const cookies = parseCookies(cookiesUnparsed!);

  const pidmSelector = '<INPUT TYPE="hidden" NAME="p_pidm_n" VALUE="';

  const pidmStartIndex = pageText.indexOf(pidmSelector);

  const pidmSelectorLength = pidmSelector.length;

  const pidmIndex = pidmStartIndex + pidmSelectorLength;

  const pidm = pageText.substring(pidmIndex, pidmIndex + 7);

  if (!(await isCuceiStudent(pidm, cookies))) {
    errors.campus = "Esta app solo está diseñada para estudiantes de CUCEI";
  }

  return errors;
}

async function isCuceiStudent(pidm: string, cookies: string) {
  const response = await fetch(
    `http://siiauescolar.siiau.udg.mx/wal/sgphist.promedio?pidmp=${pidm}`,
    { headers: { cookie: cookies } }
  );
  const pageText = await response.text();

  return pageText.includes(
    "CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERIAS"
  );
}
