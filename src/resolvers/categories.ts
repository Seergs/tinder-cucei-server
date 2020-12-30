import { Query, Resolver } from "type-graphql";

@Resolver()
export class CategoriesResolver {
  @Query(() => String)
  async sayHi() {
    return "Hello there";
  }
}
