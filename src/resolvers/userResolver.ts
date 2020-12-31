import { Resolver, Mutation, Query, Arg } from "type-graphql";
import {
  UserRegisterResult,
  UserRegisterInput,
  UserRegisterInvalidInputError,
  UserRegisterResultSuccess,
} from "../types/graphql/registerTypes";
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
    const errors = validateInputData(inputData);
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
}
