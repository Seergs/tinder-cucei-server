import { Resolver, Mutation, Query, Arg } from "type-graphql";
import puppeteer from "puppeteer";
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
  const browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
    ],
  });
  const page = await browser.newPage();
  console.log("Navigating to SIIAU");
  await page.goto(
    "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio"
  );

  console.log("Inicial url", page.url());

  console.log("Typing credentials");
  await page.type("input[name=p_codigo_c]", studentCode);
  await page.type("input[name=p_clave_c]", studentNip);

  console.log("Submitting");
  await page.click("input[type=submit]");

  console.log("Waiting for new page");
  await page.waitForNavigation();

  const newPage = page.url();
  console.log("New url", newPage);

  await browser.close();

  return (
    newPage === "http://siiauescolar.siiau.udg.mx/wus/gupprincipal.FrameMenu"
  );
}
