import { Resolver, Mutation, Query, Arg } from "type-graphql";
import FormData from "form-data";
import fetch from "node-fetch";
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
} from "../types/graphql/loginTypes";
import { validateInputData } from "../validators/register";
import User from "../entities/User";
import { parseCookies, parseDate } from "../util/utils";

@Resolver()
export default class UserResolver {
  @Query(() => String)
  async me() {
    return "Me";
  }

  @Mutation(() => UserRegisterResult)
  async register(
    @Arg("registerInputData") inputData: UserRegisterInput
  ): Promise<typeof UserRegisterResult> {
    // User input validation
    const errors = validateInputData(inputData);

    // Validate user registered already
    if (await User.count({ studentCode: inputData.studentCode })) {
      errors.studentCode =
        "Ya existe una cuenta asociada a este código, intenta iniciar sesión";
    }

    // Credentials validation
    const {
      campus: campusError,
      credentials: credentialsError,
    } = await loginToSiiau(inputData.studentCode, inputData.studentNip);

    if (campusError) errors.campus = campusError;
    if (credentialsError) errors.credentials = credentialsError;

    if (Object.keys(errors).length) {
      return new UserRegisterInvalidInputError(errors);
    }

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
    console.log(inputData);
    return new UserLoginInvalidInputError({});
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
