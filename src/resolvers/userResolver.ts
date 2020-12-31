import { Resolver, Mutation, Query, Arg } from "type-graphql";
import {
  UserRegisterResult,
  UserRegisterInput,
  UserRegisterInvalidInputError,
  UserRegisterResultSuccess,
} from "../types/graphql/registerTypes";
import User from "../entities/User";
import careers from "../util/careers";

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
    let errors: any = {};
    if (!Object.keys(careers).includes(inputData.career)) {
      errors.career = "Carrera no encontrada";
    }

    if (Object.keys(errors).length) {
      return new UserRegisterInvalidInputError(errors);
    }

    const newUser = new User({ ...inputData });
    const user = await newUser.save();

    return new UserRegisterResultSuccess(user);
  }
}
