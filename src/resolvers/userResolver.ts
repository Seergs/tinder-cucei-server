import { Resolver, Mutation, Query, InputType, Field, Arg } from "type-graphql";
import { Length, IsDate, IsNotEmpty } from "class-validator";
import User from "../entities/User";
import careers from "../util/careers";
import { UserInputError } from "apollo-server-express";

@InputType()
class RegisterInputData {
  @Field()
  @IsNotEmpty({ message: "No puede estar vacío" })
  name: string;

  @Field()
  @IsNotEmpty({ message: "No puede estar vacío" })
  fatherLastName: string;

  @Field()
  @IsNotEmpty({ message: "No puede estar vacío" })
  motherLastName: string;

  @Field()
  @IsNotEmpty({ message: "No puede estar vacío" })
  career: string;

  @Field()
  @IsNotEmpty({ message: "No puede estar vacío" })
  description: string;

  @Field()
  @IsDate({ message: "Fecha inválida" })
  birthday: Date;

  @Field()
  @Length(9, 9, {
    message: "No válido, debe ser un código de estudiante de UDG",
  })
  studentCode: string;

  @Field()
  @IsNotEmpty({ message: "No puede estar vacío" })
  studentNip: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => String)
  async me() {
    return "Me";
  }
  @Mutation(() => User)
  async register(
    @Arg("registerInputData") inputData: RegisterInputData
  ): Promise<User> {
    if (!Object.keys(careers).includes(inputData.career)) {
      throw new UserInputError("User Input Error", { career: "No encontrada" });
    }
    const newUser = new User({ ...inputData });
    const user = await newUser.save();

    return user;
  }
}
