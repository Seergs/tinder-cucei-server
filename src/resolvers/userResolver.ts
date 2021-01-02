import { Resolver, Mutation, Query, Arg } from "type-graphql";
import fetch from "node-fetch";
import FormData from "form-data";
import {
  UserRegisterResult,
  UserRegisterInput,
  UserRegisterInvalidInputError,
  UserRegisterResultSuccess,
} from "../types/graphql/registerTypes";
import {
  UserLoginResult,
  UserLoginInput,
  UserLoginInvalidInputError,
} from "../types/graphql/loginTypes";

import User from "../entities/User";
import { validateInputData } from "../validators/register";
import { parseDate } from "../util/utils";

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

    // Credentials validation
    if (
      !(await isLoginToSiiauSuccessful(
        inputData.studentCode,
        inputData.studentNip
      ))
    ) {
      errors.credentials = "Credenciales incorrectas";
    }
    if (Object.keys(errors).length) {
      return new UserRegisterInvalidInputError(errors);
    }

    const newUser = new User({
      ...inputData,
      birthday: parseDate(inputData.dateOfBirth),
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

async function isLoginToSiiauSuccessful(
  studentCode: string,
  studentNip: string
) {
  const credentials = new FormData();
  credentials.append("p_codigo_c", studentCode);
  credentials.append("p_clave_c", studentNip);
  const response = await fetch(
    `http://siiauescolar.siiau.udg.mx/wus/gupprincipal.valida_inicio`,
    { body: credentials, method: "POST" }
  );

  const pageText = await response.text();

  return !pageText.includes('class="error"');
}
